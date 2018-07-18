/**
 * Created by bhuang on 2/17/18.
 */
import axios from "axios";
import { URL_ROOT } from "./constants";

export const GET_QUESTIONS = "GET_QUESTIONS";

export const getQuestions = () => {
  const request = axios.get(URL_ROOT + '/questions');

  return {
    type: GET_QUESTIONS,
    payload: request
  };
};
