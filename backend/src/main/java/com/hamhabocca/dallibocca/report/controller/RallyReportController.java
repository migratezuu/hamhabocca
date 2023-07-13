package com.hamhabocca.dallibocca.report.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.hamhabocca.dallibocca.common.ResponseMessage;
import com.hamhabocca.dallibocca.qna.dto.QnaDTO;
import com.hamhabocca.dallibocca.report.dto.RallyReportDTO;
import com.hamhabocca.dallibocca.report.entity.RallyReport;
import com.hamhabocca.dallibocca.report.service.RallyReportService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@Api(tags = "RallyReport API")
@RestController
@RequestMapping("/api/v1/")
public class RallyReportController {

	private final RallyReportService rallyReportService;

	@Autowired
	public RallyReportController(RallyReportService rallyReportService) {
		this.rallyReportService = rallyReportService;
	}

	@ApiOperation(value = "신고글 추가")
	@ApiResponses({
		@ApiResponse(code = 201, message = "리소스 생성 성공"),
		@ApiResponse(code = 400, message = "잘못된 요청"),
		@ApiResponse(code = 403, message = "접근 권한 없음")
	})
	@PostMapping("/reports")
	public ResponseEntity<?> registNewRallyReport(RallyReportDTO newRallyReport, @RequestHeader(value = "Auth") String auth)
		throws JsonProcessingException {

		long reportId = rallyReportService.registNewRallyReport(newRallyReport, auth);

		return ResponseEntity
			.created(URI.create("/api/v1/reports" + reportId))
			.build();
	}

	@ApiOperation(value = "신고 승낙/거절")
	@ApiResponses({
		@ApiResponse(code = 201, message = "[Created]"),
		@ApiResponse(code = 401, message = "[Unauthorized]")
	})
	@PutMapping("/reports/{reportId}")
	public ResponseEntity<?> modifyRallyReport(@PathVariable long reportId, String type) {

		rallyReportService.modifyRallyReport(reportId, type);

		return ResponseEntity
			.created(URI.create("/api/v1/reports" + reportId))
			.build();
	}

	@ApiOperation(value = "랠리 신고 전체 조회")
	@GetMapping("/reportrallys")
	public ResponseEntity<ResponseMessage> findAllRallyReport() {

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

		Map<String, Object> responseMap = new HashMap<>();

		List<RallyReportDTO> rallyReports = rallyReportService.findAllRallyReports();
		responseMap.put("reports", rallyReports);

		return new ResponseEntity<>(
			new ResponseMessage(200, "조회성공", responseMap),
			headers,
			HttpStatus.OK
		);
	}
}



