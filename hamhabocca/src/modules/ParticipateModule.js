import { createActions, handleActions } from 'redux-actions';

const initialState = [];

export const GET_PARTICIPATE = 'participate/GET_PARTICIPATE';       //신청현황
export const POST_PARTICIPATE = 'participate/POST_PARTICIPATE';     //랠리신청
export const CANCEL_PARTICIPATE = 'participate/CANCEL_PARTICIPATE'; //신청취소
export const PUT_PARTICIPATE = 'participate/PUT_PARTICIPATE';       //신청승인
export const GET_APPROVAL = 'participate/GET_APPROVAL';

const actions = createActions({
    [GET_PARTICIPATE]: () => { },
    [POST_PARTICIPATE]: () => { },
    [CANCEL_PARTICIPATE]: () => { },
    [PUT_PARTICIPATE]: () => { },
    [GET_APPROVAL]: () => { }
});

const participateReducer = handleActions(
    {
        [GET_PARTICIPATE]: (state, { payload }) => { return payload; },
        [POST_PARTICIPATE]: (state, { payload }) => { return payload; },
        [CANCEL_PARTICIPATE]: (state, { payload }) => { return payload; },
        [PUT_PARTICIPATE]: (state, { payload }) => { return payload; },
        [GET_APPROVAL]: (state, { payload }) => { return payload; },
    }, initialState
);

export default participateReducer;