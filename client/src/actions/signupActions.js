/**
 * Created by bhuang on 12/7/17.
 */
import { userConstants } from '../constants/userConstants';

export const signupActions = {
    request : (user) => ({
        type: userConstants.REGISTER_REQUEST, user
    }),
    success : (user) => ({
        type: userConstants.REGISTER_SUCCESS, user
    }),
    failure : (error) => ({
        type: userConstants.REGISTER_FAILURE, error
    })
}
