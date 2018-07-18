import React from 'react';
import '../../../../css/common/ProfileIcon.scss'

const ProfileIcon = ({profileImg, fullName, status}) => {
    return (
        <div id="profile-frame">
            <img src={profileImg}/>
            <div id="status"/>
            <span>&nbsp;&nbsp;&nbsp;{fullName}</span>
        </div>
    )
};

export default ProfileIcon;
