import { GET_REVIEW, GET_REVIEWLIST, PUT_REVIEW, POST_REVIEW, DELETE_REVIEW } from '../modules/ReviewModule';
import { useSelector } from 'react-redux';

// 전체 리뷰 리스트 조회
export const callReviewListAPI = ({ currentPage }) => {

    const token = window.localStorage.getItem('jwtToken');

    let URL;

    if (currentPage !== undefined || currentPage !== null) {
        URL = `http://dallibocca.ap-northeast-2.elasticbeanstalk.com/api/v1/reviews?page=${currentPage}`;
    } else {
        URL = 'http://dallibocca.ap-northeast-2.elasticbeanstalk.com/api/v1/reviews';
    }

    return async (dispatch, getState) => {

        const result = await fetch(URL, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Accept": "*/*",
                "Auth": token
            }
        })
            .then(response => response.json());

        if (result.httpStatus === 200) {
            dispatch({ type: GET_REVIEWLIST, payload: result.results });
        }
    };
}

/* 상세 조회 */
export const callReviewDetailAPI = ({ reviewId }) => {

    const URL = `http://dallibocca.ap-northeast-2.elasticbeanstalk.com/api/v1/reviews/${reviewId}`;

    const token = window.localStorage.getItem('jwtToken');

    return async (dispatch, getState) => {

        const result = await fetch(URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Auth": token
            }
        })
            .then(response => response.json())

        if (result.httpStatus === 200) {
            dispatch({ type: GET_REVIEW, payload: result.results.reviews });
        }
        else {
            console.log("데이터 안돼");
        }
    };
}

/* 데이터 수정 */
export const callReviewUpdateAPI = ({ form, reviewId }) => {

    const URL = `http://dallibocca.ap-northeast-2.elasticbeanstalk.com/api/v1/reviews/${reviewId}`;

    const token = window.localStorage.getItem('jwtToken');

    return async (dispatch, getState) => {

        const result = await fetch(URL, {
            method: "PUT",
            headers: {
                // "Content-Type": 'application/json',
                "Accept": '*/*',
                "Auth": token
            },
            body: form
        })

        if (result.status === 201) {
            dispatch({ type: PUT_REVIEW, payload: result });
        }
    }
}


/* 리뷰 등록 */
export const callPostReviewAPI = ({ form }) => {
    
    const token = window.localStorage.getItem('jwtToken');

    const URL = 'http://dallibocca.ap-northeast-2.elasticbeanstalk.com/api/v1/reviews';

    return async (dispatch, getState) => {

        const result = await fetch(URL, {
            method: "POST",
            headers: {
                "Accept": "*/*",
                "Auth": token
            },
            body: form
        })
        .then(response => response.json());

        dispatch({ type: POST_REVIEW, payload: result });
    };
}


// 삭제
export const callReviewDeleteAPI = ({ reviewId }) => {

    const URL = `http://dallibocca.ap-northeast-2.elasticbeanstalk.com/api/v1/reviews/${reviewId}`;

    const token = window.localStorage.getItem('jwtToken');

    return async (dispatch, getState) => {

        const result = await fetch(URL, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Auth": token
            }
        })

        if (result.status === 204) {
            
            window.location.replace('/review');
        }
    };
}