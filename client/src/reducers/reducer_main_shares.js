/**
 * Created by bhuang on 8/11/18.
 * Sign in and sign up info should not be stored in redux state.
 */

import {
    SET_MAIN_SHARES
} from "../actions/action_main_shares";

export default (state = [], action) => {
    switch (action.type) {
        case SET_MAIN_SHARES:
            return action.value;
        default:
            return state;
    }
}
