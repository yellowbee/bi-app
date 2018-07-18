import { GET_QUESTION_DETAIL} from "../actions/action_questionDetail";

export default (state = {}, action) => {
    switch (action.type) {
        case GET_QUESTION_DETAIL:
            return action.payload.data;
    }
    return state;
}