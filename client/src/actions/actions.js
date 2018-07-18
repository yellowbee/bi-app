/**
 * Created by bhuang on 11/26/17.
 * Keeps all the action creators.
 */

import C from '../constants/constants';

export const setSignupVisibility = (signupDisplay) =>
    ({
        type: C.SET_SIGNUP_VISIBILITY,
        signupDisplay
    })

export const setLoginVisibility = (loginDisplay) =>
    ({
        type: C.SET_LOGIN_VISIBILITY,
        loginDisplay
    })
