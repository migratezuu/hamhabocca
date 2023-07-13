import style from './MyPage.module.css';
import { IoIosFemale } from 'react-icons/io';
import { IoIosMale } from 'react-icons/io';
import { getCurrentMember, getParticipatedRallies, getRecruitedRallies } from '../apis/MemberAPICalls';
import MyPageList from '../components/lists/MyPageList';
import ModalDeactivate from '../components/modals/ModalDeactivate';
import ModalProfile from "../components/modals/ModalProfile";
import { useDispatch, useSelector } from 'react-redux';
import { OPEN_DELETE_ACCOUNT, OPEN_PROFILE } from '../modules/ModalsModule';
import { useEffect } from 'react';
import Loading from '../components/commons/Loading';

function MyPage() {

    const dispatch = useDispatch();

    const loading = useSelector(state => state.loadingReducer);

    /* 모달 */
    const deleteAccountState = useSelector(state => state.modalsReducer.deleteAccountState);
    const profileState = useSelector(state => state.modalsReducer.profileState);

    /* 이 마이페이지의 주인 멤버 */
    const member = useSelector(state => state.memberReducer);

    /* 멤버의 모집/참여 이력 */
    const recruited = useSelector(state => state.rallyReducer);
    const recruitedList = recruited?.recruitedRallyList?.reverse();
    const participated = useSelector(state => state.participateReducer);
    const participatedList = participated?.finalRallyList?.reverse();

    /* 성별 아이콘 */
    function GenderIcon() {

        if (member?.gender === 'female') {
            return <IoIosFemale />
        } else {
            return <IoIosMale />
        }
    }

    /* 소셜 로그인 아이콘 */
    function SocialIcon() {

        if (member?.socialLogin === "KAKAO") {
            return <img src='./img/kakao.png' alt='kakao logo' width={'20px'} height={'20px'} />
        }

        if (member?.socialLogin === 'NAVER') {
            return <img src='./img/naver.png' alt='naver logo' width={'20px'} height={'20px'} />
        }
    }

    /* 레벨 */
    const level = Math.floor(member?.mileage / 200) + 1;

    /* 달성 퍼센티지 구하는 함수 */
    function getPercent() {

        if (member?.mileage != null && member?.mileage > 0) {
            return (
                (member?.mileage - ((level - 1) * 200)) / 200
            )
        }
        return 0;
    }

    /* 다음 단계까지 남은 km 수 구하는 함수 */
    function getRemainingKm() {

        return (level * 200) - member?.mileage;
    }

    /* 원형 프로그레스 바 용도 */
    const RADIUS = 54;
    const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
    var progress = getPercent();
    const dashoffset = CIRCUMFERENCE * (1 - progress);
    const circleStyle = { strokeDasharray: CIRCUMFERENCE, strokeDashoffset: dashoffset }

    useEffect(() => {
        dispatch(getCurrentMember());
        dispatch(getParticipatedRallies());
        dispatch(getRecruitedRallies());
    }, []
    );

    return (
        <>
            <main className={style.Main}>
                {loading ? <Loading /> :
                    <>
                        <section className={style.Left}>
                            <div className={style.Profile}>
                                <img src={member?.imageSource} alt='profile' className={style.ProfileImg} />
                                <div className={style.Name}>
                                    <div className={style.Social}>{SocialIcon()}</div>
                                    <label>{member?.nickname}</label>
                                    <label className={style.Gender}>{GenderIcon()}</label>
                                </div>
                                <label className={style.Nickname}>{member?.email}</label>
                            </div>
                            <div className={style.RiderProfile}>
                                <h4>라이더 프로필</h4>
                                <div className={style.circle_progress_wrap}>
                                    <svg className={style.circle_progress} width="120" height="120" viewBox="0 0 120 120">
                                        <circle className={style.frame} cx="60" cy="60" r="54" strokeWidth="12" />
                                        <circle className={style.bar} cx="60" cy="60" r="54" strokeWidth="12" style={circleStyle} />
                                    </svg>
                                    <div className={style.ProgressText}>
                                        <label>다음 단계까지</label>
                                        <label>{getRemainingKm()}km</label>
                                    </div>
                                </div>
                                <label>현재 단계 : {member?.level}</label>
                                <div className={style.RiderProfileInfo}>
                                    <div>
                                        <h4>선호 지역</h4>
                                        <label>{member?.preferredLocation}</label>
                                    </div>
                                    <div>
                                        <h4>선호 랠리 타입</h4>
                                        <label>{member?.preferredType}</label>
                                    </div>
                                    <div>
                                        <h4>랠리 모집 횟수</h4>
                                        <label>{recruitedList?.length}</label>
                                    </div>
                                    <div>
                                        <h4>랠리 참여 횟수</h4>
                                        <label>{participatedList?.length}</label>
                                    </div>
                                </div>
                                <button onClick={() => { dispatch({ type: OPEN_PROFILE }) }} className={style.EditProfile}>프로필 수정</button>
                                {profileState && <ModalProfile member={member} />}
                            </div>
                            <div>
                                <button className={style.Deactivate} onClick={() => { dispatch({ type: OPEN_DELETE_ACCOUNT }) }}>사이트 탈퇴하기</button>
                                {deleteAccountState && <ModalDeactivate />}
                            </div>
                        </section>
                        <section className={style.Right}>
                            <MyPageList typeOfList={'모집'} rallyList={recruitedList} />
                            <MyPageList typeOfList={'참여'} rallyList={participatedList} />
                        </section>
                    </>
                }
            </main>
        </>
    );
}

export default MyPage;