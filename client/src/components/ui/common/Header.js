/**
 * The very top of a page that contains Post a request, Become a tutor ...
 * Created by bhuang on 1/14/18.
 */

import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import ReactModal from "react-modal";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import _ from "lodash";
import LoginDialogContent from "../common/LoginDialogContent";
import SignupDialogContent from "../common/SignupDialogContent";
import ProfileHome from "./ProfileHome";
import "../../../../css/common/Header.scss";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      showLogin: false,
      showSignup: false,
      serverPort: localStorage.getItem("server_port")
    };

    this.handleOpenLogin = this.handleOpenLogin.bind(this);
    this.handleCloseLogin = this.handleCloseLogin.bind(this);

    this.handleOpenSignup = this.handleOpenSignup.bind(this);
    this.handleCloseSignup = this.handleCloseSignup.bind(this);

    this.handlePostQuestion = this.handlePostQuestion.bind(this);
  }

  handleOpenLogin() {
    this.setState({ showLogin: true });
  }
  handleCloseLogin() {
    this.setState({ showLogin: false });
  }

  handleOpenSignup() {
    this.setState({ showSignup: true });
  }
  handleCloseSignup() {
    this.setState({ showSignup: false });
  }

  handlePostQuestion() {
    if (_.isEmpty(this.state.serverPort) && _.isEmpty(this.props.auth)) {
      this.handleOpenLogin();
    } else {
      this.props.history.push("/new-question/description");
    }
  }

  render() {
    return (
      <div id="nav-wrapper">
        <NavLink to="/">
          <div className="logo">Qureative</div>
        </NavLink>
        <div id="navbar">
          {/*<NavLink to="/new-question/description"/>*/}
            {/*<button onClick={this.handlePostQuestion}>
            <span>Post a Question</span>
          </button>*/}
          {
          !this.props.auth.token && (
              <button
                className="navbar-circle log-in"
                onClick={this.handleOpenLogin}
              >
                Log in
              </button>
            ) ||
            this.props.auth.token && (
              /*<button className="navbar-circle log-out">H</button>*/
              <div id="prof-home">
              <ProfileHome />
              </div>
              )}
        </div>

        <ReactModal
          isOpen={this.state.showLogin}
          contentLabel="onRequestClose Example"
          onRequestClose={this.handleCloseLogin}
          style={{
            overlay: {
              backgroundColor: "rgba(50, 50, 50, 0.7)"
            },
            content: {
              top: "50%",
              left: "50%",
              borderRadius: "10px",
              width: "350px",
              height: "500px",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)"
            }
          }}
        >
          <LoginDialogContent
            handleCloseLogin={this.handleCloseLogin}
            handleOpenSignup={this.handleOpenSignup}
          />
        </ReactModal>

        <ReactModal
          isOpen={this.state.showSignup}
          contentLabel="onRequestClose Example"
          onRequestClose={this.handleCloseSignup}
          style={{
            overlay: {
              backgroundColor: "rgba(50, 50, 50, 0.7)"
            },
            content: {
              top: "50%",
              left: "50%",
              borderRadius: "10px",
              width: "350px",
              height: "500px",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)"
            }
          }}
        >
          <SignupDialogContent
            handleCloseSignup={this.handleCloseSignup}
            handleOpenLogin={this.handleOpenLogin}
          />
        </ReactModal>
      </div>
    );
  }
}

let mapStateToProps = state => ({
  auth: state.auth
});

export default withRouter(connect(mapStateToProps)(Header));
