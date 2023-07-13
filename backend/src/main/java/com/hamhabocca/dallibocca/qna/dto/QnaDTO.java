package com.hamhabocca.dallibocca.qna.dto;

import java.util.Date;

public class QnaDTO {

	private long qnaId;
	private String qnaTitle;
	private String qnaCategory;
	private long memberId;
	private String qnaDetail;
	private java.util.Date qnaWriteDate;

	public QnaDTO() {
	}

	public QnaDTO(long qnaId, String qnaTitle, String qnaCategory, long memberId, String qnaDetail,
		Date qnaWriteDate) {
		this.qnaId = qnaId;
		this.qnaTitle = qnaTitle;
		this.qnaCategory = qnaCategory;
		this.memberId = memberId;
		this.qnaDetail = qnaDetail;
		this.qnaWriteDate = qnaWriteDate;
	}

	public long getQnaId() {
		return qnaId;
	}

	public void setQnaId(long qnaId) {
		this.qnaId = qnaId;
	}

	public String getQnaTitle() {
		return qnaTitle;
	}

	public void setQnaTitle(String qnaTitle) {
		this.qnaTitle = qnaTitle;
	}

	public String getQnaCategory() {
		return qnaCategory;
	}

	public void setQnaCategory(String qnaCategory) {
		this.qnaCategory = qnaCategory;
	}

	public long getMemberId() {
		return memberId;
	}

	public void setMemberId(long memberId) {
		this.memberId = memberId;
	}

	public String getQnaDetail() {
		return qnaDetail;
	}

	public void setQnaDetail(String qnaDetail) {
		this.qnaDetail = qnaDetail;
	}

	public Date getQnaWriteDate() {
		return qnaWriteDate;
	}

	public void setQnaWriteDate(Date qnaWriteDate) {
		this.qnaWriteDate = qnaWriteDate;
	}

	@Override
	public String toString() {
		return "QnaDTO{" +
			"qnaId=" + qnaId +
			", qnaTitle='" + qnaTitle + '\'' +
			", qnaCategory='" + qnaCategory + '\'' +
			", memberId=" + memberId +
			", qnaDetail='" + qnaDetail + '\'' +
			", qnaWriteDate=" + qnaWriteDate +
			'}';
	}
}
