/**
 * The Login page.
 * Created by bhuang on 7/13/18.
 */

/**
 * Created by bhuang on 7/12/18.
 */

import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { setToken } from "../actions/action_auth";

class Login extends Component {
  constructor(props) {
    super(props);
    /**
     * To enable login-free mode
     */
    /*axios.get("http://localhost:8601").then(() => {
         localStorage.setItem("server_port", "8601");
         });*/
    /*let token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`https://whenty-ws.herokuapp.com/api/user/renew/${token}`)
        .then(response => {
          this.props.setToken(response.data);
        })
        .catch(err => {
          localStorage.removeItem("token");
        });
    }*/

    this.handleLogin = this.handleLogin.bind(this);
  }

    handleLogin() {
        //let errors = this.validator();
        let errors = null;

        if (_.isEmpty(errors)) {
            axios
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
                    this.props.history.push("/home");
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
    console.log(this.props.state);
    return (
      <div className="container login-container">
        <div className="row login-row">
          <div className="login-panel col-xs-12 col-sm-12 col login-sidebar">
            <div className="login-panel-top">
              <div className="login-panel-top-title">
                <span className="bi-logo horizontal-2" />
                <h6 className="bi-title horizontal-2">企业分析软件</h6>
              </div>
            </div>
            <form onSubmit={(e) => {
                e.preventDefault();
                this.handleLogin();
            }}>
              <div className="bi-caption">登录</div>
              <input type="text" className="bi-input" placeholder="邮箱" onChange={(e) => {
                  this.setState({email: e.target.value});
              }}/>
              <input type="password" className="bi-input" placeholder="密码" onChange={(e) => {
                  this.setState({password: e.target.value});
              }} />
              <button className="bi-button">登陆</button>
            </form>
            <div className="login-footer">
              <div className="login-footer-links">
                <span>用户协议 | </span>
                <span>隐私声明</span>
              </div>
            </div>
          </div>
          <div className="d-none d-lg-block col login-img padding-0">
            <img src="/images/login-image.jpg"/>
          </div>
        </div>
      </div>
    );
  }
}

let mapStateToProps = state => ({
  state: state
});

let mapDispatchToProps = dispatch => ({
  setToken: value => {
    dispatch(setToken(value));
  }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
