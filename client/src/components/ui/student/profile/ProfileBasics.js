/**
 * Created by bhuang on 6/22/18.
 */

import React, { Component } from "react";
import '../../../../../css/profile/ProfileBasics.scss';

class ProfileBasics extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { profile } = this.props;
        return (
            <div className="profilebasics-root">
                <div className="profilebasics-video">Personal Video</div>
                <div className="profilebasics-block">
                    <div>
                        {profile && <img className="avatar" src={profile.basicInfo.profileIcon.imgUrl}/>}
                        {profile && <div className="profilebasics-name-job">
                            {profile.basicInfo.fullName } | {profile.workExp.job  }@{profile.workExp.company }
                        </div>}
                    </div>
                    <div>
                        <button className="qbutton">Message</button>
                        <button className="qbutton">Follow</button>
                    </div>
                </div>
                <div className="profilebasics-block">
                    <div>Problem Solved</div>
                    <div>Project Views</div>
                    <div>Followers</div>
                    <div>Rating</div>
                    <div>Focus</div>
                </div>
                <div className="profilebasics-block">
                    <div className="profilebasics-textblock">
                        <div className="profilebasics-label">About</div>
                        {profile &&
                            <div className="profilebasics-content">{ profile.selfIntro.main }</div>
                        }
                    </div>
                    <div className="profilebasics-textblock">
                        <div className="profilebasics-label">Personal Website</div>
                        {profile && <div className="profilebasics-url">{ profile.basicInfo.personalUrl }</div>}
                    </div>
                </div>
                <div className="profilebasics-block">
                    <div className="profilebasics-textblock">
                        <div className="profilebasics-label">Work Experience</div>
                        {profile &&
                        <div className="profilebasics-content">
                            <table>
                                <tr>
                                    <td className="profilebasics-job">{ profile.workExp.company }</td>
                                    <td className="profilebasics-job">{ profile.workExp.job }</td>
                                </tr>
                            </table>
                        </div>}
                    </div>
                </div>
                <div>
                    <div className="profilebasics-textblock">
                        <div className="profilebasics-label">Contact</div>
                    </div>
                </div>

            </div>
        )
    }
}

export default ProfileBasics;
