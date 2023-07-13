import { LOADING } from "../modules/LoadingModule";
import { GET_RALLYLIST, GET_RALLY } from "../modules/RallyModule";

// 전체 목록 조회 (페이징)
export const callRallyListAPI = ({ currentPage }) => {

    let URL = "";

    if (currentPage !== undefined || currentPage !== null) {
        URL = `http://dallibocca.ap-northeast-2.elasticbeanstalk.com/api/v1/rallies?page=${currentPage}`;
    } else {
        URL = 'http://dallibocca.ap-northeast-2.elasticbeanstalk.com/api/v1/rallies?page=1';
    }

    return async (dispatch, getState) => {

        const result = await fetch(URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            }
        })
            .then(response => response.json());

        if (result.httpStatus === 200) {
            dispatch({ type: GET_RALLYLIST, payload: result.results });
        }
    };
}

// 선택 조회
export const callRallyDetailAPI = ({ rallyId }) => {

    const URL = `http://dallibocca.ap-northeast-2.elasticbeanstalk.com/api/v1/rallies/${rallyId}`;

    return async (dispatch, getState) => {

        dispatch({ type: LOADING, payload: true});

        const result = await fetch(URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Auth": window.localStorage.getItem("jwtToken")
            }
        })
            .then(response => response.json());

        if (result.httpStatus === 200) {

            const URL = `http://dallibocca.ap-northeast-2.elasticbeanstalk.com/api/v1/members/simple/${result.results.rally.masterId}`;
            const master = await fetch(URL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    "Auth": window.localStorage.getItem("jwtToken")
                }
            })
                .then(res => res.json());

            const rallyInfo = { ...result.results?.rally, master: master.results?.member };
            dispatch({ type: GET_RALLY, payload: rallyInfo });
            
            setTimeout(function () {
                dispatch({ type: LOADING, payload: false});
            }, 300);
        }
    };
}

// 랠리 등록
export const callPostRallyAPI = ({ form }) => {

    const URL = 'http://dallibocca.ap-northeast-2.elasticbeanstalk.com/api/v1/rallies';

    return async (dispatch, getState) => {

        const result = await fetch(URL, {
            method: "POST",
            headers: {
                "Accept": "*/*",
                "Auth": window.localStorage.getItem("jwtToken")
            },
            body: form
        })
            .then(response => response.json());

        if (result.status === 500) {
            alert('랠리 모집은 3개까지만 가능합니다\n기존 랠리를 완주 후 모집해주세요');
        }
    };
}

// 랠리 수정
export const callModifyRallyAPI = ({ form, rallyId }) => {

    const URL = `http://dallibocca.ap-northeast-2.elasticbeanstalk.com/api/v1/rallies/${rallyId}`;

    console.log("URL", URL);

    return async (dispatch, getState) => {

        const result = await fetch(URL, {
            method: "PUT",
            headers: {
                "Accept": "*/*",
                "Auth": window.localStorage.getItem("jwtToken")
            },
            body: form
        })
            .then(response => response.json());
    };
}

// 랠리 검색
export const callSearchRallyAPI = ({ criteria }) => {

    const URL = `http://dallibocca.ap-northeast-2.elasticbeanstalk.com/api/v1/rallies/search?${criteria}`;

    return async (dispatch, getState) => {

        const result = await fetch(URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Auth": window.localStorage.getItem("jwtToken")
            }
        })
            .then(response => response.json());

        if((result.results.rallyList).length === 0 ) {
            alert('조건에 맞는 랠리를 찾을 수 없습니다.\n다른 조건으로 검색해 주세요!');
        }

        dispatch({ type: GET_RALLYLIST, payload: result.results })
    }
}