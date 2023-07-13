import { Link } from 'react-router-dom';
import style from './QnACardBoard.module.css';

function QnACardBoard({ qna }) {

    /* QNA 아이디 */
    const QNA_ID = qna.qnaId;

    /* QNA 카테고리 */
    const QNA_CATEGORY = qna.qnaCategory;

    /* QNA 제목 */
    const QNA_TITLE = qna.qnaTitle;

    /* QNA 작성자 */
    const QNA_WRITER = qna.member?.nickname;
    /* 작성일 */
    const qnawritedate = new Date(qna.qnaWriteDate);

    /* 건의 상태 */
    const qnastatus = () => {
        switch (qna.qnaCategory) {
            case "건의":
                return <div className={style.label} style={{ background: '#7D7D7D' }}>
                    건의
                </div>;
            case "랠리":
                return <div className={style.label} style={{ background: '#7D7D7D', color: 'black' }}>
                    랠리
                </div>;
            default:
                return <div className={style.label} style={{ background: '#7D7D7D' }}>
                    건의
                </div>;
        }
    };

    return (
        <Link to={`/qna/${QNA_ID}`} style={{ textDecoration: 'none', color: '#202020' }}>


            <div className={style.cg}>

                <div className={style.cgselect}>
                    {qnastatus()}
                </div>
                <div>
                    <h6 className={style.postname}>{QNA_TITLE}</h6>
                </div>
                <div>
                    <h6 className={style.writer}>{QNA_WRITER}</h6>
                </div>
                <div className={style.date}>
                    <h6>{qnawritedate.toLocaleDateString().slice(0, -1)}</h6>
                </div>
            </div>
        </Link>
    );
}

export default QnACardBoard;