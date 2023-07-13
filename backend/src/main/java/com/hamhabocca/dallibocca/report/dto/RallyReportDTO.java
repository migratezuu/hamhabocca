package com.hamhabocca.dallibocca.report.dto;

import java.util.Date;

public class RallyReportDTO {

	private long reportId;
	private String reportWriter;
	private String reportTarget;
	private String reportReason;
	private String reportReasonDetail;
	private Date reportDate;
	private String isProcessed;

	public RallyReportDTO() {
	}

	public RallyReportDTO(long reportId, String reportWriter, String reportTarget,
		String reportReason,
		String reportReasonDetail, Date reportDate, String isProcessed) {
		this.reportId = reportId;
		this.reportWriter = reportWriter;
		this.reportTarget = reportTarget;
		this.reportReason = reportReason;
		this.reportReasonDetail = reportReasonDetail;
		this.reportDate = reportDate;
		this.isProcessed = isProcessed;
	}

	public long getReportId() {
		return reportId;
	}

	public void setReportId(long reportId) {
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

	public Date getReportDate() {
		return reportDate;
	}

	public void setReportDate(Date reportDate) {
		this.reportDate = reportDate;
	}

	public String getIsProcessed() {
		return isProcessed;
	}

	public void setIsProcessed(String isProcessed) {
		this.isProcessed = isProcessed;
	}

	@Override
	public String toString() {
		return "RallyReportDTO{" +
			"reportId=" + reportId +
			", reportWriter='" + reportWriter + '\'' +
			", reportTarget='" + reportTarget + '\'' +
			", reportReason='" + reportReason + '\'' +
			", reportReasonDetail='" + reportReasonDetail + '\'' +
			", reportDate=" + reportDate +
			", isProcessed='" + isProcessed + '\'' +
			'}';
	}
}
