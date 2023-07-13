package com.hamhabocca.dallibocca.review.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hamhabocca.dallibocca.qna.exception.QnaException;
import com.hamhabocca.dallibocca.review.dto.ReviewSearchFilter;
import com.hamhabocca.dallibocca.review.entity.Review;
import com.hamhabocca.dallibocca.review.repository.ReviewMapper;
import com.hamhabocca.dallibocca.review.repository.ReviewRepository;
import com.hamhabocca.dallibocca.review.dto.ReviewDTO;
import java.util.Date;
import java.util.Map;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final ModelMapper modelMapper;

    private final ReviewMapper reviewMapper;
    private final ObjectMapper objectMapper;
    @PersistenceContext
    private EntityManager entityManager;
    private long reviewId;


    @Autowired
    public ReviewService(ReviewRepository reviewRepository, ReviewMapper reviewMapper, ModelMapper modelMapper,
        ObjectMapper objectMapper) {
        this.reviewRepository = reviewRepository;
        this.modelMapper = modelMapper;
        this.objectMapper = objectMapper;
        this.reviewMapper = reviewMapper;
    }


    /*전체 조회*/
    public List<ReviewDTO> findAllReview(Pageable pageable) {
        List<Review> reviews = reviewRepository.findAll();
        return reviews.stream().map(review -> modelMapper.map(review, ReviewDTO.class))
            .collect(Collectors.toList());
    }

    /*일부 조회*/
//    @Transactional
    public ReviewDTO findReviewById(long reviewId) {
        Review foundReview = reviewRepository.findById(reviewId).get();
        return modelMapper.map(foundReview, ReviewDTO.class);

    }

    /*등록*/
    @Transactional
    public long registNewReview(ReviewDTO newReview, String auth) throws JsonProcessingException {
        Map<String, String> authMap = objectMapper.readValue(auth, Map.class);

        String id = String.valueOf(authMap.get("memberId"));
        long memberId = Long.parseLong(id);

        if (auth.equals("")) {
            throw new QnaException("비회원 접근");
        }

        newReview.setMemberId(memberId);
        newReview.setReviewWriteDate(new Date());

        return reviewRepository.save(modelMapper.map(newReview, Review.class)).getReviewId();
    }


    /*삭제*/
    @Transactional
    public void  removeReview( long reviewId) {

        Review foundReview = reviewRepository.findById(reviewId).get();
        reviewRepository.delete(foundReview);

        ReviewDTO reviewDTO = new ReviewDTO();
    }

    /*수정*/
    @Transactional
    public void modifyReview(ReviewDTO modifyInfo, long reviewId) {

        Review foundReview = reviewRepository.findById(reviewId).get();

        foundReview.setReviewTitle(modifyInfo.getReviewTitle());
        foundReview.setReviewDetail(modifyInfo.getReviewDetail());

    }

    public List<ReviewDTO> findReviewListBySearch(ReviewSearchFilter reviewSearchQuery) {

        // 마이바티스 혼용하기
        List<Review> reviews = reviewMapper.findReviewListBySearch(reviewSearchQuery);

        return reviews.stream().map(review -> modelMapper.map(review, ReviewDTO.class))
            .collect(
                Collectors.toList());
    }



}


