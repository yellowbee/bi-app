/**
 * Created by bhuang on 7/12/18.
 */

import React, { Component } from "react";
import { csv } from "d3-request";
import { timeParse } from "d3-time-format";
import axios from "axios";
import { connect } from "react-redux";
import {NavLink, Route, Switch, withRouter} from "react-router-dom";
import { setToken } from "../actions/action_auth";
import ParameterQuery from "./ui/analysis/ParameterQuery";
import ParameterPrediction from "./ui/analysis/ParameterPrediction";
import AccountingInfo from "./ui/analysis/AccountingInfo";
import MainNav from "./ui/nav/MainNav";
import LeftNav from "./ui/nav/LeftNav";
import ShareSelector from "./ui/analysis/ShareSelector";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sideNav: true
    };

    this.openNav = this.openNav.bind(this);
    this.closeNav = this.closeNav.bind(this);

    /**
     * To enable login-free mode
     */
    /*axios.get("http://localhost:8601").then(() => {
         localStorage.setItem("server_port", "8601");
         });*/
    let token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`https://whenty-ws.herokuapp.com/api/user/renew/${token}`)
        .then(response => {
          this.props.setToken(response.data);
        })
        .catch(err => {
          localStorage.removeItem("token");
        });
    }

    let parseTime = timeParse("%Y-%m");
    csv(
      "/sample-data/roe.csv",
      d => {
        d.date = parseTime(d.date);
        return d;
      },
      (error, data) => {
        if (error) throw error;

        console.log(data);
        this.setState({ data });
      }
    );
  }

  openNav() {
    this.setState({ sideNav: true });
  }

  closeNav() {
    this.setState({ sideNav: false });
  }

  render() {
    console.log(this.props.state);
    let navStyle;
    if (this.state.sideNav) {
      navStyle = "side no-wrap home-sidenav show";
    } else {
      navStyle = "side no-wrap home-sidenav hide";
    }

    return (
      <div className="home">
          <div id="navbar-top">
              <div className="home-logo">
                  <span className="logo__circle" />
                  <span className="logo__title">企业分析软件</span>
              </div>
          </div>
        <div className="left-navbar">
          <div>
              <LeftNav/>
          </div>
        </div>

        <div className="content">
          <Switch>
              <Route path="/home/main-shares" component={ShareSelector} />
              <Route path="/home/param-query" component={ParameterQuery} />
              <Route path="/home/param-prediction" component={ParameterPrediction} />
              <Route path="/home/accounting-info" component={AccountingInfo} />
          </Switch>
        </div>
      </div>
    );
  }
}

/**
 * Redux state here is redundant. It's kept only for the purpose of debugging.
 * @param state
 * @returns {{state: *}}
 */
let mapStateToProps = state => ({
  state: state
});

let mapDispatchToProps = dispatch => ({
  setToken: value => {
    dispatch(setToken(value));
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
);
