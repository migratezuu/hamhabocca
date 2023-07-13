import { handleActions } from "redux-actions";

/* 초기 state값 */
const initialState = {
    distanceState: 0,
    peopleState: 0
};

/* 액션타입 */
const DISTANCE_INCREMENT = 'distance/INCREASE';
const DISTANCE_DECREMENT = 'distance/DECREASE';
const PEOPLE_INCREMENT = 'people/INCREASE';
const PEOPLE_DECREMENT = 'people/DECREASE'

/* 액션함수 */
export const distanceIncrease = () => ({ type: DISTANCE_INCREMENT, payload: { amount: 1 } });
export const distanceDecrease = () => ({ type: DISTANCE_DECREMENT, payload: { amount: 1 } });
export const peopleIncrease = () => ({ type: PEOPLE_INCREMENT, payload: { amount: 1 } });
export const peopleDecrease = () => ({ type: PEOPLE_DECREMENT, payload: { amount: 1 } });

/* 리듀서함수 */
const countReducer = handleActions(
    {
        [DISTANCE_INCREMENT]: (state, { payload: { amount } }) => {
            return {
                ...state,
                distanceState: state.distanceState + amount
            };
        },
        [DISTANCE_DECREMENT]: (state, { payload: { amount } }) => {
            return {
                ...state,
                distanceState: state.distanceState - amount
            };
        },
        [PEOPLE_INCREMENT]: (state, { payload: { amount } }) => {
            return {
                ...state,
                peopleState: state.peopleState + amount
            };
        },
        [PEOPLE_DECREMENT]: (state, { payload: { amount } }) => {
            return {
                ...state,
                peopleState: state.peopleState - amount
            };
        }
    },
    initialState
);

export default countReducer;