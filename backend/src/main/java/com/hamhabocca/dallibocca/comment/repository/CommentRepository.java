package com.hamhabocca.dallibocca.comment.repository;

import com.hamhabocca.dallibocca.comment.entity.Comment;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CommentRepository extends JpaRepository<Comment, Long> {

}
