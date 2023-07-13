import { useDispatch, useSelector } from 'react-redux';
import style from './MemberCardModal.module.css';
import { callAllowParticipateByMasterAPI } from '../../apis/ParticipateAPICalls';

function MemberCardModal({ mate }) {

    const dispatch = useDispatch();

    const RALLY = useSelector(state => state.rallyReducer);

    /* 현재 사용자 */
    const token = window.localStorage.getItem("jwtToken");
    const MEMBER_ID = JSON.parse(token)?.memberId;

    const DATE = new Date(mate.participationDate).toLocaleString();
    const RALLY_ID = mate.rallyId;
    const MATE_ID = mate.memberId;
    const ACCEPT = mate.isAccepted;
    const NICKNAME = mate.member?.nickname;
    const PROFILE_IMG = mate.member?.imageSource;

    if (MEMBER_ID === RALLY.master?.memberId) {
        return (
            <div className={style.member}>
                <p><img src={PROFILE_IMG} style={{ borderRadius: '50%' }} /></p>
                <p>{NICKNAME}</p>
                <p>{DATE}</p>
                <p>{ACCEPT === 'Y' ? '승인됨' : <button onClick={() => dispatch(callAllowParticipateByMasterAPI({ rallyId: RALLY_ID, mateId: MATE_ID }))}>승인</button>}</p>
            </div>
        );
    }

    return (
        <div className={style.member}>
            <p></p>
            <p>{NICKNAME}</p>
            <p>{DATE}</p>
            <p>{ACCEPT === 'Y' ? '승인' : '미승인'}</p>
        </div>
    );

};

export default MemberCardModal;