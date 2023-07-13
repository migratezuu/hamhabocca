import { useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { OPEN_REVIEW_REPORT, OPEN_DELETE_REVIEW} from '../modules/ModalsModule';
import { useDispatch, useSelector } from "react-redux";
import { callReviewRallyAPI } from '../apis/RallyReviewAPICalls';
import ReviewSearchFilter from "../components/commons/ReviewSearchFilter";
import ModalReviewReport from "../components/modals/ModalReviewReport";
import ModalDeleteReview from "../components/modals/ModalDeleteReview";
import Kakaomap from '../components/items/Kakaomap';
import Loading from '../components/commons/Loading';
import style from './ReviewPost.module.css';

function ReviewPost() {

    const loading = useSelector(state => state.loadingReducer);

    const token = window.localStorage.getItem("jwtToken");
    const MEMBER_ID = JSON.parse(token)?.memberId;

    //리덕스
    const dispatch = useDispatch();
    const { reviewId } = useParams();
    const review = useSelector(state => state.reviewReducer);

    const REVIEW_TITLE = review.reviewTitle;

    const RALLY = review.rally;
    const RALLY_NAME = review.rally?.rallyName;

    /*모달*/
    const reportReviewState = useSelector(state => state.modalsReducer.reportReviewState);
    const deleteReviewState = useSelector(state => state.modalsReducer.deleteReviewState);

    useEffect(
        () => {
            dispatch(callReviewRallyAPI({ reviewId: reviewId }));
        }
        , []
    );

    /* 리뷰 작성 일자 */
    const REVIEW_WRITE_DATE = new Date(review.reviewWriteDate);

    /* 리뷰 작성자 */
    const REVIEW_WRITER = review.member?.nickname;

    /* 리뷰 상세 내용 */
    const REVIEW_DETAIL = review.reviewDetail;

    /* 랠리 출발 시각 */
    const RALLY_START_TIME = new Date(review.rally?.rallyDate);

    /* 랠리 거리 */
    const RALLY_DISTANCE = review.rally?.rallyDistance;

    /* 랠리 장소 */
    const RALLY_LOCATION = review.rally?.rallyLocation;

    /* 랠리 종료 장소 */
    const RALLY_END_LOCATION = review.rally?.rallyEndLocation;

    /* 랠리 타입(입문~) */
    const RALLY_TYPE = review.rally?.rallyType;

    const MEMBER_IMAGE = review.member?.imageSource;

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

    /* 작성자일 때 */
    const postSet = () => {

        if (MEMBER_ID === review.memberId) {
            return (
                <>
                    <button onClick={() => { dispatch({ type: OPEN_DELETE_REVIEW }) }}
                        style={{ marginLeft: '10px' }}>삭제</button>
                    {deleteReviewState && <ModalDeleteReview reviewId={reviewId} />}

                    <Link to={`/review/${review.reviewId}/edit`}>
                        <button className={style.edit}>수정</button>
                    </Link>
                </>
            )
            /* 작성자가 아닐 때 */
        } else if (!(review.reviewId === review.memberId)) {

            return (
                <div className={style.postStatus}>
                    <button className={style.edit} onClick={() => { dispatch({ type: OPEN_REVIEW_REPORT }) }}>신고</button>
                    {reportReviewState && <ModalReviewReport />}
                </div>
            );
        }
    }

    return (
        <>
            <main className={style.containerMain}>

                <section className={style.filter}>
                    <ReviewSearchFilter />
                </section>
                <hr />
                <div className={style.Main}>
                    {loading ? <Loading /> :
                        <div>
                            <div className={style.title} >
                                <div className={style.labellabel}>
                                    <div className={style.mini2}>{rallytype()}</div>
                                    <h2>{REVIEW_TITLE}</h2>
                                </div>
                                <div className={style.postStatus}>
                                    <div className={style.report}>
                                        {postSet()}
                                    </div>
                                </div>
                            </div>
                            <div className={style.Context}>
                                <article className={style.container2}>
                                    <div className={style.container2}>
                                        <img src={MEMBER_IMAGE} className={style.picture} />
                                        <h3 >{REVIEW_WRITER}</h3>
                                    </div>
                                    <div className={style.containerTime}>
                                        {REVIEW_WRITE_DATE.toLocaleString().slice(0, -3)}
                                    </div>
                                </article>

                                <div className={style.Review}>
                                    <h2 style={{ margin: '20px', marginBottom: '20px' }}>랠리명 : {RALLY_NAME}</h2>
                                    <div className={style.container3}>
                                        <div className={style.map}>
                                            {RALLY_LOCATION && RALLY_END_LOCATION ?
                                                <Kakaomap departureAddress={RALLY_LOCATION} arrivalAddress={RALLY_END_LOCATION} /> : null}
                                        </div>
                                        <div className={style.mainContext}>
                                            <h1 className={style.Kmlabel}>{RALLY_DISTANCE}Km</h1>
                                            <div className={style.info}>
                                                <div className={style.location}>
                                                    <h4>출발지</h4>
                                                    <h3>{RALLY_LOCATION}</h3>
                                                    <h4>도착지</h4>
                                                    <h3>{RALLY_END_LOCATION}</h3>
                                                </div>
                                            </div>
                                            <div className={style.container}>
                                                <div className={style.startlabel}>출발 시각</div>
                                                <h3 style={{ marginTop: '17px', marginLeft: '10px' }}>{RALLY_START_TIME.toLocaleString().slice(0, -3)}</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div style={{ margin: '15px', lineHeight: '25px', fontSize: '20px', backgroundColor: '#FF7A00', color: 'white', height: '30px' }}>[{RALLY_NAME}]의 랠리후기 </div>
                                {/* <div className={style.mainPic}> 후기사진</div> */}
                                <h3 style={{ margin: '15px', lineHeight: '25px', marginBottom: '50px', marginTop: '30px' }}>{REVIEW_DETAIL}</h3>
                                <hr />
                                {/* <div style={{ margin: '15px', height: '300px' }}>댓글</div>
                                <hr />
                                <h3>{REVIEW_WRITER}</h3>
                                <div className={style.container}>
                                    <textarea className={style.Comment} cols='30' rows='5' />
                                    <div>
                                        <button className={style.GoReview} >작성</button>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    }

                </div>
            </main>
        </>
    );
}

export default ReviewPost;