import { useSearchParams } from "react-router-dom";
import ReviewSearchFilter from "../components/commons/ReviewSearchFilter";
import style from "./WriteReviewPost.module.css";
import React, { useRef } from "react";

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { callPostReviewAPI } from "../apis/ReviewAPICalls";

function WriteReviewPost() {

    const [searchParams, setSearchParams] = useSearchParams();
    
    /* 이 리뷰의 랠리의 id */
    const rallyId = searchParams.get("rallyid");
    const imageInput = useRef();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        reviewTitle: '',
        reviewDetail:'',
        rallyId: `${rallyId}`,
        reviewWriteDate: new Date(),
        reviewImage: null
    });

    useEffect(
        () => {
            setForm({
                ...form,
            })
        }, []
    );

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const onClickReviewPostHandler = () => {

        const formData = new FormData();

        formData.append("reviewTitle", form.reviewTitle);
        formData.append("reviewDetail", form.reviewDetail);
        formData.append("rallyId", form.rallyId);
        formData.append("reviewWriteDate", form.reviewWriteDate); // 현재 시간 추가
        
        if (form.reviewImage) {
            formData.append("reviewImage", form.reviewImage);
        }
        
        dispatch(callPostReviewAPI({ form : formData }));

        alert('리뷰 게시판으로 이동합니다.');
        navigate('/review', { replace : true });
        window.location.reload();
    };
    
    return (
        <main className={style.container}>
            <section className={style.filter}>
                <ReviewSearchFilter />
            </section>

            <section className={style.board}>

                <article className={style.title}>
                    <div>
                        <h1>랠리 후기 작성</h1>
                    </div>
                    <div className={style.report}>
                    <button onClick={onClickReviewPostHandler}>등록</button>
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
                            <input style={{ display: 'none' }} type="file" ref={imageInput} /></div>
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