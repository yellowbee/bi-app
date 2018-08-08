/**
 * Created by bhuang on 7/12/18.
 */

import React, { Component } from "react";
import { csv } from "d3-request";
import { timeParse } from "d3-time-format";
import axios from "axios";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import { setToken } from "../actions/action_auth";
import SimpleDropdownList from "../../qureative-ui/src/ui/SimpleDropdownList";
import createFilterOptions from "react-select-fast-filter-options";
import ComapanySelector from "./ui/analysis/CompanySelector";
import TreeMenuNode from "./widgets/TreeMenuNode";
import TreeMenuRoot from "./widgets/TreeMenuRoot";

import CompanyPortfolio from "./ui/analysis/CompanyPortfolio";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sideNav: true,
      selector: true,
      portfolio: false
    };

    this.openNav = this.openNav.bind(this);
    this.closeNav = this.closeNav.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleConfirmSelection = this.handleConfirmSelection.bind(this);
    this.handleBackToAddMore = this.handleBackToAddMore.bind(this);

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

  handleChange(selectedOptions) {
    this.setState({ selectedOptions });
    console.log(`Option selected:`, selectedOptions);
  }

  handleConfirmSelection() {
    if (this.state.selectedOptions && this.state.selectedOptions.length > 0) {
        this.setState({selector: false, portfolio: true});
    }
  }

  handleBackToAddMore() {
    this.setState({ selector: true, portfolio: false });
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
                    <a href="#basic-info">公司指标查询与分析</a>
                  </li>
                  <li>
                    <a href="#self-intro">自助式指标预测</a>
                  </li>
                  <li>
                    <a href="#work-exp">企业会计信息质量</a>
                  </li>
                  <li>
                    <a href="#contact-method">企业估值</a>
                  </li>
                  <li>
                    <a href="#contact-method">一键报告生成</a>
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

        <div className="side no-wrap home-workspace">
          <span
            style={{ fontSize: "30px", cursor: "pointer" }}
            onClick={e => {
              this.openNav();
            }}
          >
            &#9776;
          </span>
          <NavLink exact to="/">
            <div>登出</div>
          </NavLink>

          {this.state.selector && (
            <ComapanySelector
              handleChange={this.handleChange}
              handleConfirmSelection={this.handleConfirmSelection}
              defaultValue={this.state.selectedOptions}
            />
          )}

          {this.state.portfolio && (
            <CompanyPortfolio
              selection={this.state.selectedOptions}
              handleBackToAddMore={this.handleBackToAddMore}
            />
          )}

          {/*
                <div className="col-md-2">
                    <SimpleDropdownList
                        title="选择开始日期"
                        itemList={["Art", "Design"]}
                        setCategory={this.props.setCategory}
                    />
                </div>
                <div className="col-md-2">
                    <SimpleDropdownList
                        title="选择结束日期"
                        itemList={["Art", "Design"]}
                        setCategory={this.props.setCategory}
                    />
                </div>*/}
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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
);
