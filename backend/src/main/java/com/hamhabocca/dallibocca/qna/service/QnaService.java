package com.hamhabocca.dallibocca.qna.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hamhabocca.dallibocca.qna.dto.QnaDTO;
import com.hamhabocca.dallibocca.qna.dto.QnaSimpleDTO;
import com.hamhabocca.dallibocca.qna.dto.SearchFilter;
import com.hamhabocca.dallibocca.qna.entity.Qna;
import com.hamhabocca.dallibocca.qna.exception.QnaException;
import com.hamhabocca.dallibocca.qna.repository.QnaMapper;
import com.hamhabocca.dallibocca.qna.repository.QnaRepository;
import com.hamhabocca.dallibocca.rally.exception.RallyException;
import com.hamhabocca.dallibocca.rally.repository.RallyMapper;
import java.util.Date;
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
public class QnaService {

	private final QnaRepository qnaRepository;
	private final ModelMapper modelMapper;
	private final ObjectMapper objectMapper;

	private final QnaMapper qnaMapper;

	@Autowired
	public QnaService(QnaRepository qnaRepository, ModelMapper modelMapper,
		ObjectMapper objectMapper, QnaMapper qnaMapper  ) {
		this.qnaRepository = qnaRepository;
		this.objectMapper = objectMapper;
		this.modelMapper = modelMapper;
		this.qnaMapper = qnaMapper;
	}

	/* 전체조회 */
	public Page<QnaSimpleDTO> findQnaList(Pageable pageable) {

		pageable = PageRequest.of(pageable.getPageNumber() <= 0 ? 0 : pageable.getPageNumber() - 1,
			pageable.getPageSize(),
			Sort.by("qnaId").descending());

		return qnaRepository.findSimpleQnaList(pageable);
	}

	/* 일부조회 */
	@Transactional
	public QnaDTO findQnaById(long qnaId) {

		Qna foundQna = qnaRepository.findById(qnaId).get();

		return modelMapper.map(foundQna, QnaDTO.class);
	}

	/* 등록 */
	@Transactional
	public long registNewQna(QnaDTO newQna, String auth) throws JsonProcessingException {

		// 신청 회원 확인
		Map<String, String> authMap = objectMapper.readValue(auth, Map.class);

		String id = String.valueOf(authMap.get("memberId"));
		long memberId = Long.parseLong(id);

		if (auth.equals("")) {
			throw new QnaException("비회원 접근");
		}

		newQna.setMemberId(memberId);
		newQna.setQnaWriteDate(new Date());

		return qnaRepository.save(modelMapper.map(newQna, Qna.class)).getQnaId();
	}

	/* 수정 */
	@Transactional
	public void modifyQna(QnaDTO modifyInfo, long qnaId, String auth) throws JsonProcessingException {

		// 신청 회원 확인
		Map<String, String> authMap = objectMapper.readValue(auth, Map.class);
		String id = String.valueOf(authMap.get("memberId"));
		long memberId = Long.parseLong(id);

		// 영속화 함
		Qna foundQna = qnaRepository.findById(qnaId).get();

//		if (memberId != foundQna.getQnaWriter()) {
//			throw new RuntimeException();
//		}

		// 세터로 값 수정
		foundQna.setQnaTitle(modifyInfo.getQnaTitle());
//		foundQna.setQnaId(modifyInfo.getQnaId());
		foundQna.setQnaDetail(modifyInfo.getQnaDetail());
//		foundQna.setQnaWriter(modifyInfo.getQnaWriter());
//		foundQna.setQnaWriteDate(modifyInfo.getQnaWriteDate());
		foundQna.setQnaCategory(modifyInfo.getQnaCategory());

	}

	/* 삭제 */
	@Transactional
	public void removeQna(long qnaId) {

		Qna foundQna = qnaRepository.findById(qnaId).get();
		qnaRepository.delete(foundQna);
	}

	/* 검색 */
	public List<QnaDTO> findQnaListBySearch(SearchFilter searchQuery) {

		System.out.println("서비스" + searchQuery);

		// 마이바티스 혼용하기
		List<Qna> qnaList = qnaMapper.findQnaListBySearch(searchQuery);

		return qnaList.stream().map(qna -> modelMapper.map(qna, QnaDTO.class)).collect(Collectors.toList());
	}
}
