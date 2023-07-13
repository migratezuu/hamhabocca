package com.hamhabocca.dallibocca.rally.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hamhabocca.dallibocca.rally.dto.RallyMateDTO;
import com.hamhabocca.dallibocca.rally.entity.Rally;
import com.hamhabocca.dallibocca.rally.entity.RallyMate;
import com.hamhabocca.dallibocca.rally.exception.RallyException;
import com.hamhabocca.dallibocca.rally.repository.RallyMateRepository;
import com.hamhabocca.dallibocca.rally.repository.RallyRepository;
import java.time.LocalDateTime;
import java.util.Map;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ParticipateService {

    private final RallyMateRepository rallyMateRepository;
    private final RallyRepository rallyRepository;
    private final ModelMapper modelMapper;
    private final ObjectMapper objectMapper;

    @Autowired
    public ParticipateService(RallyMateRepository rallyMateRepository,
        RallyRepository rallyRepository, ModelMapper modelMapper,
        ObjectMapper objectMapper) {
        this.rallyMateRepository = rallyMateRepository;
        this.rallyRepository = rallyRepository;
        this.modelMapper = modelMapper;
        this.objectMapper = objectMapper;
    }

    /* 현재 랠리의 신청 현황 조회 */
    public List<RallyMateDTO> findRallyMateList(long rallyId) {

        List<RallyMate> rallyMates = rallyMateRepository.findAllByRallyId(rallyId);

        return rallyMates.stream()
            .map(rallyMate -> modelMapper.map(rallyMate, RallyMateDTO.class))
            .collect(Collectors.toList());
    }

    /* 현재 랠리 신청 */
    @Transactional
    public long participateByMate(long rallyId, String auth) throws JsonProcessingException {

        // 신청 회원 확인
        Map<String, String> authMap = objectMapper.readValue(auth, Map.class);

        String id = String.valueOf(authMap.get("memberId"));
        long memberId = Long.parseLong(id);

        // 랠리 신청 중복 체크
        boolean checkDuplicate = rallyMateRepository.existsByRallyIdAndMemberId(rallyId, memberId);

        if (checkDuplicate) {
            throw new RallyException("이미 참가 신청한 회원입니다.");
        }

        // 기본값 설정 뒤 보내기
        RallyMateDTO rallyMate = new RallyMateDTO();
        rallyMate.setRallyId(rallyId);
        rallyMate.setMemberId(memberId);
        rallyMate.setIsAccepted("N");
        rallyMate.setParticipationDate(String.valueOf(LocalDateTime.now()));

        rallyMateRepository.save(modelMapper.map(rallyMate, RallyMate.class));

        return memberId;
    }

    /* 현재 랠리 신청 취소 */
    @Transactional
    public void cancelParticipateByMate(long rallyId, String auth) throws JsonProcessingException {

        // 신청 회원 확인
        Map<String, String> authMap = objectMapper.readValue(auth, Map.class);

        String id = String.valueOf(authMap.get("memberId"));
        long memberId = Long.parseLong(id);

        // 삭제할 랠리 신청 찾기
        RallyMate found = rallyMateRepository.findByRallyIdAndMemberId(rallyId, memberId);

        rallyMateRepository.delete(found);
    }

    /* 현재 랠리 신청 승인 */
    @Transactional
    public void allowParticipate(long rallyId, long memberId, String auth)
        throws JsonProcessingException {

        // 신청 회원 확인
        Map<String, String> authMap = objectMapper.readValue(auth, Map.class);

        String id = String.valueOf(authMap.get("memberId"));
        long currentMemberId = Long.parseLong(id);

        Rally currentRally = rallyRepository.findById(rallyId).get();

        if (currentMemberId != currentRally.getMasterId()) {
            throw new RallyException("해당 랠리의 마스터 권한이 아닙니다.");
        }

        RallyMate foundRallyMate = rallyMateRepository.findByRallyIdAndMemberId(rallyId, memberId);

        // 해당 랠리신청의 승인 변경
        foundRallyMate.setIsAccepted("Y");
    }

    /* 본인이 신청한 랠리 신청 기록 - 마이페이지 사용 */
    public List<RallyMateDTO> findParticipateRallyList(String header)
        throws JsonProcessingException {

        Map<String, String> headerMap = objectMapper.readValue(header, Map.class);

        String id = String.valueOf(headerMap.get("memberId"));

        Long memberId = Long.parseLong(id);

        List<RallyMate> rallyMates = rallyMateRepository.findAllByMemberId(memberId);

        System.out.println("rallyMates = " + rallyMates);

        return rallyMates.stream()
            .map(rallyMate -> modelMapper.map(rallyMate, RallyMateDTO.class)).collect(
                Collectors.toList());
    }

}
