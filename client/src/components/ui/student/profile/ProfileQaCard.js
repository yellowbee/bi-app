/**
 * Created by bhuang on 6/26/18.
 */
import React, { Component } from "react";
import ProfileIcon from "../../common/ProfileIcon";
import { Link } from "react-router-dom";
import "../../../../../css/profile/ProfileQaCard.scss";
import "../../../../../qureative-ui/css/radio-group.scss";

class ProfileQaCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let {
      _id,
      qImage,
      tags,
      location,
      title,
      profileImg,
      fullName,
      hrLeftToAns,
      numFollowees,
      numFollowers,
      price,
      getQuestionDetail
    } = this.props;

    return (
      <div className="profile-qcard">
        <a
          className="profile-qa-link"
          href={`/question-pool/question-detail/${_id}`}
        >
          <div>
            <div id="tag-loc">
              <span className="profile-qcard-text">${price} | </span>
              {tags.map(tag => (
                <span style={{ padding: "0 2px" }}>{tag}</span>
              ))}{" "}
              | {location}
            </div>
            <div id="title">{title}</div>
            <div id="prof-name">
              <ProfileIcon profileImg={profileImg} fullName={fullName} />
            </div>
          </div>
        </a>
      </div>
    );
  }
}

export default ProfileQaCard;
