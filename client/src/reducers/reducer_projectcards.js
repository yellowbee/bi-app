/**
 * Return the dummy array no matter what
 */

/*export default () => {

    let proj = {
        projName: 'My Dream',
        tutorName: 'John Max',
        projIndustry: 'UX/UI',
        ratings: 4,
        online: true
    };

    let projList = [];
    for (let i=0; i<12; i++) {
        projList.push(proj);
    }

    return projList;
}*/

import { GET_PROJECTS} from "../actions/action_project";

export default (state = [], action) => {
    switch (action.type) {
        case GET_PROJECTS:
            return action.payload.data;

    }
    return state;
}