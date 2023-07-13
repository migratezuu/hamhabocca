package com.hamhabocca.dallibocca.review.entity;


import java.util.Arrays;
import javax.persistence.*;
import java.util.Date;

@Entity(name = "Review")  //엔티티매니저가 관리하기 위한 엔티티객체
@Table(name = "review")  //어떠한 데이터베이스의 테이블과 매핑할 것인지 지정
@SequenceGenerator(
    name = "review_sequence_generator",
    sequenceName = "sequence_review_id",
    initialValue = 1,
    allocationSize = 50
)
public class Review {


    @Id //리뷰 코드가 primary key
    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "review_sequence_generator"
    )
    @Column(name = "REVIEW_ID")
    private long reviewId;

    @Column(name = "REVIEW_TITLE")
    private String reviewTitle;

    @Column(name = "MEMBER_ID")
    private long memberId;

    @Column(name = "REVIEW_DETAIL")
    private String reviewDetail;

    @Column(name = "REVIEW_WRITE_DATE")
    private java.util.Date reviewWriteDate;

    @Column(name = "RALLY_ID")
    private long rallyId;

    @Lob // Large object 데이터 타입으로 지정
    @Column(name = "REVIEW_IMAGE")
    private byte[] reviewImage;

    public Review() {}


    public Review(long reviewId, String reviewTitle, long memberId, String reviewDetail,
        Date reviewWriteDate, long rallyId, byte[] reviewImage) {
        this.reviewId = reviewId;
        this.reviewTitle = reviewTitle;
        this.memberId = memberId;
        this.reviewDetail = reviewDetail;
        this.reviewWriteDate = reviewWriteDate;
        this.rallyId = rallyId;
        this.reviewImage = reviewImage;
    }

    public long getReviewId() {
        return reviewId;
    }

    public void setReviewId(long reviewId) {
        this.reviewId = reviewId;
    }

    public String getReviewTitle() {
        return reviewTitle;
    }

    public void setReviewTitle(String reviewTitle) {
        this.reviewTitle = reviewTitle;
    }

    public long getMemberId() {
        return memberId;
    }

    public void setMemberId(long memberId) {
        this.memberId = memberId;
    }

    public String getReviewDetail() {
        return reviewDetail;
    }

    public void setReviewDetail(String reviewDetail) {
        this.reviewDetail = reviewDetail;
    }

    public Date getReviewWriteDate() {
        return reviewWriteDate;
    }

    public void setReviewWriteDate(Date reviewWriteDate) {
        this.reviewWriteDate = reviewWriteDate;
    }

    public long getRallyId() {
        return rallyId;
    }

    public void setRallyId(long rallyId) {
        this.rallyId = rallyId;
    }

    public byte[] getReviewImage() {
        return reviewImage;
    }

    public void setReviewImage(byte[] reviewImage) {
        this.reviewImage = reviewImage;
    }

    @Override
    public String toString() {
        return "Review{" +
            "reviewId=" + reviewId +
            ", reviewTitle='" + reviewTitle + '\'' +
            ", memberId=" + memberId +
            ", reviewDetail='" + reviewDetail + '\'' +
            ", reviewWriteDate=" + reviewWriteDate +
            ", rallyId=" + rallyId +
            ", reviewImage=" + Arrays.toString(reviewImage) +
            '}';
    }
}
