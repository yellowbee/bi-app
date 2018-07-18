/**
 * Created by bhuang on 12/7/17.
 */
import { userConstants } from '../constants/userConstants';

export function login(state = {}, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {};
        case userConstants.LOGIN_SUCCESS:
            return { ...state, success: true};
        case userConstants.LOGIN_FAILURE:
            return { ...state, success: false};
        case userConstants.LOGOUT_REQUEST:
            return { ...state, success: false};
        default:
            return state
    }
}
