import {SET_SHARE_LIST} from "../actions/action_share_list";

export default (state={}, action) => {
  switch (action.type) {
    case SET_SHARE_LIST:
      return action.value;
    default:
      return state;
  }
}