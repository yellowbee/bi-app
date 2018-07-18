/**
 * Self introduction section of Edit Profile
 * Created by bhuang on 6/16/18.
 */

import React, { Component } from "react";
import "../../../../../css/profile/EditProfileSelfIntro.scss";

class EditProfileSelfIntro extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        console.log(this.state);
        return (
            <div>
                <div className="editprofile-title">Self Introduction</div>

                <div className="editprofile-selfIntro-addvideo">
                    <div className="editprofile-selfIntro-addbtn">
                        <div className="editprofile-selfIntro-plus">+</div>
                    </div>
                    <div className="editprofile-selfIntro-text">Add a personal introduction video</div>
                </div>

                <div className="text-area" style={{width: "100%"}}>
                <textarea rows="4" placeholder="Write something to introduce yourself" onChange={(e) => {
                    let nextState = {...this.state, main: e.target.value};
                    this.props.updateSelfIntro(nextState);
                    this.setState({main: e.target.value});
                }}/>
                </div>
            </div>
        )
    }
}

export default EditProfileSelfIntro;
