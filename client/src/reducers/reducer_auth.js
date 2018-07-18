/**
 * Created by bhuang on 3/11/18.
 * Sign in and sign up info should not be stored in redux state.
 */

import {
    SET_TOKEN,
    CLEAR_AUTH
} from "../actions/action_auth";

export default (state = {}, action) => {
    switch (action.type) {
        case SET_TOKEN:
            return { ...state, ...(action.value) };
        case CLEAR_AUTH:
            return {};
        default:
            return state;
    }
}
