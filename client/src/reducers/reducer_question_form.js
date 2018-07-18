/**
 * Created by bhuang on 2/24/18.
 */

import uuidv1 from "uuid/v1";
import _ from "lodash";
import {
  SET_RADIO_BUTTON,
  SET_CATEGORIES,
  SET_QUESTION_NAME,
  ADD_TEXT_BLOCK,
  DELETE_TEXT_BLOCK,
  SET_TEXT_BLOCK_TEXT,
  ADD_IMAGE,
  DELETE_IMAGE,
  ADD_TAG,
  DELETE_TAG,
  POST_QUESTION
} from "../actions/action_question_form";

export default (state = {}, action) => {
  switch (action.type) {
    case SET_RADIO_BUTTON:
      let newBut = {};
      let innerObj = {};
      innerObj["value"] = action.value;
      innerObj[action.id] = true;
      newBut[action.name] = innerObj;
      return { ...state, ...newBut };
    case SET_CATEGORIES:
      let newCat = {};
      newCat[action.name] = action.value;
      return { ...state, ...newCat };
    case SET_QUESTION_NAME:
      let newQuestionName = {};
      newQuestionName[action.name] = action.value;
      return { ...state, ...newQuestionName };
    case ADD_TEXT_BLOCK:
      let tempObj = {};
      let newBlock = { id: uuidv1(), type: action.blockType };
      if (state[action.name]) {
        tempObj[action.name] = [...state[action.name], newBlock];
      } else {
        tempObj[action.name] = [newBlock];
      }
      return { ...state, ...tempObj };
    case DELETE_TEXT_BLOCK:
      console.log("deleting a block: " + action.id);
      let newBlocks = state[action.name].filter(
        block => block.id !== action.id
      );
      let tempObj01 = {};
      tempObj01[action.name] = newBlocks;
      return { ...state, ...tempObj01 };
    case SET_TEXT_BLOCK_TEXT:
      console.log("setting block text: " + action.name + "," + action.id);
      let newBlocks02 = state[action.name].map(block => {
        if (block.id === action.id) {
          return { ...block, value: action.value };
        } else {
          return block;
        }
      });
      let tempObj02 = {};
      tempObj02[action.name] = newBlocks02;
      return { ...state, ...tempObj02 };
    case ADD_IMAGE:
      let tempObj04 = {};
      let editObj = {
        id: action.uploadResult[0].public_id,
        type: action.itemType,
        imgUrl: action.uploadResult[0].secure_url
      };
      if (state[action.name]) {
        tempObj04[action.name] = [...state[action.name], editObj];
      } else {
        tempObj04[action.name] = [editObj];
      }
      return { ...state, ...tempObj04 };
    case DELETE_IMAGE:
        console.log('deleting image');
          let newArray = state[action.name].filter(
            item => item.id !== action.id
          );
          let tempObj05 = {};
          tempObj05[action.name] = newArray;
          return { ...state, ...tempObj05 };
    case ADD_TAG:
      if (_.isEmpty(action.value)) {
        return state;
      }
      let tagValue = action.value.trim();
      let tagsField = {};
      if (!state[action.name]) {
        tagsField[action.name] = [tagValue];
        return { ...state, ...tagsField };
      } else {
        if (!state[action.name].includes(tagValue)) {
          tagsField[action.name] = [...state[action.name], tagValue];
          return { ...state, ...tagsField };
        }
      }
    case DELETE_TAG:
      console.log("deleting a tag" + action.name + "," + action.key);
      let newTags = state[action.name].filter((tag, key) => key !== action.key);
      let tagsField01 = {};
      tagsField01[action.name] = newTags;
      return { ...state, ...tagsField01 };
    case POST_QUESTION:
      console.log("payload: " + action.payload);
      //action.callback(action.payload.data);
      return {};
    default:
      return state;
  }
};
