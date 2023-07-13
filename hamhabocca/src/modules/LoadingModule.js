import { handleActions } from 'redux-actions';

const initialState = true;

export const LOADING = 'loading';

const loadingReducer = handleActions(
    {
        [LOADING]: (state, { payload }) => {
            return payload;
        }
    }, initialState
);

export default loadingReducer;