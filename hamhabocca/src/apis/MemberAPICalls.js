import { GET_MEMBER } from "../modules/MemberModule";
import { GET_RALLYLIST } from "../modules/RallyModule";
import { GET_PARTICIPATE } from "../modules/ParticipateModule";
import { CHECK_NICKNAME } from "../modules/NicknameModule";
import { OPEN_NICKNAME } from "../modules/ModalsModule";
import { LOADING } from "../modules/LoadingModule";

export const getMembers = async () => {

    /* 백엔드에 토큰 보내기 */
    const token = window.localStorage.getItem('jwtToken');

    const requestURL = 'http://dallibocca.ap-northeast-2.elasticbeanstalk.com/api/v1/members'

    const result = await fetch(requestURL, {
        method: 'GET',
        headers: {
            "Content-Type": 'application/json',
            "Accept": '*/*',
            "Auth": token
        }
    }).then(res => res.json());
}

/* 현재 로그인 된 멤버 정보 가져오기 */
export const getCurrentMember = () => {

    const token = window.localStorage.getItem('jwtToken');

    const requestURL = 'http://dallibocca.ap-northeast-2.elasticbeanstalk.com/api/v1/members/auth'

    return async (dispatch, getState) => {

        dispatch({ type: LOADING, payload: true});

        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
                "Accept": '*/*',
                "Auth": token
            }
        }).then(res => res.json());

        if (result.httpStatus === 200) {

            dispatch({ type: GET_MEMBER, payload: result.results.member });
            
            if(result.results.member.nickname.startsWith("새로운회원")) {
                
                dispatch({ type: OPEN_NICKNAME });
            }

            setTimeout(function () {
                dispatch({ type: LOADING, payload: false});
            }, 300);
        }
    };
}

/* 현재 로그인 된 멤버가 모집한 랠리 가져오기 */
export const getRecruitedRallies = () => {

    const token = window.localStorage.getItem('jwtToken');

    const requestURL = `http://dallibocca.ap-northeast-2.elasticbeanstalk.com/api/v1/members/recruit`

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
                "Accept": '*/*',
                "Auth": token
            }
        }).then(res => res.json());

        if (result.httpStatus === 200) {
            dispatch({ type: GET_RALLYLIST, payload: result.results });
        }
    };
}

/* 현재 로그인 된 멤버가 탈퇴 */
export const deactivateMember = () => {

    const token = window.localStorage.getItem('jwtToken');

    const memberId = JSON.parse(token).memberId;

    const requestURL = `http://dallibocca.ap-northeast-2.elasticbeanstalk.com/api/v1/members/${memberId}?type=deactivate`

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: 'PUT',
            headers: {
                "Content-Type": 'application/json',
                "Accept": '*/*',
                "Auth": token
            },
        })

        if (result.httpStatus === 200) {
            dispatch({ type: GET_RALLYLIST, payload: result.results });
        }
    };
}

/* 리뷰 작성 여부 확인 */
export const checkReviewStatus = (rallyId, memberId) => {

    const token = window.localStorage.getItem('jwtToken');

    const requestURL = ``;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                "Accept": '*/*',
                "Auth": token
            }
        })
            .then(res => res.json());

        if (result.httpStatus === 200) {
            dispatch({ type: GET_RALLYLIST, payload: result.results });
        }
    }
}

/* 현재 로그인 된 멤버가 참여한 랠리 가져오기 */
export const getParticipatedRallies = () => {

    const token = window.localStorage.getItem('jwtToken');

    const requestURL = `http://dallibocca.ap-northeast-2.elasticbeanstalk.com/api/v1/members/participate`

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
                "Accept": '*/*',
                "Auth": token
            }
        }).then(res => res.json());

        if (result.httpStatus === 200) {

            dispatch({ type: GET_PARTICIPATE, payload: result.results });
        }
    };
}


/* 현재 로그인 된 멤버 간단정보 가져오기 */
export const callSimpleMemberAPI = (memberId) => {

    const token = window.localStorage.getItem('jwtToken');

    const requestURL = `http://dallibocca.ap-northeast-2.elasticbeanstalk.com/api/v1/members/simple/${memberId}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
                "Accept": '*/*',
                "Auth": token
            }
        }).then(res => res.json());

        if (result.httpStatus === 200) {
            dispatch({ type: GET_MEMBER, payload: result.results?.member });
        }
    };
}

/* 닉네임 중복 확인 */
export const checkNickname = (nickname) => {

    const token = window.localStorage.getItem('jwtToken');

    const requestURL = `http://dallibocca.ap-northeast-2.elasticbeanstalk.com/api/v1/members/duplicate/${nickname}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
                "Accept": '*/*',
                "Auth": token
            }
        })
            .then(res => res.json());

        if (result.httpStatus === 200) {
            dispatch({ type: CHECK_NICKNAME, payload: result.results.result });
        }
    }
}

/* 프로필 수정 */
export const modifyProfile = ({ form }) => {

    const token = window.localStorage.getItem('jwtToken');

    const memberId = JSON.parse(token).memberId;

    const requestURL = `http://dallibocca.ap-northeast-2.elasticbeanstalk.com/api/v1/members/${memberId}?type=edit`

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: 'PUT',
            headers: {
                "Accept": '*/*',
                "Auth": token
            },
            body: form
        })

    }
}

