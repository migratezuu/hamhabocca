package com.hamhabocca.dallibocca.qna.repository;

import com.hamhabocca.dallibocca.qna.entity.Qna;
import com.hamhabocca.dallibocca.qna.dto.SearchFilter;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface QnaMapper {
List<Qna> findQnaListBySearch(SearchFilter searchFilter);
}
