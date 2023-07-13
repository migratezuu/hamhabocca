import style from './RallyCardMyPage.module.css';
import { BiCalendarCheck } from 'react-icons/bi';
import { Link } from "react-router-dom";

function RallyCardMyPage({ rally, typeOfList }) {

    var index = rally.rallyLocation.indexOf(' ', rally.rallyLocation.indexOf(' ') + 1);

    const rallylocation = rally.rallyLocation.substr(0, index);
    const rallystarttime = new Date(rally.rallyDate);
    const rallyStatus = rally.rallyStatus;

    const isAccepted = rally.isAccepted;

    const availableOptions = () => {

        if (typeOfList === '참여') {
            
            let approval = "미승인";
            
            if(isAccepted === "Y") {
                approval = "승인됨";

                switch (rallyStatus) {
                    case "완주!":
                        return  <Link to={`/review/write?rallyid=${rally.rallyId}`} style={{ color: 'white', textDecoration: 'none' }}>
                                    <button className={style.button} style={{ background: '#056DFA' }}>
                                        후기 작성
                                    </button>
                                </Link>;
                    case "모집중":
                        return <button className={style.button} style={{ background: '#63AF73' }}>{approval}</button>;
                    case "모집완료":
                        return <button className={style.button} style={{ background: '#FF7A00' }}>모집완료</button>;
                    case "취소됨":
                        return <button className={style.button} style={{ background: '#D9D9D9' }}>취소됨</button>;
                }

            } 

            switch (rallyStatus) {
                case "완주!":
                    return <button className={style.button} style={{ background: '#D9D9D9', cursor:'default' }} disabled>
                                    종료됨
                            </button>
                case "모집중":
                    return <button className={style.button} style={{ background: '#63AF73' }}>{approval}</button>;
                case "모집완료":
                    return <button className={style.button} style={{ background: '#FF7A00' }}>모집완료</button>;
                case "취소됨":
                    return <button className={style.button} style={{ background: '#D9D9D9' }}>취소됨</button>;
            }

        }

        switch (rallyStatus) {
            case "완주!":
                return  <Link to={`/review/write?rallyid=${rally.rallyId}`} style={{ color: 'white', textDecoration: 'none' }}>
                            <button className={style.button} style={{ background: '#056DFA' }}>
                                후기 작성
                            </button>
                        </Link>;
            case "모집중":
                return <button className={style.button} style={{ background: '#63AF73' }}>모집중</button>;
            case "모집완료":
                return <button className={style.button} style={{ background: '#FF7A00' }}>모집완료</button>;
            case "취소됨":
                return <button className={style.button} style={{ background: '#D9D9D9' }}>취소됨</button>;
        }

    }

    const rallytype = () => {

        const styleIpmun = {
            border: '1.5px solid #056DFA',
            color: '#056DFA'
        };

        switch (rally.rallyType) {
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
        <div  className={style.CardContainer} >
            <div className={style.TypeAndTitle}>
                {rallytype()}
                <Link to={`/rally/${rally.rallyId}`} style={{ textDecoration: 'none', color: '#202020' }}>
                    <label className={style.RallyName}>{rally.rallyName}</label>
                </Link>
            </div>
            <div className={style.Others}>
                <label className={style.Date}><BiCalendarCheck className={style.BiCalendarCheck} />
                    {rallystarttime.toLocaleDateString().slice(0, -1)}
                </label>
                <h4>{rallylocation}</h4>
                {availableOptions()}
            </div>
        </div>
    );
}

export default RallyCardMyPage;