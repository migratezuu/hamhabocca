import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { OPEN_DELETE_POST } from "../modules/ModalsModule";
import ModalDelete from "../components/modals/ModalDelete";
import style from './QnAPost.module.css';
import { callQnaDetailAPI } from "../apis/QnAAPICalls";

function QnAPost() {

    /* 현재 사용자 */
    const token = window.localStorage.getItem("jwtToken");
    const MEMBER_ID = JSON.parse(token)?.memberId;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { qnaId } = useParams();
    const qna = useSelector(state => state.qnaReducer)
    const deletePostState = useSelector(state => state.modalsReducer.deletePostState);

    /* QNA 아이디 */
    const QNA_ID = qnaId;
    /* QNA 카테고리 */
    const QNA_CATEGORY = qna.qnaCategory;
    /* QNA 제목 */
    const QNA_TITLE = qna.qnaTitle;
    /* QNA 내용 */
    const QNA_DETAIL = qna.qnaDetail;
    /* QNA 작성자 */
    const QNA_WRITER = qna.memberId;
    /* 작성일 */
    const qnawritedate = new Date(qna.qnaWriteDate);
    
    const NICKNAME = qna.member?.nickname;
    console.log('닉네임' + NICKNAME);

    /* 게시글 상단 버튼 */
    function PostSet() {

        // 작성자일 때 
        if (MEMBER_ID === QNA_WRITER) {

            return (
                <>
                    <button onClick={() => { navigate(`/qna/${qnaId}/edit`, { replace: true }); }} className={style.editbtn}>수정</button>
                    <button onClick={() => { dispatch({ type: OPEN_DELETE_POST }) }} className={style.deletebtn}>삭제</button>
                    {deletePostState && <ModalDelete qnaId={qnaId} />}
                </>
            );
        }

        // 작성자 아닐떄
        return (
            <>
            </>
        );


    }

    useEffect(
        () => {
            dispatch(callQnaDetailAPI({ qnaId: qnaId }));
        }, []
    );



    return (
        <main className={style.all}>
            <div>
                <div className={style.post}>
                    <div className={style.d1}>
                        <h6 className={style.member}>{QNA_CATEGORY}</h6>
                        <h6 className={style.postname}>{QNA_TITLE}</h6>
                    </div>

                    <div className={style.d2}>
                        <h6 className={style.writer}>{NICKNAME}</h6>

                        <h6 className={style.date}>{qnawritedate.toLocaleDateString().slice(0, -1)}</h6>
                    </div>
                </div>
                <hr />
                <div className={style.button}>
                    {PostSet()}
                </div>
                <div className={style.contants}>
                    <div>
                        {/* <div className={style.img}>이미지</div>
                        <br /> */}
                        <br/>
                        <br/>
                        <h4>{QNA_DETAIL}</h4>
                    </div>
                </div>
            </div>
            <hr />
            <br/>
            
            <div className={style.writer2}>
            
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className={style.comment1}>
            
            </div>
            <br />
            <div className={style.writer3}>
            
            
            </div>
            <br />
            <div className={style.comment2}>
            
            </div>
            <hr />
            <h3>{NICKNAME}</h3>
            <br />
            <div className={style.container}>
                <textarea className={style.comment3} cols='10' rows='5' />
                <button className={style.btn} >등록</button>
            </div>
        </main>
    );
}

export default QnAPost;