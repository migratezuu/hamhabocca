package com.hamhabocca.dallibocca.rally.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hamhabocca.dallibocca.rally.dto.RallyDTO;
import com.hamhabocca.dallibocca.rally.dto.RallySimpleDTO;
import com.hamhabocca.dallibocca.rally.dto.SearchFilter;
import com.hamhabocca.dallibocca.rally.entity.Rally;
import com.hamhabocca.dallibocca.rally.exception.RallyException;
import com.hamhabocca.dallibocca.rally.repository.RallyMapper;
import com.hamhabocca.dallibocca.rally.repository.RallyRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RallyService {

    private final RallyRepository rallyRepository;
    private final RallyMapper rallyMapper;
    private final ModelMapper modelMapper;
    private final ObjectMapper objectMapper;

    @Autowired
    public RallyService(RallyRepository rallyRepository, RallyMapper rallyMapper,
        ModelMapper modelMapper, ObjectMapper objectMapper) {
        this.rallyRepository = rallyRepository;
        this.rallyMapper = rallyMapper;
        this.modelMapper = modelMapper;
        this.objectMapper = objectMapper;
    }

    /* 모든 랠리 목록 조회 */
    public Page<RallySimpleDTO> findRallyList(Pageable pageable) {

        //offset, limit, sort 순서
        pageable = PageRequest.of(pageable.getPageNumber() <= 0 ? 0 : pageable.getPageNumber() - 1,
            pageable.getPageSize(),
            Sort.by("rallyId").descending());

        return rallyRepository.findSimpleRallyList(pageable);
    }

    /* 랠리글 상세 조회 */
    public RallyDTO findRallyById(long rallyId) {

        Rally foundRally = rallyRepository.findById(rallyId).get();

        return modelMapper.map(foundRally, RallyDTO.class);
    }

    /* 랠리글 추가 */
    @Transactional
    public long postNewRally(RallyDTO newRally, String auth) throws JsonProcessingException {

        // 신청 회원 확인
        Map<String, String> authMap = objectMapper.readValue(auth, Map.class);
        String id = String.valueOf(authMap.get("memberId"));
        long memberId = Long.parseLong(id);

        if (auth.equals("")) {
            throw new RallyException("비회원 접근");
        }

        // 현재 완주! 가 아닌 랠리 모집 총합
        int count = rallyRepository.countByMasterIdAndRallyStatusNotIn(memberId, List.of("완주!", "취소됨"));

        if (count >= 3) {
            throw new RallyException("랠리 모집 횟수 제한 3개까지만");
        }

        /* 기본값 설정 */
        newRally.setRallyStatus("모집중");
        newRally.setMasterId(memberId);
        newRally.setRallyWriteDate(String.valueOf(LocalDateTime.now()));

        if (newRally.getRallyMinimum() == 0) {
            newRally.setRallyMinimum(2);
        }

        if (newRally.getRallyMaximum() == 0) {
            newRally.setRallyMaximum(5);
        }

        return rallyRepository.save(modelMapper.map(newRally, Rally.class)).getRallyId();
    }

    /* 랠리글 수정 */
    @Transactional
    public void modifyRally(RallyDTO modifyRally, long rallyId, String auth)
        throws JsonProcessingException {

        // 신청 회원 확인
        Map<String, String> authMap = objectMapper.readValue(auth, Map.class);
        String id = String.valueOf(authMap.get("memberId"));
        long memberId = Long.parseLong(id);

        /* 변경할 기존 랠리 가져오기 */
        Rally foundRally = rallyRepository.findById(rallyId).get();

        if (memberId != foundRally.getMasterId()) {
            throw new RallyException("해당 랠리의 작성자가 아닙니다.");
        }

            /* 수정할 랠리의 상태가 널이 아니면서 기존 랠리와 다르면...상태만 수정  */
        if (modifyRally.getRallyStatus() != null && !foundRally.getRallyStatus().equals(modifyRally.getRallyStatus())) {

            foundRally.setRallyStatus(modifyRally.getRallyStatus());
        } else {

            if (modifyRally.getRallyType() != null && !modifyRally.getRallyType().equals("")) {
                foundRally.setRallyType(modifyRally.getRallyType());
            }

            /* 그 외는 랠리의 정보 변경 */
            foundRally.setRallyName(modifyRally.getRallyName());
            foundRally.setRallyDetail(modifyRally.getRallyDetail());
            foundRally.setRallyLocation(modifyRally.getRallyLocation());
            foundRally.setRallyEndLocation(modifyRally.getRallyEndLocation());
            foundRally.setRallyMaximum(modifyRally.getRallyMaximum());
            foundRally.setRallyMinimum(modifyRally.getRallyMinimum());
            foundRally.setRallyDistance(modifyRally.getRallyDistance());
            foundRally.setRallyDate(modifyRally.getRallyDate());
        }

    }

    /* 취소상태인 랠리글 삭제 */
    @Transactional
    public void removeRally(long rallyId) {

        Rally foundRally = rallyRepository.findById(rallyId).get();

        if (!(foundRally.getRallyStatus().equals("취소됨"))) {
            throw new RallyException("취소 상태인 랠리가 아닙니다. 삭제할 수 없습니다.");
        }

        rallyRepository.deleteById(rallyId);
    }

    /* 본인이 모집한 랠리 찾기 - 마이페이지 */
    public List<RallyDTO> findRecruitRallyList(String header) throws JsonProcessingException {

        Map<String, String> headerMap = objectMapper.readValue(header, Map.class);

        String id = String.valueOf(headerMap.get("memberId"));

        Long memberId = Long.parseLong(id);

        List<Rally> rallyList = rallyRepository.findAllByMasterId(memberId);

        return rallyList.stream().map(rally -> modelMapper.map(rally, RallyDTO.class)).collect(
            Collectors.toList());
    }

    /* 검색필터를 통한 랠리 목록 조회 */
    public List<RallyDTO> findRallyListBySearch(SearchFilter searchQuery) {

        // 마이바티스 혼용하기
        List<Rally> rallyList = rallyMapper.findRallyListBySearch(searchQuery);

        return rallyList.stream().map(rally -> modelMapper.map(rally, RallyDTO.class))
            .collect(
                Collectors.toList());
    }
}
