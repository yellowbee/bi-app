/**
 * Created by bhuang on 12/6/17.
 */

import { userConstants } from '../constants/userConstants';

export function signup(state = {}, action) {
    switch (action.type) {
        case userConstants.REGISTER_REQUEST:
            return { ...state, registering: true };
        case userConstants.REGISTER_SUCCESS:
            return { ...state, registering: false, success: true};
        case userConstants.REGISTER_FAILURE:
            return { ...state, registering: false, success: false};
        default:
            return state
    }
}
