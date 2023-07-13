package com.hamhabocca.dallibocca.report.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import java.util.Date;

@Entity(name = "RallyReport")
@Table(name = "rallyReport")
@SequenceGenerator(
	name = "report_sequence_generator",
	sequenceName = "sequence_report_id",
	initialValue = 1,
	allocationSize = 50
)
public class RallyReport {

	@Id
	@GeneratedValue(
		strategy = GenerationType.SEQUENCE,
		generator = "report_sequence_generator"
	)
	@Column(name = "report_id")
	private long reportId;

	@Column(name = "report_writer")
	private String reportWriter;

	@Column(name = "report_target")
	private String reportTarget;

	@Column(name = "report_reason")
	private String reportReason;

	@Column(name = "report_reason_detail")
	private String reportReasonDetail;

	@Column(name = "report_date")
	private Date reportDate;

	@Column(name = "is_processed")
	private String isProcessed;


	public RallyReport() {
	}

	public RallyReport(long reportId, String reportWriter, String reportTarget, String reportReason,
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
		return "RallyReport{" +
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

