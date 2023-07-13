import { createActions, handleActions } from 'redux-actions';

// 초기값
const initialState = [];

// 액선
export const GET_RALLY = 'rally/GET_RALLY';
export const GET_RALLYLIST = 'rally/GET_RALLYLIST';
export const POST_RALLY = 'rally/POST_RALLY';
export const PUT_RALLY = 'rally/PUT_RALLY';

const actions = createActions({
    [GET_RALLY]: () => { },
    [GET_RALLYLIST]: () => { },
    [POST_RALLY]: () => { },
    [PUT_RALLY]: () => { }
});

// 리듀서
const rallyReducer = handleActions(
    {
        [GET_RALLY]: (state, { payload }) => { return payload; },
        [GET_RALLYLIST]: (state, { payload }) => { return payload; },
        [POST_RALLY]: (state, { payload }) => { return payload; },
        [PUT_RALLY]: (state, { payload }) => { return payload; }
    }, initialState
);

export default rallyReducer;