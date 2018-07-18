/**
 * Return the dummy array no matter what
 */
import _ from 'lodash';
import { GET_QUESTIONS } from '../actions/action_question';

export default (state = {}, action) => {
    switch (action.type) {
        case GET_QUESTIONS:
            console.log(action.payload.data);
            return _.mapKeys(action.payload.data, '_id');
        default:
            return state;
    }
}