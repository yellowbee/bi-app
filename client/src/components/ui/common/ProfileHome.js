/**
 * Created by bhuang on 3/15/18.
 */

import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { clearAuth } from "../../../actions/action_auth";
import "../../../../css/common/ProfileHome.scss";

class ProfileHome extends Component {
  constructor(props) {
    super(props);
    this.onClickSelected = this.onClickSelected.bind(this);
    this.hideDropdown = this.hideDropdown.bind(this);
  }

  componentDidMount() {
    this.refs["dropdown"].className = "select-dropdown hide";
  }

  onClickSelected(e) {
      e.target.nextSibling.classList.toggle("show");
      e.target.nextSibling.classList.toggle("hide");
  }

  hideDropdown() {
    this.refs["dropdown"].className = "select-dropdown hide";
  }

  render() {
    console.log(this.props.auth);
    /*<div className="select-item" value={item.value} onClick={this.onClickItem}>
         {item.label}
         </div>*/
    console.log(this.props.auth);
    return (
      <div className="home-btn" id="home-button">
        {/*<div
          className="selected-item"
          ref="selected"
          onClick={this.onClickSelected}
        >
          {value || "Category"}
        </div>*/}

        <button
          className="selected-item navbar-circle log-out"
          ref="selected"
          id="home-btn-icon"
          onClick={this.onClickSelected}
        >
          H
        </button>

        <div className="select-dropdown" ref="dropdown" id="home-btn-dropdown">
          <div className="profile-head" id="home-btn-head">
              <div className="profilehome-icon">H</div>
              <div style={{display: "inline-block", marginLeft: "3px"}}>
              {(this.props.auth || localStorage.getItem("fullName")) && <div>{this.props.auth.fullName || localStorage.getItem("fullName")}</div>}
              {(this.props.auth || localStorage.getItem("userName"))  && <div>{this.props.auth.userName || localStorage.getItem("userName")}</div>}
              </div>
          </div>
          <div className="select-item"
               onClick={() => {
                   this.props.history.push("/profile/projects");
               }}
          >My Profile</div>
          <div className="select-item">Message</div>
          <div className="select-item">Balance</div>
            <div className="select-item">Settings</div>
          <div className="select-item">About</div>
          <div className="profile-foot">
            <button
              onClick={() => {
                localStorage.removeItem("token");
                //localStorage.removeItem("userName");
                localStorage.removeItem("fullName");
                this.props.logout();
                this.props.history.push("/");
              }}
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    );
  }
}

let mapStateToProps = state => ({
  auth: state.auth
});

let mapDispatchToProps = dispatch => ({
  logout: () => {
    dispatch(clearAuth());
  }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileHome));
