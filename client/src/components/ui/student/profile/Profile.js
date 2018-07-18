/**
 * My Profile page when clicking on home icon -> My Profile
 *
 * Created by bhuang on 3/18/18.
 */

import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import ProfileResources from "./ProfileResources";
import ProfileBasics from "./ProfileBasics";
import "../../../../../css/profile/Profile.scss";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

      axios
          .get(
              `https://whenty-ws.herokuapp.com/api/profile/${
                  this.props.auth.userName
                  }`
          )
          .then(response => {
              console.log("PROFILE RESPONSE");
              console.log(response);
              this.setState({profile: response.data.result });
          })
          .catch(err => {
              console.log(err);
          });
  }

  /*componentDidMount() {
    axios
      .get(
        `https://whenty-ws.herokuapp.com/api/profile/${
          this.props.auth.userName
        }`
      )
      .then(response => {
        console.log("PROFILE RESPONSE");
        console.log(response);
        this.setState({loading: false, profile: response.data.result });
      })
      .catch(err => {
        console.log(err);
      });
  }*/

  render() {
    return (
    <div className="profile">
      <div className="profile-wrap">
        <div className="profile-button">
          <NavLink to="/profile/edit-profile">
            <button id="showcase-post">
              <span>Edit Profile</span>
            </button>
          </NavLink>
          <div className="clear-bar" style={{clear: "both"}}/>
        </div>

          <div className="profile-info">
          <ProfileBasics profile={this.state.profile}/>
        </div>
        <div className="profile-resource">
          <ProfileResources/>
        </div>
      </div>
    </div>
  )
  }
}

let mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(Profile);
