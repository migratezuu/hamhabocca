import { Link } from 'react-router-dom';
import style from './RallyCardBoard.module.css';

function RallyCardBoard({ rally }) {

    const RALLY_ID = rally.rallyId;             //랠리ID    
    const RALLY_STATUS = rally.rallyStatus;     //랠리상태
    const RALLY_TYPE = rally.rallyType;         //랠리타입
    const RALLY_NAME = rally.rallyName;         //랠리팀명
    const RALLY_DATE = new Date(rally.rallyDate).toLocaleDateString().slice(0, -1);                         //랠리일정
    const RALLY_LOCATION = rally.rallyLocation.split(' ')[0] + ' ' + rally.rallyLocation.split(' ')[1];     //랠리지역
    const RALLY_WRITE_DATE = new Date(rally.rallyWriteDate).toLocaleDateString().slice(0, -1);              //작성일

    /* 랠리 상태 */
    const rallyStatus = () => {
        switch (RALLY_STATUS) {
            case "모집완료":
                return <div style={{ background: '#FF7A00' }}>모집완료</div>;
            case "완주!":
                return <div style={{ background: '#056DFA' }}>완주!</div>;
            case "취소됨":
                return <div style={{ background: '#D9D9D9', color: 'black' }}>랠리취소</div>;
            default:
                return <div style={{ background: '#63AF73' }}>모집중</div>;
        }
    };

    /* 랠리 타입 구분 */
    const rallyType = () => {
        switch (RALLY_TYPE) {
            case "초보":
                return <div style={{ background: '#60A3FF' }}>초보</div>;
            case "중수":
                return <div style={{ background: '#056DFA' }}>중수</div>;
            case "고수":
                return <div style={{ background: '#0E4288' }}>고수</div>;
            case "전설":
                return <div style={{ background: '#303030' }}>전설</div>;
            default:
                return <div style={{ border: '1.5px solid #056DFA', color: '#056DFA' }}>입문</div>;
        }
    };

    const token = window.localStorage.getItem("jwtToken");

    const onClickHandler = () => {
        
        if(token === null) {
            alert('비회원은 이용 불가합니다.\n로그인 후 이용해주시길 바랍니다.');
        }
    }

    return (
        <Link to={token? `/rally/${RALLY_ID}`: '/login'} style={{ textDecoration: 'none', color: '#202020' }} onClick={() => {onClickHandler()}}>
            <section className={RALLY_STATUS === "취소됨"? `${style.category} ${style.cancel}`: `${style.category}`}>
                <div className={style.status}>
                    {rallyStatus()}
                </div>
                <div className={style.type}>
                    {rallyType()}
                </div>
                <div>{RALLY_NAME}</div>
                <div className={style.date}>
                    {RALLY_DATE}
                </div>
                <div>{RALLY_LOCATION}</div>
                <div>{RALLY_WRITE_DATE}</div>
            </section>
        </Link>
    );
}

export default RallyCardBoard;