/**
 * Work experience section of Edit Profile
 * Created by bhuang on 6/17/18.
 */
import React, { Component } from "react";
import "../../../../../css/profile/EditProfileWorkExperience.scss";

class EditProfileWorkExperience extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="editprofile-title">Work Experience</div>

        <div className="editprofile-workexp-job">
          <div className="editprofile-workexp-comjob">
            <div style={{ width: "60%" }} className="side-by-side">
              <div className="input-text">
                <input type="text" placeholder="Company" onChange={(e) => {
                    let nextState = {...this.state, company: e.target.value};
                    this.props.updateWorkExp(nextState);
                    this.setState({company: e.target.value});
                }}/>
              </div>
            </div>
            <div style={{ width: "5%" }} className="side-by-side">
              &nbsp;
            </div>
            <div style={{ width: "35%" }} className="side-by-side">
              <div className="input-text">
                <input type="text" placeholder="Job" onChange={(e) => {
                    let nextState = {...this.state, job: e.target.value};
                    this.props.updateWorkExp(nextState);
                    this.setState({job: e.target.value});
                }}/>
              </div>
            </div>
            <div style={{ clear: "both" }} />
          </div>

          <div className="text-area" style={{ width: "100%" }}>
            <textarea
              rows="4"
              placeholder="Job Description"
              onChange={(e) => {
                  let nextState = {...this.state, desc: e.target.value};
                  this.props.updateWorkExp(nextState);
                  this.setState({desc: e.target.value});
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default EditProfileWorkExperience;
