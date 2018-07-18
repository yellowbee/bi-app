/**
 * Created by bhuang on 2/24/18.
 */
import axios from "axios";
import { URL_ROOT } from "./constants";

export const SET_RADIO_BUTTON = "SET_RADIO_BUTTON";
export const SET_CATEGORIES = "SET_CATEGORIES";
export const SET_QUESTION_NAME = "SET_QUESTION_NAME";
export const ADD_TEXT_BLOCK = "ADD_TEXT_BLOCK";
export const DELETE_TEXT_BLOCK = "DELETE_TEXT_BLOCK";
export const SET_TEXT_BLOCK_TEXT = "SET_TEXT_BLOCK_TEXT";
export const ADD_IMAGE = "ADD_IMAGE";
export const DELETE_IMAGE = "DELETE_IMAGE";
export const ADD_TAG = "ADD_TAG";
export const DELETE_TAG = "DELETE_TAG";
export const POST_QUESTION = "POST_QUESTION";
export const POST_QUESTION_FAILURE = "POST_QUESTION_FAILURE";
/*export function getQuestionDetail() {
 //const question = axios.get(url);
 //const question = axios.get(URL);
 let question = {
 title: 'How to Make a Home Theater Audio System On After Effects',
 tags: ['UI/UX', 'Website Design'],
 name: 'Marilyn Monroe',
 description: 'Computer users and programmers have become so accustomed to using Windows, even for the changing capabilities and the appearances of the graphical interface of the versions, therefore it has remained Microsoft’s product. Although, Lycoris, Red Hat, Mandrake, Suse, Knoppix, Slackware and Lindows make up some of the different versions of LINUX. These companies release their own versions of the operating systems with minor changes, and yet always with the same bottom line. The simple fact that not one of these companies are close to competing with Windows, for the most part causes the difference in market share.\nWindows and Linux are different in many ways. \n1. Windows GUI is an integral component of the OS; speed, efficiency and reliability, while the Linux GUI is optional, are increased by running a server instance of Linux wi\n2. The command prompts of the operating systems are very different. The command interpreters in the Windows 9x series are very similar to each other and the NT class versions of Windows also have similar command interpreters. There are, however differences between a Windows 9x command interpreter and one i\n3. While you have to pay hundred’s of dollars for a new Windows version, you can just go download Linux. There’s no manuals or simple installers for the free version. Although there is quite a learning curve when utilizing the free package. There are some easy automated packages of Linux for low prices.\nIf Linux is ever to compete with Windows, it must become more user friendly and provide serious technical support.',
 qImage: '/images/simplicity.jpg',
 profileImg: '/images/marilyn-monroe.jpg'
 };

 return {
 type: GET_QUESTION_DETAIL,
 payload: question
 };


 }*/

export const setRadioButton = (name, id, value) => {
  return {
    type: SET_RADIO_BUTTON,
    name: name,
    id: id,
    value: value
  };
};

export const setCategories = (name, value) => {
  return {
    type: SET_CATEGORIES,
    name: name,
    value: value
  };
};

export const setQuestionName = (name, value) => {
  return {
    type: SET_QUESTION_NAME,
    name: name,
    value: value
  };
};

export const addTextBlock = (name, blockType) => {
  return {
    type: ADD_TEXT_BLOCK,
    name: name,
    blockType: blockType
  };
};

/**
 *
 * @param name name of the form field
 * @param id the uuid of this edit block
 * @returns {{type: string, name: *, id: *}}
 */
export const deleteTextBlock = (name, id) => {
  return {
    type: DELETE_TEXT_BLOCK,
    name: name,
    id: id
  };
};

export const setTextBlockText = (name, id, value) => {
  return {
    type: SET_TEXT_BLOCK_TEXT,
    name: name,
    id: id,
    value: value
  };
};

export const addImage = (name, itemType, uploadResult) => {
  return {
    type: ADD_IMAGE,
    name: name,
    itemType: itemType,
    uploadResult: uploadResult
  };
};

export const deleteImage = (name, public_id) => {
  const request = axios.delete(`${URL_ROOT}/image/${public_id}`);
    return {
        type: DELETE_IMAGE,
        name: name,
        id: public_id,
        payload: request
    };
};

export const addTag = (name, value) => {
  return {
    type: ADD_TAG,
    name: name,
    value: value
  };
};

export const deleteTag = (name, key) => {
  return {
    type: DELETE_TAG,
    name: name,
    key: key
  };
};

export const postQuestion = (question, callback) => {
  const request = axios
    .post(`${URL_ROOT}/question`, question)
    .then(response => {
      console.log(response);
      callback(response);
    });

  return {
    type: POST_QUESTION,
    payload: request,
    callback: callback
  };
};
