package com.hamhabocca.dallibocca.qna.repository;


import com.hamhabocca.dallibocca.qna.dto.QnaSimpleDTO;
import com.hamhabocca.dallibocca.qna.entity.Qna;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface QnaRepository extends JpaRepository<Qna, Long> {

	@Query("SELECT new com.hamhabocca.dallibocca.qna.dto.QnaSimpleDTO(q.qnaId,q.qnaTitle,q.qnaCategory,q.memberId, q.qnaWriteDate) FROM Qna q ORDER BY q.qnaId DESC")
	Page<QnaSimpleDTO> findSimpleQnaList(Pageable pageable);

	List<Qna> findByQnaTitleLike(String qnaTitle);
}
