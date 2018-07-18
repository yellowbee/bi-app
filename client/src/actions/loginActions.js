/**
 * Created by bhuang on 12/7/17.
 */
import { userConstants } from '../constants/userConstants';

export const loginActions = {
    request : (user) => ({
        type: userConstants.LOGIN_REQUEST, user
    }),
    success : (user) => ({
        type: userConstants.LOGIN_SUCCESS, user
    }),
    failure : (error) => ({
        type: userConstants.LOGIN_FAILURE, error
    }),
    requestLogout: () => ({
        type: userConstants.LOGOUT_REQUEST
    })
}
