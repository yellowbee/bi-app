/**
 * This is the page that presents a project content.
 * Created by bhuang on 5/13/18.
 */

import React, { Component } from "react";
import axios from "axios";
import CommentList from "../../common/comment/CommentList";
import { API_ROOT_URL } from "../../../../../src/constants";
import "../../../../../css/student/project/Project.scss";

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: null
    };
    this.getProjectDetail = this.getProjectDetail.bind(this);
  }

  getProjectDetail(id) {
    axios
      .get(`${API_ROOT_URL}/api/project-detail/${id}`)
      .then(response => {
        console.log(response);
        this.setState({ project: response.data });
      });
  }

  componentDidMount() {
    this.getProjectDetail(this.props.match.params.id);
  }

  render() {
    let { project } = this.state;
    return (
      <div>
          { project &&
        <div>
          <div className="project-title">{project.title}</div>
          {project &&
            project.postedBy &&
            project.postedBy.basicInfo && (
              <div className="project-profileicon">
                <img
                  className="avatar"
                  src={project.postedBy.basicInfo.profileIcon.imgUrl}
                />
                <div className="project-fullname">
                  {project.postedBy.basicInfo.fullName}
                </div>
              </div>
            )}
          <div>
            {project &&
              project.description &&
              project.description.map((block, i) => {
                if (block.type === "text") {
                  return (
                    <div key={i} className="project-paragraph">
                      {block.value}
                    </div>
                  );
                } else if (block.type === "image") {
                  return (
                    <div key={i} className="project-img">
                      <img src={block.imgUrl} />
                    </div>
                  );
                }
              })}
          </div>
          <CommentList projId={project._id} />
        </div> }
      </div>
    );
  }
}

export default Project;
