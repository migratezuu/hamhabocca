package com.hamhabocca.dallibocca.report.dto;

import java.util.Date;

public class ReviewReportDTO {

    private Long reportId;

    private String reportWriter;

    private String reportTarget;

    private Date reportDate;

    private String reportReason;

    private String reportReasonDetail;

    private String isProcessed;

    public ReviewReportDTO() {}


    public ReviewReportDTO(Long reportId, String reportWriter, String reportTarget, Date reportDate,
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
        return "ReviewReportDTO{" +
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
