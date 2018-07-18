/**
 * Created by bhuang on 5/25/18.
 */

import React, { Component } from "react";
import axios from 'axios';
import { isEmpty } from "lodash";
import Comment from "./Comment";
import { URL_ROOT } from "../../../../actions/constants";
import "../../../../../css/common/comment/CommentList.scss";
import "../../../../../qureative-ui/css/textarea.scss";

//const CommentList = ({projId, comments }) => {
class CommentList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projectDetail: null,
            commentValue: ''
        };
        this.getProjectDetail = this.getProjectDetail.bind(this);
        this.onClickSubmit = this.onClickSubmit.bind(this);
    }

    getProjectDetail(id) {
        axios.get(`${URL_ROOT}/project-detail/${id}`)
            .then((response) => {
                this.setState({projectDetail: response.data});
            })
    }

    componentDidMount() {
        this.getProjectDetail(this.props.projId);
    }

    onClickSubmit() {
        if (isEmpty(this.state.commentValue) || this.state.commentValue.trim().length == 0) {
            return;
        }

        let comment = {data: {author: "Bruce", body: this.state.commentValue}};
        axios
            .post(`${URL_ROOT}/project/comment/${this.props.projId}`, comment)
            .then(response => {
                console.log(response);
                this.setState({commentValue: ''});
                this.getProjectDetail(this.props.projId);
            });
    }

  render() {
      return (
          <div className="commentlist-container">
              <div>Comments({ this.state.projectDetail != null && this.state.projectDetail.comments != null && this.state.projectDetail.comments.length })</div>
              <div className="commentlist-list">
                  {this.state.projectDetail != null &&
                  this.state.projectDetail.comments != null &&
                  this.state.projectDetail.comments.map((comment, i) => <Comment key={i} comment={comment}/>)}
              </div>
              <div className="commentlist-new">
                  <div>
                      <img
                          className="commentlist-profile-img"
                          src="/images/profileIcon.png"
                      />
                  </div>
                  <div className="commentlist-mycomment">
                      <textarea className="qureative-ui-ta" value={this.state.commentValue} onChange={(e) => {
                          this.setState({commentValue: e.target.value});
                      }}/>
                      <div className="commentlist-button">
                          <button type="submit" className="qbutton" onClick={this.onClickSubmit}>
                              Post Comment
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      );
  }
};

export default CommentList;
