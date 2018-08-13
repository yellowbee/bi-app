import { combineReducers } from 'redux';
import projectCards from './reducer_projectcards';
import questionCards from './reducer_questioncards';
import questionDetail from './reducer_questiondetail';
import formQuestion from './reducer_question_form';
import formProject from './reducer_project_form';
import auth from './reducer_auth';
import mainShares from './reducer_main_shares';

/**
 * The root reducer is the mapping between application state object
 * and the all the reducers.
 * @type {Reducer<any>}
 */
const rootReducer = combineReducers({
    auth: auth,
    mainShares: mainShares
});

export default rootReducer;

