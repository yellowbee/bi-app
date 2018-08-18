/**
 * Created by bhuang on 2018/8/17.
 * Reducer functions for analysis configuration.
 */

import {
    SET_PARAM_ANALYSIS
} from "../actions/action_analysis_config";

export const setParamAnalysis = (state = {}, action) => {
    switch (action.type) {
        case SET_PARAM_ANALYSIS:
            console.log("state object in setParamAnalysis attr of reducer: ");
            console.log(state);
            return action.value;
        default:
            return state;
    }
}
