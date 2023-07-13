import { handleActions } from "redux-actions";

const initialState = {
    departureState: '',
    arrivalState: '',
    departureModalIsOpen: false,
    arrivalModalIsOpen: false
};

const GET_DEPARTURE = 'address/GET_DEPARTURE';
const GET_ARRIVAL = 'address/GET_ARRIVAL';
const TOGGLE_DEPARTURE = 'modal/TOGGLE_DEPARTURE';
const TOGGLE_ARRIVAL = 'modal/TOGGLE_ARRIVAL';

export const get_departure = (value) => ({
    type: GET_DEPARTURE,
    payload: { result: value }
});

export const get_arrival = (value) => ({
    type: GET_ARRIVAL,
    payload: { result: value }
});

export const toggle_departure = (boolean) => ({
    type: TOGGLE_DEPARTURE,
    payload: { result: boolean }
});

export const toggle_arrival = (boolean) => ({
    type: TOGGLE_ARRIVAL,
    payload: { result: boolean }
});

export const reset_state = () => ({
    type: 'RESET_STATE',
    payload: { ...initialState }
});

const addressReducer = handleActions(
    {
        [GET_DEPARTURE]: (state, {payload: {result} }) => {
            return {
                ...state,
                departureState: result
            };
        },
        [GET_ARRIVAL]: (state, {payload: {result} }) => {
            return {
                ...state,
                arrivalState: result
            };
        },
        [TOGGLE_DEPARTURE]: (state, {payload: {result}}) => {
            return {
                ...state,
                departureModalIsOpen: result
            };
        },
        [TOGGLE_ARRIVAL]: (state, {payload: {result}}) => {
            return {
                ...state,
                arrivalModalIsOpen: result
            };
        },
        'RESET_STATE': (state, payload) => {
            return payload;
        }
    }, initialState
);

export default addressReducer;





