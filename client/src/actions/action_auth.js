/**
 * Created by bhuang on 3/11/18.
 * Sign in and sign up info should not be stored in redux state.
 */

export const SET_TOKEN = "SET_TOKEN";
export const CLEAR_AUTH = "CLEAR_AUTH";

/**
 *  value is like this {
        token: token,
        expires: Date.now() + 7 * 24 * 3600 * 1000,
        user: user
    };
 */
export const setToken = (value) => {
    return {
        type: SET_TOKEN,
        value: value
    }
};

export const clearAuth  = () => {
    return {
        type: CLEAR_AUTH
    }
};
