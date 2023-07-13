package com.hamhabocca.dallibocca.qna.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.hamhabocca.dallibocca.common.ResponseMessage;
import com.hamhabocca.dallibocca.common.page.Pagination;
import com.hamhabocca.dallibocca.common.page.PagingButtonInfo;
import com.hamhabocca.dallibocca.qna.dto.QnaDTO;
import com.hamhabocca.dallibocca.qna.dto.QnaSimpleDTO;

import com.hamhabocca.dallibocca.qna.dto.SearchFilter;
import com.hamhabocca.dallibocca.qna.service.QnaService;
import com.hamhabocca.dallibocca.rally.dto.RallyDTO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.data.domain.Pageable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Api(tags = "Qna API")
@RestController
@RequestMapping("/api/v1/")
public class QnaController {
	private final QnaService qnaService;

	@Autowired
	public QnaController(QnaService qnaService) {
		this.qnaService = qnaService;
	}
	@ApiOperation(value = "모든 건의 목록 조회")
	@ApiResponses({
		@ApiResponse(code = 200, message = "전체 조회 성공"),
		@ApiResponse(code = 404, message = "찾을 수 없는 목록")
	})
	@GetMapping("/qnas")
	public ResponseEntity<ResponseMessage> findQnaList(@PageableDefault(size = 10) Pageable pageable) {

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

		Page<QnaSimpleDTO> qnaList = qnaService.findQnaList(pageable);

		PagingButtonInfo paging = Pagination.getPagingButtonInfo(qnaList);

		Map<String, Object> responseMap = new HashMap<>();
		responseMap.put("qnaList", qnaList) ;
		responseMap.put("paging", paging);

		return ResponseEntity.ok().headers(headers)
			.body(new ResponseMessage(200, "전체 조회 성공", responseMap));
	}

	@ApiOperation(value = "건의 번호로 건의 조회")
	@ApiResponses({
		@ApiResponse(code = 200, message = "상세 조회 성공"),
		@ApiResponse(code = 400, message = "잘못된 요청"),
		@ApiResponse(code = 401, message = "접근 권한 없음"),
		@ApiResponse(code = 404, message = "찾을 수 없는 정보")
	})
	@GetMapping("/qnas/{qnaId}")
	public ResponseEntity<ResponseMessage> findQnaById(@PathVariable long qnaId) {

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

		QnaDTO foundQna = qnaService.findQnaById(qnaId);

		Map<String, Object> responseMap = new HashMap<>();
		responseMap.put("qnas", foundQna);

		return ResponseEntity
			.ok()
			.headers(headers)
			.body(new ResponseMessage(200, "조회성공", responseMap));
	}

	@ApiOperation(value = "신규 건의 추가")
	@ApiResponses({
		@ApiResponse(code = 201, message = "리소스 생성 성공"),
		@ApiResponse(code = 400, message = "잘못된 요청"),
		@ApiResponse(code = 403, message = "접근 권한 없음")
	})
	@PostMapping("/qnas")
	public ResponseEntity<?> registNewQna(QnaDTO newQna, @RequestHeader(value = "Auth") String auth)
		throws JsonProcessingException {

		long qnaId = qnaService.registNewQna(newQna, auth);

		return ResponseEntity
			.created(URI.create("/api/v1/qnas" + qnaId))
			.build();
	}

	@ApiOperation(value = "건의 수정")
	@ApiResponses({
		@ApiResponse(code = 201, message = "리소스 수정 성공"),
		@ApiResponse(code = 400, message = "잘못된 요청"),
		@ApiResponse(code = 403, message = "접근 권한 없음")
	})
	@PutMapping("/qnas/{qnaId}")
	public ResponseEntity<?> modifyQna(QnaDTO modifyInfo, @PathVariable long qnaId, @RequestHeader(value = "Auth") String auth)
		throws JsonProcessingException {

		qnaService.modifyQna(modifyInfo, qnaId, auth);

		return ResponseEntity
			.created(URI.create("/api/v1/qnas" + qnaId))
			.build();
	}

	@ApiOperation(value = "건의 삭제")
	@ApiResponses({
		@ApiResponse(code = 204, message = "리소스 삭제 성공"),
		@ApiResponse(code = 400, message = "잘못된 요청")
	})
	@DeleteMapping("/qnas/{qnaId}")
	public ResponseEntity<?> removeQna(@PathVariable long qnaId) {

		System.out.println("잘받았니????????????????????????????"+ qnaId);
		qnaService.removeQna(qnaId);

		return ResponseEntity
			.noContent()
			.build();
	}

	@ApiOperation(value = "건의 검색")
	@ApiResponses({
		@ApiResponse(code = 200, message = "검색 조회 성공"),
		@ApiResponse(code = 400, message = "잘못된 요청")
	})
	@GetMapping("/qnas/search")
	public ResponseEntity<ResponseMessage> findQnasBySearch(SearchFilter searchFilter) {

		System.out.println("컨트롤러" + searchFilter);

		Map<String, Object> responseMap = new HashMap<>();

		List<QnaDTO> qnaList = qnaService.findQnaListBySearch(searchFilter);
		responseMap.put("qnaList", qnaList);

		return ResponseEntity.ok().body(new ResponseMessage(200, "검색 조회 성공", responseMap));
	}

}
