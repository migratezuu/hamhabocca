import style from "./WriteQnA.module.css"
import { callQnaDetailAPI, callModifyRallyAPI } from "../apis/QnAAPICalls";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";


function EditQnA() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { qnaId } = useParams();

    const qna = useSelector(state => state.qnaReducer)

    /* QNA 카테고리 */
    const QNA_CATEGORY = qna.qnaCategory;

    /* QNA 제목 */
    const QNA_TITLE = qna.qnaTitle;

    /* QNA 내용 */
    const QNA_DETAIL = qna.qnaDetail;

    const [form, setForm] = useState({
        qnaCategory: "",
        qnaTitle: "",
        qnaDetail: ""
    });

    useEffect(() => {
        dispatch(callQnaDetailAPI({ qnaId: qnaId })).then(response => {
            setForm({
                qnaCategory: qna.qnaCategory,
                qnaTitle: qna.qnaTitle,
                qnaDetail: qna.qnaDetail
            });
        });
    }, [dispatch, qnaId]);

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const onClickQnaUpdateHandler = () => {

        console.log('[QNA 수정완료] onClickQnaUpdateHandler');

        const formData = new FormData();

        formData.append("qnaCategory", form.qnaCategory);
        formData.append("qnaTitle", form.qnaTitle);
        formData.append("qnaDetail", form.qnaDetail);

        dispatch(callModifyRallyAPI({ form: formData, qnaId: qnaId }));

        alert('수정이 완료되었습니다.');
        navigate(`/qna/${qnaId}`, { replace: true });
        window.location.reload();
    };

    return (

        <main className={style.all}>

            <div className={style.title}>
                <h1>건의 게시글 수정</h1>
                <br />
                <hr />
            </div>
            <br />
            <div className={style.contents}>

                <div className={style.cg}>
                    <label>카테고리</label>
                    <select className={style.dropdownbox} name="qnaCategory" onChange={onChangeHandler}>
                        <option>{QNA_CATEGORY}</option>
                        <option value="건의">건의</option>
                        <option value="랠리">랠리</option>
                    </select>
                </div>
                <br />
                <div className={style.tit}>
                    <label>제목</label>
                    <input className={style.titfield} type="text" size="50" name="qnaTitle" onChange={onChangeHandler} defaultValue={QNA_TITLE} />
                </div>
                <br />
                <div className={style.conTextarea}>
                    <label className={style.labelarea}>내용</label>

                    <textarea className={style.textfield} cols="700" rows="230" name="qnaDetail" onChange={onChangeHandler}>{QNA_DETAIL}</textarea>

                </div>
                <div className={style.fileImg}></div>
            </div>
            <br />
            <hr />
            <article className={style.btn}>
                <button onClick={onClickQnaUpdateHandler}>완료</button>
            </article>

            <br />

        </main>
    );
}

export default EditQnA;