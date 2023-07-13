import { createActions, handleActions } from 'redux-actions';

// 초기값
const initialState = [
];

// 액선
export const GET_QNA = 'qna/GET_QNA';
export const GET_QNALIST = 'qna/GET_QNALIST';
export const POST_QNA = 'qna/POST_QNA';
export const PUT_QNA = 'qna/PUT_QNA';
export const DELETE_QNA = 'qna/DELETE_QNA';

const actions = createActions({
    [GET_QNA]: () => { },
    [GET_QNALIST]: () => { },
    [POST_QNA]: () => { },
    [PUT_QNA]: () => { },
    [DELETE_QNA]: () => { }
});

// 리듀서
const qnaReducer = handleActions(
    {
        [GET_QNA]: (state, { payload }) => { return payload; },
        [GET_QNALIST]: (state, { payload }) => { return payload; },
        [POST_QNA]: (state, { payload }) => { return payload; },
        [PUT_QNA]: (state, { payload }) => { return payload; },
        [DELETE_QNA]: (state, { payload}) => { return payload; }
    }, initialState
);

export default qnaReducer;