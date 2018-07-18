/**
 * Created by bhuang on 5/11/18.
 */
import axios from "axios";
import { URL_ROOT } from "./constants";

export const SET_PROJECT_CATEGORIES = "SET_PROJECT_CATEGORIES";
export const SET_PROJECT_NAME = "SET_PROJECT_NAME";
export const ADD_PROJECT_IMAGE = "ADD_PROJECT_IMAGE";
export const DELETE_PROJECT_IMAGE = "DELETE_PROJECT_IMAGE";
export const ADD_PROJECT_TEXT_BLOCK = "ADD_PROJECT_TEXT_BLOCK";
export const DELETE_PROJECT_TEXT_BLOCK = "DELETE_PROJECT_TEXT_BLOCK";
export const SET_PROJECT_TEXT_BLOCK_TEXT = "SET_PROJECT_TEXT_BLOCK_TEXT";
export const POST_PROJECT = "POST_PROJECT";

export const setProjectCategories = (name, value) => {
    return {
        type: SET_PROJECT_CATEGORIES,
        name: name,
        value: value
    };
};

export const setProjectName = (name, value) => {
    return {
        type: SET_PROJECT_NAME,
        name: name,
        value: value
    };
};

export const addProjectImage = (name, itemType, uploadResult) => {
    return {
        type: ADD_PROJECT_IMAGE,
        name: name,
        itemType: itemType,
        uploadResult: uploadResult
    };
};

export const deleteProjectImage = (name, public_id) => {
    const request = axios.delete(`${URL_ROOT}/image/${public_id}`);
    return {
        type: DELETE_PROJECT_IMAGE,
        name: name,
        id: public_id,
        payload: request
    };
};

export const addProjectTextBlock = (name, blockType) => {
    return {
        type: ADD_PROJECT_TEXT_BLOCK,
        name: name,
        blockType: blockType
    };
};

export const deleteProjectTextBlock = (name, id) => {
    return {
        type: DELETE_PROJECT_TEXT_BLOCK,
        name: name,
        id: id
    };
};

export const setProjectTextBlockText = (name, id, value) => {
    return {
        type: SET_PROJECT_TEXT_BLOCK_TEXT,
        name: name,
        id: id,
        value: value
    };
};

export const postProject = (project, callback) => {
    const request = axios
        .post(`${URL_ROOT}/project`, project)
        .then(response => {
            console.log(response);
            callback(response);
        });

    return {
        type: POST_PROJECT,
        payload: request,
        callback: callback
    };
};