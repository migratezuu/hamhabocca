package com.hamhabocca.dallibocca.qna.entity;

import javax.persistence.*;
import java.util.Date;

@Entity(name = "Qna")
@Table(name = "qna")
@SequenceGenerator(
	name = "qna_sequence_generator",
	sequenceName = "sequence_qna_id",
	initialValue = 1,
	allocationSize = 50
)
public class Qna {

	@Id
	@Column(name = "qna_id")
	@GeneratedValue(
		strategy = GenerationType.SEQUENCE,
		generator = "qna_sequence_generator"
	)
	private long qnaId;

	@Column(name = "qna_title")
	private String qnaTitle;

	@Column(name = "qna_category")
	private String qnaCategory;

	@Column(name = "member_id")
	private long memberId;

	@Column(name = "qna_detail")
	private String qnaDetail;

	@Column(name = "qna_write_date")
	private Date qnaWriteDate;

	public Qna() {
	}

	public Qna(long qnaId, String qnaTitle, String qnaCategory, long memberId, String qnaDetail,
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
		return "Qna{" +
			"qnaId=" + qnaId +
			", qnaTitle='" + qnaTitle + '\'' +
			", qnaCategory='" + qnaCategory + '\'' +
			", memberId=" + memberId +
			", qnaDetail='" + qnaDetail + '\'' +
			", qnaWriteDate=" + qnaWriteDate +
			'}';
	}
}
