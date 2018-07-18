/**
 * Created by bhuang on 3/18/18.
 */
import React, { Component } from "react";
import TutorProjCard from "../../common/TutorProjCard";
import '../../../../../css/profile/MyProfile.scss';

class ProfileProjects extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { projects } = this.props;
        return (
            <div id="profile-myprofile-container">
                <div className="cardWrapper">
                    { projects && projects.map((proj, i) => <TutorProjCard key={i} {...proj} />)}
                </div>
            </div>
        )
    }
}

export default ProfileProjects;
