package com.hamhabocca.dallibocca.rally.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.hamhabocca.dallibocca.common.ResponseMessage;
import com.hamhabocca.dallibocca.common.page.Pagination;
import com.hamhabocca.dallibocca.common.page.PagingButtonInfo;
import com.hamhabocca.dallibocca.rally.dto.RallyDTO;
import com.hamhabocca.dallibocca.rally.dto.RallySimpleDTO;
import com.hamhabocca.dallibocca.rally.dto.SearchFilter;
import com.hamhabocca.dallibocca.rally.service.RallyService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import java.net.URI;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.Map;

@Api(tags = "Rally API")
@RestController
@RequestMapping(value = "/api/v1")
public class RallyController {

    private final RallyService rallyService;

    @Autowired
    public RallyController(RallyService rallyService) {
        this.rallyService = rallyService;
    }

    @ApiOperation(value = "모든 랠리 목록 조회 API")
    @ApiResponses({
        @ApiResponse(code = 200, message = "전체 조회 성공"),
        @ApiResponse(code = 404, message = "찾을 수 없는 목록")
    })
    @GetMapping("/rallies")
    public ResponseEntity<ResponseMessage> findRallyList(
        @PageableDefault(size = 15) Pageable pageable) {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        Page<RallySimpleDTO> rallyList = rallyService.findRallyList(pageable);

        PagingButtonInfo paging = Pagination.getPagingButtonInfo(rallyList);

        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("rallyList", rallyList);
        responseMap.put("paging", paging);

        return ResponseEntity.ok().headers(headers)
            .body(new ResponseMessage(200, "전체 조회 성공", responseMap));
    }

    @ApiOperation(value = "랠리글 상세 조회 API")
    @ApiResponses({
        @ApiResponse(code = 200, message = "상세 조회 성공"),
        @ApiResponse(code = 400, message = "잘못된 요청"),
        @ApiResponse(code = 401, message = "접근 권한 없음"),
        @ApiResponse(code = 404, message = "찾을 수 없는 정보")
    })
    @GetMapping("/rallies/{rallyId}")
    public ResponseEntity<ResponseMessage> findRallyById(@PathVariable int rallyId) {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        RallyDTO foundRally = rallyService.findRallyById(rallyId);

        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("rally", foundRally);

        return ResponseEntity.ok().headers(headers)
            .body(new ResponseMessage(200, "상세 조회 성공", responseMap));
    }

    @ApiOperation(value = "랠리글 추가 API")
    @ApiResponses({
        @ApiResponse(code = 201, message = "리소스 생성 성공"),
        @ApiResponse(code = 400, message = "잘못된 요청"),
        @ApiResponse(code = 403, message = "접근 권한 없음")
    })
    @PostMapping("/rallies")
    public ResponseEntity<?> postRally(RallyDTO newRally,
        @RequestHeader(value = "Auth") String auth) throws JsonProcessingException {

        long rallyId = rallyService.postNewRally(newRally, auth);

        return ResponseEntity.created(URI.create("/api/v1/rallies/" + rallyId)).build();
    }

    @ApiOperation(value = "랠리글 수정 API")
    @ApiResponses({
        @ApiResponse(code = 201, message = "리소스 수정 성공"),
        @ApiResponse(code = 400, message = "잘못된 요청"),
        @ApiResponse(code = 403, message = "접근 권한 없음")
    })
    @PutMapping("/rallies/{rallyId}")
    public ResponseEntity<?> modifyRally(RallyDTO modifyRally,
        @PathVariable int rallyId, @RequestHeader(value = "Auth") String auth)
        throws JsonProcessingException {

        rallyService.modifyRally(modifyRally, rallyId, auth);

        return ResponseEntity.created(URI.create("/api/v1/rallies/" + rallyId)).build();
    }

    @ApiOperation(value = "취소된 랠리글 삭제 API")
    @ApiResponses({
        @ApiResponse(code = 204, message = "리소스 삭제 성공"),
        @ApiResponse(code = 400, message = "잘못된 요청")
    })
    @DeleteMapping("/rallies/{rallyId}")
    public ResponseEntity<?> removeRallyForAdmin(@PathVariable int rallyId) {

        rallyService.removeRally(rallyId);

        return ResponseEntity.noContent().build();
    }

    @ApiOperation(value = "조건에 따른 랠리 목록 조회 API")
    @ApiResponses({
        @ApiResponse(code = 200, message = "검색 조회 성공"),
        @ApiResponse(code = 400, message = "잘못된 요청")
    })
    @GetMapping("/rallies/search")
    public ResponseEntity<ResponseMessage> findRalliesByFilter(SearchFilter searchFilter) {

        Map<String, Object> responseMap = new HashMap<>();

        List<RallyDTO> rallyList = rallyService.findRallyListBySearch(searchFilter);
        responseMap.put("rallyList", rallyList);

        return ResponseEntity.ok().body(new ResponseMessage(200, "검색 조회 성공", responseMap));
    }

}
