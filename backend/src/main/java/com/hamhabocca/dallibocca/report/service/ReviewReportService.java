package com.hamhabocca.dallibocca.report.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hamhabocca.dallibocca.report.entity.RallyReport;
import com.hamhabocca.dallibocca.report.entity.ReviewReport;
import com.hamhabocca.dallibocca.report.exception.RallyReportException;
import com.hamhabocca.dallibocca.report.exception.ReviewReportException;
import com.hamhabocca.dallibocca.report.repository.ReviewReportRepository;
import com.hamhabocca.dallibocca.report.dto.ReviewReportDTO;
import java.util.Date;
import java.util.Map;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewReportService {

    private final ReviewReportRepository reviewReportRepository;
    private final ModelMapper modelMapper;
    private final ObjectMapper objectMapper;
    private Long reportId;

    @Autowired
    public ReviewReportService(ReviewReportRepository reviewReportRepository,
        ModelMapper modelMapper, ObjectMapper objectMapper) {
        this.reviewReportRepository = reviewReportRepository;
        this.modelMapper = modelMapper;
        this.objectMapper = objectMapper;
    }

    /*등록*/
    @Transactional
    public long registNewReviewReport(ReviewReportDTO newReviewReport,  String auth)
   throws JsonProcessingException {

            // 신청 회원 확인
            Map<String, String> authMap = objectMapper.readValue(auth, Map.class);

            String id = String.valueOf(authMap.get("memberId"));
            long memberId = Long.parseLong(id);

            if (auth.equals("")) {
                throw new ReviewReportException("비회원 접근");
            }

            newReviewReport.setReportWriter(memberId+"");
            newReviewReport.setReportDate(new Date());

            return reviewReportRepository.save(modelMapper.map(newReviewReport, ReviewReport.class)).getReportId();
        }

    /*전체 조회*/
    public List<ReviewReportDTO> findAllReviewReport() {
        List<ReviewReport> reviewReposts = reviewReportRepository.findAll();
        return reviewReposts.stream()
            .map(reviewRepost -> modelMapper.map(reviewRepost, ReviewReportDTO.class))
            .collect(Collectors.toList());
    }

    /*일부 조회*/
    @Transactional
    public ReviewReportDTO findReportbyCode(Long reportId) {
        ReviewReport reviewReport = reviewReportRepository.findById(this.reportId).get();
        return modelMapper.map(reviewReport, ReviewReportDTO.class);
    }
}

