import style from './ReviewCardMain.module.css';
import { AiOutlineArrowRight } from 'react-icons/ai';

function ReviewCardMain({ item }) {

    const reviewlocation = item.reviewstartlocation.split(' ');
    const reviewstarttime = new Date(item.reviewstarttime);

    /* 랠리 타입 구분 */
    const reviewtype = () => {

        const styleIpmun = {
            border: '1.5px solid #056DFA',
            color: '#056DFA'
        };

        switch (item.reviewtype) {
            default:
                return <div className={style.ReviewType} style={styleIpmun}>입문</div>;
            case "초보":
                return <div className={style.ReviewType} style={{ background: '#60A3FF' }}>초보</div>;
            case "중수":
                return <div className={style.ReviewType} style={{ background: '#056DFA' }}>중수</div>;
            case "고수":
                return <div className={style.ReviewType} style={{ background: '#0E4288' }}>고수</div>;
            case "전설":
                return <div className={style.ReviewType} style={{ background: '#303030' }}>전설</div>;
        }
    };

    return (
        <div className={style.Container}>
            {reviewtype()}
            <h3>
                {item.reviewTitle}
            </h3>
            <div className={style.DateAndLocation}>
                <label>{reviewstarttime.toLocaleDateString().slice(0, -1)}</label>
                <label className={style.ReviewLocation}>{reviewlocation[1]}</label>
            </div>
            <label className={style.ReviewMaster}>{item.reviewmaster}</label>
            <button><AiOutlineArrowRight /></button>
        </div>
    )
}

export default ReviewCardMain;