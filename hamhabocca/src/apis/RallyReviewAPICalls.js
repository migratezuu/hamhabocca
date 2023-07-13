import { LOADING } from "../modules/LoadingModule";
import { GET_REVIEW, GET_REVIEWLIST } from "../modules/ReviewModule";

export const callReviewRallyAPI = ({ reviewId }) => {

    const URL = `http://dallibocca.ap-northeast-2.elasticbeanstalk.com/api/v1/reviews/${reviewId}`;

    const token = window.localStorage.getItem('jwtToken');

    return async (dispatch, getState) => {

        dispatch({ type: LOADING, payload: true});

        const result = await fetch(URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Auth": token
            }
        })
            .then(response => response.json());

        if (result.httpStatus === 200) {
            const rallyId = result.results.reviews.rallyId; // review 엔티티의 rallyId를 가져옴
            const memberId = result.results.reviews.memberId; // review 엔티티의 memberId를 가져옴

            const [rallyResult, memberResult] = await Promise.all([
                fetch(`http://dallibocca.ap-northeast-2.elasticbeanstalk.com/api/v1/rallies/${rallyId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "*/*",
                        "Auth": token
                    }
                }).then(response => response.json()),

                fetch(`http://dallibocca.ap-northeast-2.elasticbeanstalk.com/api/v1/members/${memberId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "*/*",
                        "Auth": token
                    }
                }).then(response => response.json())
            ]);

            if (rallyResult.httpStatus === 200 && memberResult.httpStatus === 200) {

                // rally 엔티티 정보와 함께 review 엔티티 정보와 member 엔티티 정보를 dispatch
                const reviewData = { ...result.results.reviews, rally: rallyResult.results.rally, member: memberResult.results.member };
                dispatch({ type: GET_REVIEW, payload: reviewData });

                setTimeout(function () {
                    dispatch({ type: LOADING, payload: false });
                }, 300);
            }
        }
    };
}

// 랠리 + 리뷰 보드 리스트
export const callReviewRallyListAPI = () => {
    const URL = `http://dallibocca.ap-northeast-2.elasticbeanstalk.com/api/v1/reviews`;
    const token = window.localStorage.getItem("jwtToken");

    return async (dispatch, getState) => {
        const result = await fetch(URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "*/*",
                Auth: token,
            },
        }).then((response) => response.json());

        if (result.httpStatus === 200) {
            const reviewList = result.results.reviews;

            if (reviewList.length > 0) {
                const memberIdList = reviewList.map((review) => review.memberId);
                const rallyIdList = reviewList.map((review) => review.rallyId);

                // member 데이터와 rally 데이터를 가져오는 API endpoint를 호출
                const memberResult = await fetch(
                    `http://dallibocca.ap-northeast-2.elasticbeanstalk.com/api/v1/members?${memberIdList
                        .map((id) => `id=${id}`)
                        .join("&")}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "*/*",
                            Auth: token,
                        },
                    }
                ).then((response) => response.json());

                const rallyResult = await fetch(
                    `http://dallibocca.ap-northeast-2.elasticbeanstalk.com/api/v1/rallies?${rallyIdList
                        .map((id) => `id=${id}`)
                        .join("&")}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "*/*",
                            Auth: token,
                        },
                    }
                ).then((response) => response.json());

                if (memberResult.httpStatus === 200 && rallyResult.httpStatus === 200) {
                    // member 엔티티 정보와 함께 review 엔티티 정보를 dispatch
                    const memberMap = new Map(
                        memberResult.results.members.content.map((member) => [
                            member.memberId,
                            member,
                        ])
                    );
                    const rallyMap = new Map(
                        rallyResult.results.rallyList.content.map((rally) => [
                            rally.rallyId,
                            rally,
                        ])
                    );
                    const reviewDataList = reviewList.map((review) => ({
                        ...review,
                        member: memberMap.get(review.memberId),
                        rally: rallyMap.get(review.rallyId),
                    }));

                    dispatch({ type: GET_REVIEWLIST, payload: reviewDataList });
                }
            }
        }
    };
};


//리뷰 검색
export const callSearchReviewAPI = ({ criteria }) => {
    const URL = `http://dallibocca.ap-northeast-2.elasticbeanstalk.com/api/v1/reviews/search?${criteria}`;
    const token = window.localStorage.getItem("jwtToken");

    return async (dispatch, getState) => {
        const result = await fetch(URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "*/*",
                Auth: token,
            },
        }).then((response) => response.json());

        if (result.httpStatus === 200) {
            const reviewList = result.results.reviews;

            if (reviewList.length > 0) {
                const memberIdList = reviewList.map((review) => review.memberId);
                const rallyIdList = reviewList.map((review) => review.rallyId);

                // member 데이터와 rally 데이터를 가져오는 API endpoint를 호출
                const memberResult = await fetch(
                    `http://dallibocca.ap-northeast-2.elasticbeanstalk.com/api/v1/members?${memberIdList
                        .map((id) => `id=${id}`)
                        .join("&")}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "*/*",
                            Auth: token,
                        },
                    }
                ).then((response) => response.json());

                const rallyResult = await fetch(
                    `http://dallibocca.ap-northeast-2.elasticbeanstalk.com/api/v1/rallies?${rallyIdList
                        .map((id) => `id=${id}`)
                        .join("&")}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "*/*",
                            Auth: token,
                        },
                    }
                ).then((response) => response.json());

                if (memberResult.httpStatus === 200 && rallyResult.httpStatus === 200) {
                    // member 엔티티 정보와 함께 review 엔티티 정보를 dispatch
                    const memberMap = new Map(
                        memberResult.results.members.content.map((member) => [
                            member.memberId,
                            member,
                        ])
                    );
                    const rallyMap = new Map(
                        rallyResult.results.rallyList.content.map((rally) => [
                            rally.rallyId,
                            rally,
                        ])
                    );
                    const reviewDataList = reviewList.map((review) => ({
                        ...review,
                        member: memberMap.get(review.memberId),
                        rally: rallyMap.get(review.rallyId),
                    }));
                    if ((reviewDataList).length === 0) {
                        alert('조건에 맞는 리뷰를 찾을 수 없습니다. \n 다른 조건으로 검색해주세요');
                    }
                    dispatch({ type: GET_REVIEWLIST, payload: reviewDataList });
                }
            }
        }
    };
};