/**
 * Created by bhuang on 7/12/18.
 */

import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import SearchBar from "./widgets/SearchBar";
import { setToken } from "../actions/action_auth";

class Home extends Component {
    constructor(props) {
        super(props);
        this.hideInnderDiv = this.hideInnderDiv.bind(this);
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
    }

    /**
     * To catch bubbled up click events from children to close their dropdowns
     */
    hideInnderDiv(e) {
        console.log("root container clicked");
        let doms = document.getElementsByClassName("select-dropdown");
        for (let i = 0; i < doms.length; i++) {
            if (doms[i] != e.target.nextSibling) {
                doms[i].classList.remove("show");
                doms[i].classList.add("hide");
            }
        }
    }

    render() {
        console.log(this.props.state);
        return (
            <div className="home" onClick={this.hideInnderDiv}>
                <div className="container container-full-width">
                    <div className="row row-full-width">
                        <div className="col home-sidebar" style={{borderRight: "1px solid gray"}}>
                            <div className="home-logo">
                                <span className="bi-logo horizontal-2" />
                                <h6 className="bi-title horizontal-2">企业分析软件</h6>
                            </div>
                            <SearchBar placeholder="简称 / 代码 / 拼音"/>
                            <ul>
                                <li>
                                    <a href="#basic-info">企业分析</a>
                                </li>
                                <li>
                                    <a href="#self-intro">资讯</a>
                                </li>
                                <li>
                                    <a href="#work-exp">我的</a>
                                </li>
                                <li>
                                    <a href="#contact-method">股吧</a>
                                </li>
                            </ul>
                        </div>

                        <div className="col home-workspace">
                            <NavLink exact to="/">
                                <div>登出</div>
                            </NavLink>

                            <div className="home-panel-title">
                                <h6>行情中心</h6>
                            </div>
                            <div>
                                <div className="h7">代码搜索:</div>
                            <SearchBar placeholder="简称 / 代码 / 拼音"/>
                            </div>
                        </div>
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

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Home)
);

