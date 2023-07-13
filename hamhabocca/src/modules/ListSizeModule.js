import { handleActions } from "redux-actions";

/* 초기 state값 */
const initialState = {
    recruitedSizeState: 5,
    participatedSizeState: 5
};

/* 액션타입 */
const RECRUITED_SIZE = 'listSize/RECRUITED_SIZE';
const PARTICIPATED_SIZE = 'listSize/PARTICIPATED_SIZE';

/* 액션함수 */
export const recruitedSize = () => ({ type: RECRUITED_SIZE, payload: { amount: 5 } });
export const participatedSize = () => ({ type: PARTICIPATED_SIZE, payload: { amount: 5 } });

/* 리듀서함수 */
const listSizeReducer = handleActions(
    {
        [RECRUITED_SIZE]: (state, { payload: { amount } }) => {
            return {
                ...state,
                recruitedSizeState: state.recruitedSizeState + amount
            };
        },
        [PARTICIPATED_SIZE]: (state, { payload: { amount } }) => {
            return {
                ...state,
                participatedSizeState: state.participatedSizeState + amount
            };
        },
    },
    initialState
);

export default listSizeReducer;