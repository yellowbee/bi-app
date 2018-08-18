import { combineReducers } from 'redux';
import auth from './reducer_auth';
import mainShares from './reducer_main_shares';
import { setParamAnalysis } from './reducer_analysis_config';

/**
 * The root reducer is the mapping between application state object
 * and the all the reducers.
 * @type {Reducer<any>}
 */
const rootReducer = combineReducers({
    auth: auth,
    mainShares: mainShares,
    paramAnalysis: setParamAnalysis
    /*analysisConfig: {
        paramAnalysis: paramAnalysis // {
                                           startQtr: "1990-3",
                                           endQtr: "2000-3",
                                           type: "all",
                                           peers: ["0001", '0002"]
                                        }
    }*/
});

export default rootReducer;

