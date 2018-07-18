import axios from "axios";
import { URL_ROOT } from './constants';
//const URL = "https://whenty-ws.herokuapp.com/api/projects";

export const GET_PROJECTS = "GET_PROJECTS";

export function getProjects() {
  //const question = axios.get(url);
  const request = axios.get(URL_ROOT + '/projects');

  console.log("Projects: ", request);

  return {
    type: GET_PROJECTS,
    payload: request
  };
}
