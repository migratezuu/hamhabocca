import { GET_QNALIST, GET_QNA, POST_QNA, PUT_QNA } from "../modules/QnaModule";

/// 전체 조회
export const callQnaListAPI = ({ currentPage }) => {

    let URL;
    const token = window.localStorage.getItem('jwtToken');

    if (currentPage !== undefined || currentPage !== null) {
        URL = `http://dallibocca.ap-northeast-2.elasticbeanstalk.com/api/v1/qnas?page=${currentPage}`;
    } else {
        URL = 'localhost:800/api/v1/qnas';
    }

    return async (dispatch, getState) => {
        const result = await fetch(URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Auth": token
            }
        }).then(response => response.json());

        if (result.httpStatus === 200) {

            const qnaList = result.results.qnaList.content;
            const paging = result.results.paging;

            if (qnaList.length > 0) {
                const memberIdList = qnaList.map((qna) => qna.memberId);

                // member 데이터와 qna 데이터를 가져오는 API endpoint를 호출
                const memberResult = await fetch(
                    `http://dallibocca.ap-northeast-2.elasticbeanstalk.com/api/v1/members?${memberIdList
                        .map((id) => `id=${id}`)
                        .join("&")}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "*/*",
                            Auth: token
                        },
                    }
                ).then((response) => response.json());

                if (memberResult.httpStatus === 200) {
                    // member 엔티티 정보와 함께 qna 엔티티 정보를 dispatch
                    const memberMap = new Map(
                        memberResult.results.members.content.map((member) => [
                            member.memberId,
                            member,
                        ])
                    );
                    const qnaDataList = qnaList.map((qna) => ({
                        ...qna,
                        member: memberMap.get(qna.memberId)
                    }));

                    dispatch({ type: GET_QNALIST, payload: { qnaDataList, paging } });
                }
            }
        }
    }
};


// 선택 조회 
export const callQnaDetailAPI = ({ qnaId }) => {

    const URL = `http://dallibocca.ap-northeast-2.elasticbeanstalk.com/api/v1/qnas/${qnaId}`;

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

            dispatch({ type: GET_QNA, payload: result.results.qnas })
            const memberId = result.results.qnas.memberId;

            const [qnaResult, memberResult] = await Promise.all([
                fetch(`http://dallibocca.ap-northeast-2.elasticbeanstalk.com/api/v1/qnas/${qnaId}`, {
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

            if (qnaResult.httpStatus === 200 && memberResult.httpStatus === 200) {

                const qnaData = { ...result.results.qnas, qna: qnaResult.results.qna, member: memberResult.results.member };

                dispatch({ type: GET_QNA, payload: qnaData });
            }
        }
    }
}

// 등록
export const callPostQnaAPI = ({ form }) => {

    const URL = 'http://dallibocca.ap-northeast-2.elasticbeanstalk.com/api/v1/qnas';

    const token = window.localStorage.getItem('jwtToken');

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

        dispatch({ type: POST_QNA, payload: result });
    };
}

// 수정
export const callModifyRallyAPI = ({ form, qnaId }) => {

    const URL = `http://dallibocca.ap-northeast-2.elasticbeanstalk.com/api/v1/qnas/${qnaId}`;

    const token = window.localStorage.getItem('jwtToken');

    return async (dispatch, getState) => {

        const result = await fetch(URL, {
            method: "PUT",
            headers: {
                "Accept": "*/*",
                "Auth": token
            },
            body: form
        })
            .then(response => response.json());

        dispatch({ type: PUT_QNA, payload: result });
    };
}

// 검색
export const callSearchQnaAPI = ({ criteria }) => {

    const URL = `http://dallibocca.ap-northeast-2.elasticbeanstalk.com/api/v1/qnas/search?${criteria}`;

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
            .catch(error => console.error("에러발생"));

        if (result.httpStatus === 200) {

            const qnaList = result.results.qnaList;
            const paging = result.results.paging;

            if (qnaList.length > 0) {
                const memberIdList = qnaList.map((qna) => qna.memberId);

                // member 데이터와 qna 데이터를 가져오는 API endpoint를 호출
                const memberResult = await fetch(
                    `http://dallibocca.ap-northeast-2.elasticbeanstalk.com/api/v1/members?${memberIdList
                        .map((id) => `id=${id}`)
                        .join("&")}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "*/*",
                            Auth: token
                        },
                    }
                ).then((response) => response.json());

                if (memberResult.httpStatus === 200) {
                    // member 엔티티 정보와 함께 qna 엔티티 정보를 dispatch
                    const memberMap = new Map(
                        memberResult.results.members.content.map((member) => [
                            member.memberId,
                            member,
                        ])
                    );
                    const qnaDataList = qnaList.map((qna) => ({
                        ...qna,
                        member: memberMap.get(qna.memberId)
                    }));

                    dispatch({ type: GET_QNALIST, payload: { qnaDataList, paging } });
                }
            }
        }
    }
}

// 삭제
export const callQnaDeleteAPI = ({ qnaId }) => {

    const URL = `http://dallibocca.ap-northeast-2.elasticbeanstalk.com/api/v1/qnas/${qnaId}`;

    const token = window.localStorage.getItem('jwtToken');

    return async () => {

        const result = await fetch(URL, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Auth": token
            }
        })

        if (result.status === 204) {
            window.location.replace('/qna');
        }
    }
}
