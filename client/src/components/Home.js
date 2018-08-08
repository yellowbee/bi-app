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
import Select from "react-select";
import options from "./full-ashare-companies";
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody
} from "react-accessible-accordion";
import TreeMenuNode from "./widgets/TreeMenuNode";
import TreeMenuRoot from "./widgets/TreeMenuRoot";

// Demo styles, see 'Styles' section below for some notes on use.
import "react-accessible-accordion/dist/fancy-example.css";

const filterOptions = createFilterOptions({
  options
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sideNav: true
    };

    this.openNav = this.openNav.bind(this);
    this.closeNav = this.closeNav.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

  handleChange(selectedOption) {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
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

          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <div>选定公司</div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <div className="home-panel-title">
                  <h6>分类查询</h6>
                </div>
                <Accordion>
                  <AccordionItem expanded={true}>
                    <AccordionItemTitle>
                      <h6>股票市场分类</h6>
                    </AccordionItemTitle>
                    <AccordionItemBody>
                      <div>全部a股</div>
                      <div>上证a股</div>
                      <div>深证a股</div>
                      <div>创业板</div>
                      <div>中小企业板</div>
                      <div>深圳主板a股</div>
                      <div>全部b股</div>
                      <div>上证b股</div>
                      <div>深证b股</div>
                    </AccordionItemBody>
                  </AccordionItem>

                  <AccordionItem>
                    <AccordionItemTitle>
                      <h6>第三版</h6>
                    </AccordionItemTitle>
                    <AccordionItemBody className="third-plate-accord-body" />
                  </AccordionItem>

                  <AccordionItem>
                    <AccordionItemTitle>
                      <h6>行业分类</h6>
                    </AccordionItemTitle>
                  </AccordionItem>
                </Accordion>
              </div>
              <div className="col-md-6">
                <div className="home-panel-title">
                  <h6>查询</h6>
                </div>
                <Select
                  //filterOptions={filterOptions}
                  options={options}
                  isMulti={true}
                  isSearchable={true}
                  placeholder={"搜索公司..."}
                  onChange={this.handleChange}
                  closeMenuOnSelect={false}
                  className="home-select"
                />
              </div>
              <div className="col-md-3">
                <div className="home-panel-title">
                  <h6>&nbsp;</h6>
                </div>

                <button
                  style={{
                    width: "100px",
                    backgroundColor: "#4c85ce",
                    color: "white"
                  }}
                >
                  选定
                </button>
              </div>
            </div>
          </div>
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
