import { createActions, handleActions } from "redux-actions";

const initialState = {
    recruitListState: false,
    participateState: false,
    cancelParticipateState: false,
    cancelRallyState: false,
    cancelRallyOkState: false,
    reportState: false,
    reportReviewState: false,
    profileState: false,
    registerState: false,
    deleteAccountState: false,
    deletePostState: false,
    deleteReviewState: false,
    deleteOkPostState: false,
    nicknameState: false,
    nicknameOkState: false,
    okState: false
};

export const OPEN_RECRUIT_LIST = 'modal/OPEN_RECRUIT_LIST';
export const OPEN_PARTICIPATE = 'modal/OPEN_PARTICIPATE';
export const OPEN_CANCEL_PARTICIPATE = 'modal/OPEN_CANCEL_PARTICIPATE';
export const OPEN_CANCEL_RALLY = 'modal/OPEN_CANCEL_RALLY';
export const OPEN_CANCEL_RALLY_OK = 'modal/OPEN_CANCEL_RALLY_OK';
export const OPEN_OK = 'modal/OPEN_OK';
export const OPEN_REPORT = 'modal/OPEN_REPORT';
export const OPEN_REVIEW_REPORT = 'modal/OPEN_REVIEW_REPORT';
export const OPEN_PROFILE = 'modal/OPEN_PROFILE';
export const OPEN_REGISTER = 'modal/OPEN_REGISTER';
export const OPEN_DELETE_ACCOUNT = 'modal/OPEN_DELETE_ACCOUNT';
export const OPEN_DELETE_OK_ACCOUNT = 'modal/OPEN_DELETE_OK_ACCOUNT';
export const OPEN_DELETE_POST = 'modal/OPEN_DELETE_POST';
export const OPEN_DELETE_REVIEW = 'modal/OPEN_DELETE_REVIEW';
export const OPEN_DELETE_OK_POST = 'modal/OPEN_DELETE_OK_POST';
export const OPEN_NICKNAME = 'modal/OPEN_NICKNAME';
export const OPEN_NICKNAME_OK = 'modal/OPEN_NICKNAME_OK';
export const CLOSE_MODAL = 'modal/CLOSE_MODAL';

export const closeModal = () => ({
    type: CLOSE_MODAL,
    payload: { ...initialState }
});

const modalsReducer = handleActions({
    [OPEN_RECRUIT_LIST]: (state, payload) => {
        return {
            ...state,
            recruitListState: true
        };
    },
    [OPEN_PARTICIPATE]: (state, payload) => {
        return {
            ...state,
            participateState: true
        };
    },
    [OPEN_CANCEL_PARTICIPATE]: (state, payload) => {
        return {
            ...state,
            cancelParticipateState: true
        };
    },
    [OPEN_CANCEL_RALLY]: (state, payload) => {
        return {
            ...state,
            cancelRallyState: true
        };
    },
    [OPEN_CANCEL_RALLY_OK]: (state, payload) => {
        return {
            ...state,
            cancelRallyOkState: true
        };
    },
    [OPEN_OK]: (state, payload) => {
        return {
            ...state,
            okState: true
        };
    },
    [OPEN_REPORT]: (state, payload) => {
        return {
            ...state,
            reportState: true
        };
    },
    [OPEN_REVIEW_REPORT]: (state, payload) => {
        return {
            ...state,
            reportReviewState: true
        };
    },
    [OPEN_PROFILE]: (state, payload) => {
        return {
            ...state,
            profileState: true
        };
    },
    [OPEN_REGISTER]: (state, payload) => {
        return {
            ...state,
            registerState: true
        };
    },
    [OPEN_DELETE_ACCOUNT]: (state, payload) => {
        return {
            ...state,
            deleteAccountState: true
        };
    },
    [OPEN_DELETE_OK_ACCOUNT]: (state, payload) => {
        return {
            ...state,
            deleteOkAccountState: true
        };
    },
    [OPEN_DELETE_POST]: (state, payload) => {
        return {
            ...state,
            deletePostState: true
        };
    },
    [OPEN_DELETE_REVIEW]: (state, payload) => {
        return {
            ...state,
            deleteReviewState: true
        };
    },
    [OPEN_DELETE_OK_POST]: (state, payload) => {
        return {
            ...state,
            deleteOkPostState: true
        };
    },
    [OPEN_NICKNAME]: (state, payload) => {
        return {
            ...state,
            nicknameState: true
        };
    },
    [OPEN_NICKNAME_OK]: (state, payload) => {
        return {
            ...state,
            nicknameOkState: true
        };
    },
    [CLOSE_MODAL]: () => {
        return {
            ...initialState
        };
    }
}, initialState);

export default modalsReducer;