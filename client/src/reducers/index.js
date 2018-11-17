import { combineReducers } from 'redux';
import auth from './reducer_auth';
import mainShares from './reducer_main_shares';
import { setParamAnalysis } from './reducer_analysis_config';
import setShareList from "./reducer_share_list";

/**
 * The root reducer is the mapping between application state object
 * and all the reducers.
 * @type {Reducer<any>}
 */
const rootReducer = combineReducers({
    auth: auth,
    mainShares: mainShares,
    shareList: setShareList,
    paramAnalysis: setParamAnalysis,
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

