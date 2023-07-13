package com.hamhabocca.dallibocca.report.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.hamhabocca.dallibocca.common.ResponseMessage;

import com.hamhabocca.dallibocca.report.dto.ReviewReportDTO;
import com.hamhabocca.dallibocca.report.service.ReviewReportService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/")
public class ReviewReportController {

    private final ReviewReportService reviewReportService;

    @Autowired
    public ReviewReportController(ReviewReportService reviewReportService) {
        this.reviewReportService = reviewReportService;
    }

    /*리뷰 신고*/
    @ApiOperation(value = "테스트용 리뷰 신고 추가")

    @ApiResponses({
        @ApiResponse(code = 201, message = "신고데이터 생성 성공"),
        @ApiResponse(code = 400, message = "잘못된 파라미터"),
        @ApiResponse(code = 403, message = "접근 권한 없음")
    })
    @PostMapping( "/report")
    public ResponseEntity<?> registReviewReportForTesting(ReviewReportDTO newReviewReport,@RequestHeader(value = "Auth") String auth)
    throws JsonProcessingException {

        long reviewReportId = reviewReportService.registNewReviewReport(newReviewReport, auth);

        return ResponseEntity
            .created(URI.create("/api/v1/report" +reviewReportId))
            .build();
    }

    /*리뷰 신고 조회*/
    @ApiOperation(value = "리뷰 신고 전체 조회")
    @GetMapping("/reports")
    public ResponseEntity<ResponseMessage> findAllReviewReport() {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        Map<String, Object> responseMap = new HashMap<>();

        List<ReviewReportDTO> reviewReports = reviewReportService.findAllReviewReport();
        responseMap.put("reports", reviewReports);

        return new ResponseEntity<>(
            new ResponseMessage(200, "조회성공", responseMap),
            headers,
            HttpStatus.OK
        );
    }

    /*특정 리뷰 조회*/
    @ApiOperation("리뷰 신고 코드로 특정 리뷰 조회")
    @GetMapping("reposts/{reportId}")
    public ResponseEntity<ResponseMessage> findReportByCode(@PathVariable Long reportId){

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        List<ReviewReportDTO> reviewReports = reviewReportService.findAllReviewReport();

        ReviewReportDTO foundReviewReport = reviewReports.stream().filter(reviewReport -> reviewReport.getReportId() == reportId)
            .collect(Collectors.toList()).get(0);

        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("reviewReport", foundReviewReport);

        return ResponseEntity
            .ok()
            .headers(headers)
            .body(new ResponseMessage(200, "조회성공", responseMap));
    }
}
