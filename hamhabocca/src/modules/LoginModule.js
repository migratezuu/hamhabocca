import { createActions, handleActions } from 'redux-actions';

const initialState = false;

export const IS_SIGNUP = 'IS_SIGNUP';

const actions = createActions({
    [IS_SIGNUP]: () => { }
});

const loginReducer = handleActions({
    [IS_SIGNUP]: () => { 
        return !initialState; 
    }}, initialState
);

export default loginReducer;