import { OPEN_RECRUIT_LIST, OPEN_PARTICIPATE, OPEN_CANCEL_PARTICIPATE, OPEN_CANCEL_RALLY, OPEN_REPORT } from "../modules/ModalsModule";
import ModalCurrentRecruitList from "../components/modals/ModalCurrentRecruitList";
import ModalParticipate from "../components/modals/ModalParticipate";
import ModalRallyCancel from "../components/modals/ModalRallyCancel";
import ModalReport from "../components/modals/ModalReport";

import style from "./RallyPost.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import SearchFilter from "../components/commons/SearchFilter";
import { callModifyRallyAPI, callRallyDetailAPI } from "../apis/RallyAPICalls";
import { callParticipateListAPI } from "../apis/ParticipateAPICalls";
import Kakaomap from '../components/items/Kakaomap';
import ModalParticipateCancel from "../components/modals/ModalParticipateCancel";
import Loading from "../components/commons/Loading";

function RallyPost() {
    
    const loading = useSelector(state => state.loadingReducer);

    /* 현재 사용자 */
    const token = window.localStorage.getItem("jwtToken");
    const MEMBER_ID = JSON.parse(token)?.memberId;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { rallyId } = useParams(); // :rallyId
    const rally = useSelector(state => state.rallyReducer);
    const mateList = useSelector(state => state.participateReducer);

    const RALLY_NAME = rally.rallyName;                                         //랠리명
    const RALLY_STATUS = rally.rallyStatus;                                     //랠리상태
    const RALLY_TYPE = rally.rallyType;                                         //랠리타입
    const RALLY_DATE = new Date(rally.rallyDate).toLocaleString();              //랠리날짜
    const RALLY_LOCATION = rally.rallyLocation;                                 //랠리모집장소
    const RALLY_END_LOCATION = rally.rallyEndLocation;                          //랠리도착장소
    const RALLY_DISTANCE = rally.rallyDistance;                                 //랠리예상거리
    const RALLY_MINIMUM = rally.rallyMinimum;                                   //랠리최소인원
    const RALLY_MAXIMUM = rally.rallyMaximum;                                   //랠리최대인원
    const RALLY_DETAIL = rally.rallyDetail;                                     //랠리상세글
    const RALLY_WRITE_DATE = new Date(rally.rallyWriteDate).toLocaleString();   //작성일

    const MASTER_ID = rally.masterId;                   //작성자Id
    const NICKNAME = rally.master?.nickname;                   //작성자닉네임
    const PROFILE_IMG = rally.master?.imageSource;

    useEffect(
        () => {
            dispatch(callRallyDetailAPI({ rallyId: rallyId }));
            dispatch(callParticipateListAPI({ rallyId: rallyId }));
        }, []
    );

    /* 모달오픈상태 */
    const isModal = useSelector(state => state.modalsReducer);
    const recruitListModal = isModal.recruitListState;
    const participateModal = isModal.participateState;
    const cancelParticipateModal = isModal.cancelParticipateState;
    const cancelRallyModal = isModal.cancelRallyState;
    const reportModal = isModal.reportState;

    /* 상태변경 */
    const onClickRallyStatusUpdateHandler = (status) => {

        const formData = new FormData();
        formData.append("rallyStatus", status);

        dispatch(callModifyRallyAPI({
            form: formData,
            rallyId: rallyId
        }));
    };

    /* 랠리 상태 */
    function RallyStatus() {
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
    function RallyType() {
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

    /* 게시글 상단 버튼 */
    function PostSet() {

        // 작성자일 때
        if (MEMBER_ID === MASTER_ID) {

            switch (RALLY_STATUS) {
                case "완주!":
                    return (<button className={style.edit} onClick={() => { navigate(`/rally/${rallyId}/edit`, { replace: true }); }}>수정</button>);

                case "취소됨":
                    return (<></>);
                default:
                    return (
                        <>
                            <button onClick={() => { dispatch({ type: OPEN_CANCEL_RALLY }) }} className={style.report}>랠리취소</button>
                            {cancelRallyModal && <ModalRallyCancel rally={rally} />}
                            <button className={style.edit} onClick={() => { navigate(`/rally/${rallyId}/edit`, { replace: true }); }}>수정</button>
                        </>
                    );
            }
        }

        // 작성자가 아닐 때
        return (
            <>
                <button onClick={() => { dispatch({ type: OPEN_REPORT }) }} className={style.edit}>신고</button>
                {reportModal && <ModalReport />}
            </>
        );
    };

    /* 랠리 신청 이벤트 */
    function eventbutton() {

        // 작성자
        if (MEMBER_ID === MASTER_ID) {

            switch (RALLY_STATUS) {
                case "모집중":
                    return (
                        <>
                            <button onClick={() => { dispatch({ type: OPEN_RECRUIT_LIST }) }}>
                                신청 현황
                            </button>
                            {recruitListModal && <ModalCurrentRecruitList />}
                            <button style={{ background: '#056DFA' }}
                                onClick={() => { onClickRallyStatusUpdateHandler("모집완료"); window.location.reload(); }}>
                                모집 마감
                            </button>
                        </>
                    );
                case "모집완료":
                    return (
                        <button className={style.done} onClick={() => { onClickRallyStatusUpdateHandler("완주!"); window.location.reload(); }}>
                            랠리 완주!
                        </button>
                    );
                default:
                    return (
                        <>
                            <button onClick={() => { dispatch({ type: OPEN_RECRUIT_LIST }) }}>
                                신청 현황
                            </button>
                            {recruitListModal && <ModalCurrentRecruitList />}
                        </>
                    );
            }
        }

        // 타회원
        if (RALLY_STATUS === '모집중' || RALLY_STATUS === '모집완료') {

            // 신청
            if (Array.isArray(mateList) && (mateList?.filter(mate => mate.memberId === MEMBER_ID)[0])) {
                return (
                    <>
                        <button onClick={() => { dispatch({ type: OPEN_RECRUIT_LIST }) }}>신청 현황</button>
                        {recruitListModal && <ModalCurrentRecruitList />}
                        <button onClick={() => { dispatch({ type: OPEN_CANCEL_PARTICIPATE }) }} style={{ background: '#056DFA' }}>신청 취소</button>
                        {cancelParticipateModal && <ModalParticipateCancel rally={rally} />}
                    </>
                );
            };

            // 미신청
            return (
                <>
                    <button onClick={() => { dispatch({ type: OPEN_RECRUIT_LIST }) }}>신청 현황</button>
                    {recruitListModal && <ModalCurrentRecruitList />}
                    <button onClick={() => { dispatch({ type: OPEN_PARTICIPATE }) }} style={{ background: '#056DFA' }}>랠리 신청</button>
                    {participateModal && <ModalParticipate rally={rally} />}

                </>
            );
        };
    };

    return (
        <main className={style.container}>
            <SearchFilter />
            <section className={style.board}>
                { loading? <Loading/> : 
                <div>
                    <article className={style.title}>
                        <div className={style.label}><RallyStatus /></div>
                        <div className={style.label}><RallyType /></div>
                        <div className={style.rallyname}>{RALLY_NAME}</div>
                        <div className={style.postStatus}><PostSet /></div>
                    </article>
                    <article className={style.writer}>
                        <div>
                            <div className={style.writerImg}>
                                <img src={PROFILE_IMG} style={{ borderRadius: '50%' }} />
                            </div>
                            <h4>{NICKNAME}</h4>
                        </div>
                        <p>{RALLY_WRITE_DATE}</p>
                    </article>
                    <article className={style.rallyinfo}>
                        <div className={style.map}>
                            {RALLY_LOCATION && RALLY_END_LOCATION ?
                                <Kakaomap departureAddress={RALLY_LOCATION} arrivalAddress={RALLY_END_LOCATION} /> : null}
                        </div>
                        <div className={style.info}>
                            <div className={style.location}>
                                <h2>{RALLY_DISTANCE}km</h2>
                                <h4>출발지</h4>
                                <h3>{RALLY_LOCATION}</h3>
                                <h4>도착지</h4>
                                <h3>{RALLY_END_LOCATION}</h3>
                            </div>
                            <div>
                                <div className={style.time}>
                                    <div className={style.datelabel}>출발 시각</div>
                                    <p>{RALLY_DATE}</p>
                                </div>
                                <div className={style.time}>
                                    <div className={style.datelabel}>모집 인원</div>
                                    <p>최소 {RALLY_MINIMUM || '0'}명 ~ 최대 {RALLY_MAXIMUM || '4'}명</p>
                                </div>
                            </div>
                            <div className={style.rallyStatus}>{eventbutton()}</div>
                        </div>
                    </article>
                    <article className={style.rallydetail}>
                        {RALLY_DETAIL}
                    </article>
                    {/* <article className={style.comments}>
                        <div className={style.commentList}></div>
                        <div className={style.mycomment}>
                            <h5>내 닉네임</h5>
                            <div className={style.mention}>
                                <textarea />
                                <button>등록</button>
                            </div>
                        </div>
                    </article> */}
                </div>}
            </section>
        </main>
    );
}

export default RallyPost;