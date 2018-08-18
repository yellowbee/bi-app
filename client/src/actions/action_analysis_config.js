/**
 * Created by bhuang on 2018/8/17.
 * Actions that set/update analysis configuration, such as quarter range,
 * quarter type, comparing peers.
 */

export const SET_PARAM_ANALYSIS = "SET_PARAM_ANALYSIS";

export const setParamAnalysis = (value) => {
    return {
        type: SET_PARAM_ANALYSIS,
        value: value
    }
};
