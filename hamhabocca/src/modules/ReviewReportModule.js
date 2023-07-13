import { handleActions } from 'redux-actions';

// 초기값
const initialState = [
];

// 액선
export const POST_REVIEWREPORT = 'reviewreport/POST_REVIEWREPORT';

// 리듀서
const reviewReportReducer = handleActions(
    {
        [POST_REVIEWREPORT]: (state, { payload }) => { return payload; },
    }, initialState
);

export default reviewReportReducer;