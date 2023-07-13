import { Link } from 'react-router-dom';
import style from './ReviewCardBoard.module.css';

function ReviewCardBoard({review}) {


    /* 작성일 */
    const REVIEW_DATE = new Date(review.reviewWriteDate).toLocaleDateString().slice(0, -1);

    const RALLY_NAME = review.rally?.rallyName;

    const RALLY_TYPE = review.rally?.rallyType;
    
    /* 랠리 타입 구분 */
    const rallytype = () => {

        const styleIpmun = {
            border: '1.5px solid #056DFA',
            color: '#056DFA'
        };

        switch (RALLY_TYPE) {
            default:
                return <div className={style.label} style={styleIpmun}>입문</div>;
            case "초보":
                return <div className={style.label} style={{ background: '#60A3FF' }}>초보</div>;
            case "중수":
                return <div className={style.label} style={{ background: '#056DFA' }}>중수</div>;
            case "고수":
                return <div className={style.label} style={{ background: '#0E4288' }}>고수</div>;
            case "전설":
                return <div className={style.label} style={{ background: '#303030' }}>전설</div>;
        }
    };


    
    return (
        <Link to={`/review/${review.reviewId}`} style={{ textDecoration: 'none', color: '#202020' }}>
            <section className={`${style.category} ${style.flex_center}`}>
                <div>
                    {rallytype()}
                </div>
                <div>{RALLY_NAME}</div>
                <div>{review.reviewTitle}</div>
                <div>{review.member?.nickname}</div>
                <div>{REVIEW_DATE}</div>
            </section>
        </Link>
    );
}

export default ReviewCardBoard;