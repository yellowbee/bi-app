/**
 * Created by bhuang on 3/11/18.
 */

import React, { Component } from "react";
import axios from "axios";
import { connect } from 'react-redux';
import { setToken } from '../../../actions/action_auth';
import InputText from "../../../../qureative-ui/src/ui/InputText";
import "../../../../css/common/LoginDialogContent.scss";

class SignupDialogContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      email: "",
      password: ""
    };
    this.handleSwitchToLogin = this.handleSwitchToLogin.bind(this);
    this.onFullNameChange = this.onFullNameChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleSwitchToLogin() {
    this.props.handleCloseSignup();
    this.props.handleOpenLogin();
  }

  onFullNameChange(name, value) {
    this.setState({ ...this.state, ...{ fullName: value } });
  }
  onEmailChange(name, value) {
    this.setState({ ...this.state, ...{ email: value } });
  }
  onPasswordChange(name, value) {
    this.setState({ ...this.state, ...{ password: value } });
  }

  validator() {
    let errors = {};
    if (this.state.fullName.length < 1) {
      errors.fullName = "Full Name cannot be empty";
    }
    if (!/^([a-zA-Z0-9]+)@([a-zA-Z0-9]+)\.([a-z]+)$/.test(this.state.email)) {
      errors.email = "Not a valid email address!";
    }
    if (this.state.password.length < 8) {
      errors.password = "Passowrd needs to have at least 8 characters!";
    }
    return errors;
  }

  handleSignup() {
    let errors = this.validator();

    if (_.isEmpty(errors)) {
      const request = axios
        .post("/api/user", {
          fullName: this.state.fullName,
          userName: this.state.email,
          password: this.state.password
        })
        .then(response => {
          console.log('request success: ')
          console.log(response);
          this.props.setToken(response.data);
          this.props.handleCloseSignup();
        })
        .catch(error => {
          console.log('request error: ');
          console.log(error.response);
          if (error.response.data.status !== 200) {
            this.setState({
              ...this.state,
              errors: {
                ...this.state.errors,
                auth: "Account Creation Failed. Try again."
              }
            });
          }
        });
    } else {
      this.setState({ ...this.state, errors: errors });
    }
  }

  render() {
      console.log(this.props.state);
    return (
      <div>
        <div className="logo">Qureative</div>
        <div className="page-title">Create A New Account</div>
        <InputText
          style={{ margin: "5px 0" }}
          type="text"
          placeholder="Full Name"
          name="fullName"
          changeText={this.onFullNameChange}
        />
        <div style={{ color: "red", fontSize: '0.8em' }}>
            {this.state.errors && this.state.errors.fullName}
        </div>
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
          name="password"
          changeText={this.onPasswordChange}
        />
          <div style={{ color: "red", fontSize: '0.8em' }}>
              {this.state.errors && this.state.errors.password}
          </div>
        <button className="main-btn" onClick={this.handleSignup}>Create</button>
        <div className="switch-sec">
          <span className="sm-instr">Already have an account?</span>
          <button className="sm-btn" onClick={this.handleSwitchToLogin}>
            Sign In
          </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignupDialogContent);
