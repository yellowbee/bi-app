/**
 * reducer function for actions relating to posting a project(showcase)
 * Created by bhuang on 5/10/18.
 */
import uuidv1 from "uuid/v1";
import _ from "lodash";
import {
    SET_PROJECT_CATEGORIES,
    SET_PROJECT_NAME,
    ADD_PROJECT_IMAGE,
    DELETE_PROJECT_IMAGE,
    ADD_PROJECT_TEXT_BLOCK,
    DELETE_PROJECT_TEXT_BLOCK,
    SET_PROJECT_TEXT_BLOCK_TEXT,
    POST_PROJECT
} from "../actions/action_project_form";

export default (state = {}, action) => {
    switch (action.type) {
        case SET_PROJECT_CATEGORIES:
            let newCat = {};
            newCat[action.name] = action.value;
            return { ...state, ...newCat };
        case SET_PROJECT_NAME:
            let newProjectName = {};
            newProjectName[action.name] = action.value;
            return { ...state, ...newProjectName };
        case ADD_PROJECT_TEXT_BLOCK:
            let tempObj = {};
            let newBlock = { id: uuidv1(), type: action.blockType };
            if (state[action.name]) {
                tempObj[action.name] = [...state[action.name], newBlock];
            } else {
                tempObj[action.name] = [newBlock];
            }
            return { ...state, ...tempObj };
        case DELETE_PROJECT_TEXT_BLOCK:
            let newBlocks = state[action.name].filter(
                block => block.id !== action.id
            );
            let tempObj01 = {};
            tempObj01[action.name] = newBlocks;
            return { ...state, ...tempObj01 };
        case SET_PROJECT_TEXT_BLOCK_TEXT:
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
        case ADD_PROJECT_IMAGE:
            let tempObj04 = {};
            let editObj = {
                id: action.uploadResult[0].public_id,
                type: action.itemType,
                imgUrl: action.uploadResult[0].secure_url,
                thumbnailUrl: action.uploadResult[0].thumbnail_url
            };
            if (state[action.name]) {
                tempObj04[action.name] = [...state[action.name], editObj];
            } else {
                tempObj04[action.name] = [editObj];
            }
            return { ...state, ...tempObj04 };
        case DELETE_PROJECT_IMAGE:
            let newArray = state[action.name].filter(
                item => item.id !== action.id
            );
            let tempObj05 = {};
            tempObj05[action.name] = newArray;
            return { ...state, ...tempObj05 };
        case POST_PROJECT:
            return {};
        default:
            return state;
    }
};
