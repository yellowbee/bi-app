/**
 * Created by bhuang on 2018/8/12.
 * Sign in and sign up info should not be stored in redux state.
 */

export const SET_MAIN_SHARES = "SET_MAIN_SHARES";

export const setMainShares = (value) => {
    return {
        type: SET_MAIN_SHARES,
        value: value
    }
};
