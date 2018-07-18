/**
 * Created by bhuang on 1/13/18.
 */

import React from 'react';
import { Link } from "react-router-dom";
import '../../../../css/common/TutorProjCard.scss'

const TutorProjCard = ({
    _id,
    title,
    description,
    categories
}) => {
    console.log('project description');
    console.log(description);
    let imageUrl = '';
    for (let idx =0; idx < description.length; idx++) {
        if (description[idx].type == 'image') {
            imageUrl =description[idx].imgUrl;
            break;
        }
    }

    return (
    <div className="proj-card">
        <div className="proj-card-head">
            <Link to={`/project-detail/${_id}`}>
                <img src={imageUrl} />
            </Link>
        </div>
        <div className="proj-card-foot">
            <div>
                <span>{title}</span>
            </div>
            <div className="industry">
                <span>{categories}</span>
            </div>
            <div className="rating">
                <span>&#11089;</span>
                <span>&#11089;</span>
                <span>&#11089;</span>
                <span>&#11089;</span>
                <span className="online">Online</span>
            </div>
        </div>
    </div>
    )
}

export default TutorProjCard;
