package com.hamhabocca.dallibocca.review.controller;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.hamhabocca.dallibocca.common.ResponseMessage;
import com.hamhabocca.dallibocca.common.page.Pagination;
import com.hamhabocca.dallibocca.common.page.PagingButtonInfo;
import com.hamhabocca.dallibocca.review.dto.ReviewDTO;
import com.hamhabocca.dallibocca.review.dto.ReviewSearchFilter;
import com.hamhabocca.dallibocca.review.service.ReviewService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
import java.util.stream.Collectors;
import springfox.documentation.spring.web.json.Json;

@RestController
@RequestMapping("/api/v1")
public class ReviewController {
    private final ReviewService reviewService;


    @Autowired
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;

    }

    @ApiOperation(value = "테스트용 리뷰 추가하기")
    @PostMapping("/reviews")
    public ResponseEntity<?> registReviewForTesting(ReviewDTO newReview,  @RequestHeader(value = "Auth") String auth)
        throws JsonProcessingException {

        long reviewId = reviewService.registNewReview(newReview, auth);

        return ResponseEntity
                .created(URI.create("/api/v1/reviews/regist/" + newReview.getReviewId()))
                .build();
    }

    @ApiOperation(value = "모든 리뷰 목록 조회")
    @GetMapping("/reviews")
    public ResponseEntity<ResponseMessage> findAllReview(@PageableDefault(size = 15) Pageable pageable) {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        Map<String, Object> responseMap = new HashMap<>();

        List<ReviewDTO> reviews = reviewService.findAllReview(pageable);
        responseMap.put("reviews", reviews);

        return new ResponseEntity<>(
                new ResponseMessage(200, "조회성공", responseMap),
                headers,
                HttpStatus.OK
        );
    }

    @ApiOperation("리뷰코드로 리뷰 조회")
    @GetMapping("/reviews/{reviewId}")
    public ResponseEntity<ResponseMessage> findReviewById(@PathVariable long reviewId) {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        ReviewDTO foundReview = reviewService.findReviewById(reviewId);

        System.out.println(foundReview);

        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("reviews", foundReview);

        return ResponseEntity
                .ok()
                .headers(headers)
                .body(new ResponseMessage(200, "조회성공", responseMap));
    }

    @ApiOperation(value = "리뷰 삭제")
    @ApiResponses({
            @ApiResponse(code = 204, message = "리뷰 삭제 성공"),
            @ApiResponse(code = 400, message = "잘못된 파라미터")
    })
    @DeleteMapping("/reviews/{reviewId}")
    public ResponseEntity<?> removeReview(@PathVariable long reviewId){


        reviewService.removeReview(reviewId);

        return  ResponseEntity
                .noContent()
                .build();
    }

    @ApiOperation(value = "리뷰 수정")
    @ApiResponses({
        @ApiResponse(code = 201, message = "리뷰 수정 성공"),
        @ApiResponse(code = 400, message = "잘못된 파라미터")
    })
    @PutMapping("/reviews/{reviewId}")
    public ResponseEntity<?> modifyReview(ReviewDTO modifyInfo,
        @PathVariable long reviewId) {

        System.out.println("modifyInfo = " + modifyInfo);

        reviewService.modifyReview(modifyInfo, reviewId);

        return ResponseEntity
                .created(URI.create("/api/v1/reviews/" + reviewId))
                .build();
    }


    //--------------------------------------------------------------------------------------------

    @ApiOperation(value = "조건에 따른 리뷰 목록 조회 API")
    @ApiResponses({
        @ApiResponse(code = 200, message = "검색 조회 성공"),
        @ApiResponse(code = 400, message = "잘못된 요청")
    })
    @GetMapping("/reviews/search")
    public ResponseEntity<ResponseMessage> findReviewByFilter(ReviewSearchFilter reviewSearchFilter) {

        Map<String, Object> responseMap = new HashMap<>();

        System.out.println("컨트롤러에서의..." + reviewSearchFilter);

        List<ReviewDTO> reviews = reviewService.findReviewListBySearch(reviewSearchFilter);
        responseMap.put("reviews", reviews);

        return ResponseEntity.ok().body(new ResponseMessage(200, "검색 조회 성공", responseMap));
    }





}

