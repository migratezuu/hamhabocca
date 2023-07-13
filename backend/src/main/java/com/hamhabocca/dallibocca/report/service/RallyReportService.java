package com.hamhabocca.dallibocca.report.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hamhabocca.dallibocca.qna.exception.QnaException;
import com.hamhabocca.dallibocca.report.dto.RallyReportDTO;
import com.hamhabocca.dallibocca.report.entity.RallyReport;
import com.hamhabocca.dallibocca.report.exception.RallyReportException;
import com.hamhabocca.dallibocca.report.repository.RallyReportRepository;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RallyReportService {

	private final RallyReportRepository rallyReportRepository;
	private final ModelMapper modelMapper;
	private final ObjectMapper objectMapper;

	@Autowired
	public RallyReportService(RallyReportRepository rallyReportRepository,
		ModelMapper modelMapper, ObjectMapper objectMapper) {
		this.rallyReportRepository = rallyReportRepository;
		this.modelMapper = new ModelMapper();
		this.objectMapper = objectMapper;
	}

	/* 등록 */
	@Transactional
	public long registNewRallyReport(RallyReportDTO newRallyReport, String auth)
		throws JsonProcessingException {

		// 신청 회원 확인
		Map<String, String> authMap = objectMapper.readValue(auth, Map.class);

		String id = String.valueOf(authMap.get("memberId"));
		long memberId = Long.parseLong(id);

		if (auth.equals("")) {
			throw new RallyReportException("비회원 접근");
		}

		newRallyReport.setReportWriter(memberId+"");
		newRallyReport.setReportDate(new Date());

		return rallyReportRepository.save(modelMapper.map(newRallyReport, RallyReport.class)).getReportId();
	}

	@Transactional
	public void modifyRallyReport(long reportId, String type) {

		RallyReport foundRallyReport = rallyReportRepository.findById(reportId)
			.get();

		switch (type) {
			case "OK":
				foundRallyReport.setIsProcessed("Y");
				break;
			case "Reject":
				foundRallyReport.setIsProcessed("N");
				break;
		}

	}

	/*랠리 신고 전체 조회*/
	public List<RallyReportDTO> findAllRallyReports() {
		List<RallyReport> rallyReports = rallyReportRepository.findAll();
		return rallyReports.stream()
			.map(rallyReport -> modelMapper.map(rallyReport, RallyReportDTO.class))
			.collect(Collectors.toList());
	}
}
