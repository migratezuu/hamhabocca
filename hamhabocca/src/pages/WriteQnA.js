import style from "./WriteQnA.module.css"
import { callPostQnaAPI } from "../apis/QnAAPICalls";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function WriteQnA() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        qnaCategory: '',
        qnaTitle: '',
        qnaDetail: ''
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
            [e.target.name]: e.target.value
        });
    }

    const onClickQnaPostHandler = () => {

        console.log('[QNA 등록] onClickQnaPostHandler');

        const formData = new FormData();

        formData.append("qnaCategory", form.qnaCategory);
        formData.append("qnaTitle", form.qnaTitle);
        formData.append("qnaDetail", form.qnaDetail);

        dispatch(callPostQnaAPI({ form: formData }));

        alert('건의글 메인페이지로 이동합니다.');
        navigate('/qna', { replace: true });
        window.location.reload();
    };

    return (

        <main className={style.all}>

            <div className={style.title}>
                <h1>건의 게시글 작성</h1>
                <br />
                <hr />
            </div>
            <br />
            <div className={style.contents}>

                <div className={style.cg}>
                    <label>카테고리</label>
                    <select className={style.dropdownbox} name="qnaCategory" onChange={onChangeHandler}>
                        <option>선택</option>
                        <option value="건의">건의</option>
                        <option value="랠리">랠리</option>
                    </select>
                </div>
                <br />
                <div className={style.tit}>
                    <label>제목</label>
                    <input className={style.titfield} type="text" size="50" name="qnaTitle" onChange={onChangeHandler} />
                </div>
                <br />
                <div className={style.conTextarea}>
                    <label className={style.labelarea}>내용</label>

                    <textarea className={style.textfield} cols="700" rows="230" name="qnaDetail" onChange={onChangeHandler}></textarea>

                </div>
                <div className={style.fileImg}></div>

            </div>
            <br />
            <hr />
            <article className={style.btn}>
                <button onClick={onClickQnaPostHandler}>등록</button>
            </article>

            <br />

        </main>
    );
}

export default WriteQnA;