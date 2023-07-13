import ReviewSearchFilter from "../components/commons/ReviewSearchFilter";
import style from "./ReviewEdit.module.css";
import React, { useRef } from "react";
import { callReviewDetailAPI, callReviewUpdateAPI } from "../apis/ReviewAPICalls";
import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


function WriteReviewPost() {
    const imageInput = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { reviewId } = useParams();

    const review = useSelector(state => state.reviewReducer);

    const testDetail = review.data;
    const [form, setForm] = useState({
        reviewId: review.reviewId,
        reviewTitle: review.reviewTitle,
        reviewDetail: review.reviewDetail,
    });

    useEffect(
        () => {
            console.log('[testDetail] reviewId :', testDetail);
            dispatch(callReviewDetailAPI({ reviewId: reviewId }));
        }
        , []
    );

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };


    const onClickReviewUpdateHandler = () => {

        const formData = new FormData();

        formData.append("reviewId", form.reviewId);
        formData.append("reviewTitle", form.reviewTitle);
        formData.append("reviewDetail", form.reviewDetail);

        dispatch(callReviewUpdateAPI({	// 리뷰 정보 업데이트
            form: formData,
            reviewId: form.reviewId
        }));

        alert('수정이 완료되었습니다.')
        navigate(`/review/${reviewId}`, { replace : true });
        window.location.reload();
    }

    /* 리뷰 작성자 */
    const REVIEW_WRITER = review.reviewWriter;

    /* 리뷰 상세 내용 */
    const REVIEW_DETAIL = review.reviewDetail;

    /* 리뷰 제목 */
    const REVIEW_TITLE = review.reviewTitle;


    return (
        <main className={style.container}>
            <section className={style.filter}>
                <ReviewSearchFilter />
            </section>
            <section className={style.board}>

                <article className={style.title}>
                    <div>
                        <h1>랠리 후기 수정</h1>
                    </div>
                    <div className={style.report}>
                            <button
                                onClick={onClickReviewUpdateHandler}>수정완료</button>
                    </div>
                </article>
                <div className={style.MainContainer}>
                    <article className={style.rallydate2}>
                    <div className={style.container}>
                            <div style={{fontWeight : 'bold', marginRight:'10px'}}>제목</div>
                            <input type="text" onChange={onChangeHandler} defaultValue={form.reviewTitle} style={{ marginLeft: '15px', backgroundColor: 'lightgray', width: '660px' }} name="reviewTitle"/>
                        </div>
                    </article>
                    <br />
                    <div className={style.textBoard}>
                    <div className={style.imageBoard}>
                            <div className={style.imageGo} style={{float: 'left', marginLeft: '10px'}}>리뷰 내용</div>
                            <input style={{ display: 'none' }} type="file" ref={imageInput} />
                        </div>
                        <textarea
                            onChange={onChangeHandler}
                            defaultValue={ form.reviewDetail}
                            style={{ margin: '10px', width: '96%', height: '520px', border: 'none' }}
                            name="reviewDetail" />
                    </div>
                </div>
            </section>
        </main>
    );
}
export default WriteReviewPost;