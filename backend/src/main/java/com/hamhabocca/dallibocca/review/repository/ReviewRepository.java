package com.hamhabocca.dallibocca.review.repository;

import com.hamhabocca.dallibocca.review.entity.Review;
import java.util.Map;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import javax.persistence.EntityManager;
import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {

}
