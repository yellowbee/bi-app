import axios from 'axios';
import { URL_ROOT } from "./constants";

export const GET_QUESTION_DETAIL = 'GET_QUESTION_DETAIL ';

export function getQuestionDetail(id) {
    console.log("getting q detail: " + `${URL_ROOT}/question-detail/${id}`);
    const request = axios.get(`${URL_ROOT}/question-detail/${id}`);

    return {
        type: GET_QUESTION_DETAIL,
        payload: request
    }
}