/**
 * Created by bhuang on 12/3/17.
 */

import { loginAlertConstants } from '../constants/loginAlertConstants';

export const loginAlertActions = {
    success,
    error,
    clear
};

function success(message) {
    return { type: loginAlertConstants.SUCCESS, message };
}

function error(message) {
    return { type: loginAlertConstants.ERROR, message };
}

function clear() {
    return { type: loginAlertConstants.CLEAR };
}
