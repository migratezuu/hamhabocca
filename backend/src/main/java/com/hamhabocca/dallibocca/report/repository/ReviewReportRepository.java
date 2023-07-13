package com.hamhabocca.dallibocca.report.repository;

import com.hamhabocca.dallibocca.report.entity.ReviewReport;
import java.util.Map;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReviewReportRepository extends JpaRepository<ReviewReport, Long> {

    /*리뷰 신고 리스트 전체 호츌*/

}
