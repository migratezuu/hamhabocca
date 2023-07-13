package com.hamhabocca.dallibocca.review.repository;

import com.hamhabocca.dallibocca.review.dto.ReviewSearchFilter;
import com.hamhabocca.dallibocca.review.entity.Review;
import java.util.List;
import net.minidev.json.JSONUtil;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ReviewMapper {

    List<Review> findReviewListBySearch(ReviewSearchFilter reviewSearchFilter);
}
