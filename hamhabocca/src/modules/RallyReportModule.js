import { createActions, handleActions } from 'redux-actions';

// 초기값
const initialState = [
];

// 액선
export const POST_RALLYREPORT = 'rallyreport/POST_RALLYREPORT';

const actions = createActions({
    [POST_RALLYREPORT]: () => { }
});

// 리듀서
const rallyReportReducer = handleActions(
    {
        [POST_RALLYREPORT]: (state, { payload }) => { return payload; },
    }, initialState
);

export default rallyReportReducer;