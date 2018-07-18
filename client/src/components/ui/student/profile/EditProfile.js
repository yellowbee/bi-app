/**
 * Edit Profile page on clicking on the Edit Profile button
 * on My Profile page (Profile.js)
 *
 * Created by bhuang on 6/11/18.
 */
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import axios from "axios";
import { URL_ROOT } from "../../../../actions/constants";
import EditProfileBasicInfo from "./EditProfileBasicInfo";
import EditProfileSelfIntro from "./EditProfileSelfIntro";
import EditProfileWorkExperience from "./EditProfileWorkExperience";
import EditProfileContactMethod from "./EditProfileContactMethod";
import "../../../../../css/profile/EditProfile.scss";
import "../../../../../qureative-ui/css/input-text.scss";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.updateBasicInfo = this.updateBasicInfo.bind(this);
    this.updateSelfIntro = this.updateSelfIntro.bind(this);
    this.updateWorkExp = this.updateWorkExp.bind(this);
    this.updateContact = this.updateContact.bind(this);
  }

  updateBasicInfo(basicInfo) {
    this.setState({basicInfo: basicInfo});
    console.log(this.state);
  }
  updateSelfIntro(selfIntro) {
      this.setState({selfIntro: selfIntro});
      console.log(this.state);
  }
  updateWorkExp(workExp) {
      this.setState({workExp: workExp});
      console.log(this.state);
  }
  updateContact(contact) {
      this.setState({contact: contact});
      console.log(this.state);
  }

  render() {
    return (
      <div id="editprofile-top" className="editprofile-bg">
        <div className="editprofile-root">
          <div className="editprofile-link">
            <NavLink to="/profile/projects">
              <span>&lt; Back to Profile </span>
            </NavLink>
          </div>

          <div className="editprofile-form">
            <div className="editprofile-navs">
              <ul>
                <li className="editprofile-navs-top">
                  <a href="#basic-info">Basic Information</a>
                </li>
                <li>
                  <a href="#self-intro">Self Introduction</a>
                </li>
                <li>
                  <a href="#work-exp">Work Experience</a>
                </li>
                <li className="editprofile-navs-bottom">
                  <a href="#contact-method">Contact Method</a>
                </li>
              </ul>
            </div>

            <div className="editprofile-sections">
              <div id="basic-info" className="editprofile-section">
                <EditProfileBasicInfo updateBasicInfo={this.updateBasicInfo} />
              </div>
              <div id="self-intro" className="editprofile-section">
                <EditProfileSelfIntro updateSelfIntro={this.updateSelfIntro} />
              </div>
              <div id="work-exp" className="editprofile-section">
                <EditProfileWorkExperience updateWorkExp={this.updateWorkExp} />
              </div>
              <div id="contact-method" className="editprofile-section">
                <EditProfileContactMethod updateContact={this.updateContact} />
              </div>
              <div className="editprofile-info-back side-by-side">
                <a href="#editprofile-top">Back to Top</a>
                <div className="editprofile-save">
                  <button onClick={() => {
                      let payload = {userName: this.props.auth.userName, ...this.state};
                      // here POST is used; but on the WS server, it needs to decide whether
                      // it's a POST or UPDATE
                      axios.post(`${URL_ROOT}/profile`, payload)
                          .then(() => {
                          });
                  }}>Save</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

let mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(EditProfile);
