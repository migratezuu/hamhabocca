package com.hamhabocca.dallibocca.comment.entity;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity(name = "Comment")
@Table(name = "comment")
@SequenceGenerator(
	name = "member_sequence_generator",
	sequenceName = "sequence_member_id",
	initialValue = 1,
	allocationSize = 50
)
public class Comment {

	@Id
	@Column(name = "member_id")
	@GeneratedValue(
		strategy = GenerationType.SEQUENCE,
		generator = "member_sequence_generator"
	)
	private long memberId;

	@Column(name = "nickname")
	private String nickname;

	@Column(name = "comment")
	private String comment;

	@Column(name = "comment_write_date")
	private Date commentWriteDate;

	public Comment() {
	}

	public Comment(long memberId, String nickname, String comment, Date commentWriteDate) {
		this.memberId = memberId;
		this.nickname = nickname;
		this.comment = comment;
		this.commentWriteDate = commentWriteDate;
	}

	public long getMemberId() {
		return memberId;
	}

	public void setMemberId(long memberId) {
		this.memberId = memberId;
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public Date getCommentWriteDate() {
		return commentWriteDate;
	}

	public void setCommentWriteDate(Date commentWriteDate) {
		this.commentWriteDate = commentWriteDate;
	}

	@Override
	public String toString() {
		return "Comment{" +
			"memberId=" + memberId +
			", nickname='" + nickname + '\'' +
			", comment='" + comment + '\'' +
			", commentWriteDate=" + commentWriteDate +
			'}';
	}
}
