/**
 * This is a presentational class to render a piece of comment from a user
 * Created by bhuang on 5/25/18.
 */

import React, { Component } from "react";
import "../../../../../css/common/comment/Comment.scss";

const Comment = ({ comment }) => {
  let { profileImg, author, body } = comment;

  return (
    <div className="comment">
      <div className="comment--title">
        <div className="comment--profile-icon">
          <img src={"/images/profileIcon.png"} />
        </div>
        <div className="comment--title-info">
          <div>{ author }</div>
          <div>online</div>
        </div>
      </div>
      <div className="comment--content">
          { body }
      </div>
    </div>
  );
};

export default Comment;
