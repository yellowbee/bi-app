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
import TreeMenuNode from "./widgets/TreeMenuNode";
import TreeMenuRoot from "./widgets/TreeMenuRoot";
import ParameterQuery from "./ui/analysis/ParameterQuery";

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
        <div className={navStyle} style={{ borderRight: "1px solid gray" }}>
          <div style={{ padding: "10px" }}>
            <div
              className="closebtn"
              onClick={e => {
                this.closeNav();
              }}
            >
              &times;
            </div>
            <div className="home-logo">
              <span className="bi-logo horizontal-2" />
              <h6 className="bi-title horizontal-2">企业分析软件</h6>
            </div>

            <TreeMenuRoot>
              <TreeMenuNode nodeName="企业分析" expandAtOpen={true}>
                <ul>
                  <li>
                    <NavLink activeClassName="selected" to="/home/param-query">公司指标查询与分析</NavLink>
                  </li>
                  <li>
                    <NavLink activeClassName="selected" to="/home/param-prediction">自助式指标预测</NavLink>
                  </li>
                  <li>
                    <NavLink activeClassName="selected" to="/home/accounting-info">企业会计信息质量</NavLink>
                  </li>
                  <li>
                    <NavLink activeClassName="selected" to="/home/estimation">企业估值</NavLink>
                  </li>
                  <li>
                    <NavLink activeClassName="selected" to="/home/report">一键报告生成</NavLink>
                  </li>
                </ul>
              </TreeMenuNode>
              <ul>
                <li>
                  <a href="#basic-info">我的</a>
                </li>
                <li>
                  <a href="#basic-info">资讯</a>
                </li>
                <li>
                  <a href="#basic-info">排行榜</a>
                </li>
                <li>
                  <a href="#basic-info">贴吧</a>
                </li>
              </ul>
            </TreeMenuRoot>
          </div>
        </div>

          <Switch>
              <Route path="/home/param-query" component={ParameterQuery} />
          </Switch>
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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
);
