/**
 * Created by bhuang on 3/10/18.
 */

import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import axios from "axios";
import { connect } from 'react-redux';
import { setToken } from '../../../actions/action_auth';
import InputText from "../../../../qureative-ui/src/ui/InputText";
import "../../../../css/common/LoginDialogContent.scss";

class LoginDialogContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.handleSwitchToSignup = this.handleSwitchToSignup.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.validator = this.validator.bind(this);
  }

  handleSwitchToSignup() {
    this.props.handleCloseLogin();
    this.props.handleOpenSignup();
  }

  onEmailChange(name, value) {
    this.setState({ ...this.state, ...{ email: value } });
  }
  onPasswordChange(name, value) {
    this.setState({ ...this.state, ...{ password: value } });
  }

  validator() {
      let errors = {};
      if (!/^([a-zA-Z0-9]+)@([a-zA-Z0-9]+)\.([a-z]+)$/.test(this.state.email)) {
          errors.email = 'Not a valid email address!';
      }
      /*if (this.state.password.length < 8) {
          errors.password = 'Passowrd needs to have at least 8 characters!';
      }*/
      return errors;
  }

    /**
     * login and signup are implemented both in web-server and ws;
     * for the purpose of local development, ws is used for login
     * local: http://localhost:3000/login
     * ws: https://whenty-ws.herokuapp.com/login
     */
  handleLogin() {
      let errors = this.validator();

      if (_.isEmpty(errors)) {
          const request = axios
              .post("https://whenty-ws.herokuapp.com/login", {
                  userName: this.state.email,
                  password: this.state.password
              })
              .then(response => {
                  console.log("ws response: ");
                  console.log(response);
                  this.props.setToken(response.data);

                  /**
                   * set localStorage to live beyond session
                   */
                  console.log(this.props.state);
                  localStorage.setItem("token", response.data.token);
                  //localStorage.setItem("userName", response.data.userName);
                  //localStorage.setItem("fullName", response.data.fullName);
                  this.props.handleCloseLogin();
              })
              .catch(error => {
                  console.log(error.response);
                  if (error.response.data.status === 401) {

                      this.setState({
                          ...this.state,
                          errors: {...this.state.errors, auth: "Wrong credentials. Try again."}
                      });
                  }
              });
      } else {
          this.setState({ ...this.state, errors: errors});
      }
  }

  render() {
      console.log("current state: ");
      console.log(this.props.state);
    return (
      <div>
        <div className="logo">Qureative</div>
        <div className="page-title">Sign In To Continue</div>
        <InputText
          style={{ margin: "5px 0" }}
          type="text"
          placeholder="Email"
          name="email"
          changeText={this.onEmailChange}
        />
        <div style={{ color: "red", fontSize: '0.8em' }}>
          {this.state.errors && this.state.errors.email}
        </div>
        <InputText
          style={{ margin: "5px 0" }}
          type="password"
          placeholder="Password"
          changeText={this.onPasswordChange}
        />
        <div style={{ color: "red", fontSize: '0.8em' }}>
          {this.state.errors && this.state.errors.password}
        </div>
        <button className="main-btn" onClick={this.handleLogin}>
          Sign in
        </button>
        <div className="switch-sec">
          <span className="sm-instr">Don't have an account yet?</span>
          <button className="sm-btn" onClick={this.handleSwitchToSignup}>
            Create
          </button>
          <div style={{ clear: "both", fontSize: '0.8em' }} />
        </div>
        <div style={{ color: "red" }}>
          {this.state.errors && this.state.errors.auth}
        </div>
      </div>
    );
  }
}

let mapStateToProps = state => ({
    state: state
});

let mapDispatchToProps = dispatch => ({
    setToken: (value) => {
        dispatch(setToken(value));
    }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginDialogContent));
