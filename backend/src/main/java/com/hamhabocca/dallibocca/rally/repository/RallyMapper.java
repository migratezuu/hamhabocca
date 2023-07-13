package com.hamhabocca.dallibocca.rally.repository;

import com.hamhabocca.dallibocca.rally.dto.SearchFilter;
import com.hamhabocca.dallibocca.rally.entity.Rally;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface RallyMapper {

    List<Rally> findRallyListBySearch(SearchFilter searchFilter);
}
