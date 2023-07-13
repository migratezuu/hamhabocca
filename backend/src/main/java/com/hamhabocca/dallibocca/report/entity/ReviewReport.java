package com.hamhabocca.dallibocca.report.entity;

import javax.persistence.*;
import java.util.Date;

@Entity(name = "ReviewReport")
@Table(name = "reviewReport")
@SequenceGenerator(
    name = "report_sequence_generator",
    sequenceName = "sequence_report_id",
    initialValue = 1,
    allocationSize = 50
)

public class ReviewReport {

    @Id
    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "report_sequence_generator"
    )
    @Column(name = "REPORT_ID")
    private Long reportId;

    @Column(name = "REPORT_WRITER")
    private String reportWriter;

    @Column(name = "REPORT_TARGET")
    private String reportTarget;

    @Column(name = "REPORT_DATE")
    private Date reportDate;

    @Column(name = "REPORT_REASON")
    private String reportReason;

    @Column(name = "REPORT_REASON_DETAIL")
    private String reportReasonDetail;

    @Column(name = "IS_PROCESSED")
    private String isProcessed;

    public ReviewReport() {
    }

    public ReviewReport(Long reportId, String reportWriter, String reportTarget, Date reportDate,
        String reportReason, String reportReasonDetail, String isProcessed) {
        this.reportId = reportId;
        this.reportWriter = reportWriter;
        this.reportTarget = reportTarget;
        this.reportDate = reportDate;
        this.reportReason = reportReason;
        this.reportReasonDetail = reportReasonDetail;
        this.isProcessed = isProcessed;
    }

    public Long getReportId() {
        return reportId;
    }

    public void setReportId(Long reportId) {
        this.reportId = reportId;
    }

    public String getReportWriter() {
        return reportWriter;
    }

    public void setReportWriter(String reportWriter) {
        this.reportWriter = reportWriter;
    }

    public String getReportTarget() {
        return reportTarget;
    }

    public void setReportTarget(String reportTarget) {
        this.reportTarget = reportTarget;
    }

    public Date getReportDate() {
        return reportDate;
    }

    public void setReportDate(Date reportDate) {
        this.reportDate = reportDate;
    }

    public String getReportReason() {
        return reportReason;
    }

    public void setReportReason(String reportReason) {
        this.reportReason = reportReason;
    }

    public String getReportReasonDetail() {
        return reportReasonDetail;
    }

    public void setReportReasonDetail(String reportReasonDetail) {
        this.reportReasonDetail = reportReasonDetail;
    }

    public String getIsProcessed() {
        return isProcessed;
    }

    public void setIsProcessed(String isProcessed) {
        this.isProcessed = isProcessed;
    }

    @Override
    public String toString() {
        return "ReviewReport{" +
            "reportId=" + reportId +
            ", reportWriter='" + reportWriter + '\'' +
            ", reportTarget='" + reportTarget + '\'' +
            ", reportDate=" + reportDate +
            ", reportReason='" + reportReason + '\'' +
            ", reportReasonDetail='" + reportReasonDetail + '\'' +
            ", isProcessed='" + isProcessed + '\'' +
            '}';
    }
}