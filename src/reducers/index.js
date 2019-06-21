import * as types from '../actions/ActionTypes';

function loginReducer(state = {
    isLoginPending: false,
    isLoginSuccess: false,
    isLoginError: null,
}, action) {
    switch(action.type) {
        case types.LOGIN_PENDING:
            return {
                ...state,
                isLoginPending: action.isLoginPending
            };
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                isLoginSuccess: action.isLoginSuccess
            };
        case types.LOGIN_FAILURE:
            return {
                ...state,
                isLoginError: action.isLoginError
            };
        default:
            return state;
    }
}

export default loginReducer;