import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class LeftNav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div>
          <img
            className="left-navbar__icon"
            src="/images/enterprise-analysis.svg"
          />
          企业分析
        </div>
        <ul>
          <li className="left-nav__item">
            <NavLink
              activeClassName="selected"
              to="/home/main-shares"
              className="left-nav__link--sub"
            >
              公司选定
            </NavLink>
          </li>
          <li className="left-nav__item">
            <NavLink
              activeClassName="selected"
              to="/home/param-query"
              className="left-nav__link--sub"
            >
              公司指标查询与分析
            </NavLink>
          </li>
          <li className="left-nav__item">
            <NavLink
              activeClassName="selected"
              to="/home/param-prediction"
              className="left-nav__link--sub"
            >
              自助式指标预测
            </NavLink>
          </li>
          <li className="left-nav__item">
            <NavLink
              activeClassName="selected"
              to="/home/accounting-info"
              className="left-nav__link--sub"
            >
              企业会计信息质量
            </NavLink>
          </li>
          <li className="left-nav__item">
            <NavLink
              activeClassName="selected"
              to="/home/estimate"
              className="left-nav__link--sub"
            >
              企业估值
            </NavLink>
          </li>
          <li className="left-nav__item">
            <NavLink
              activeClassName="selected"
              to="/home/report"
              className="left-nav__link--sub"
            >
              一键报告生成
            </NavLink>
          </li>
        </ul>
        <ul>
          <li className="left-nav__item">
            <NavLink activeClassName="selected" to="/home/my">
              <img className="left-navbar__icon" src="/images/me.svg" />我的
            </NavLink>
          </li>
          <li className="left-nav__item">
            <NavLink activeClassName="selected" to="/home/emotion">
              <img className="left-navbar__icon" src="/images/emotion.svg" />投资者情绪
            </NavLink>
          </li>
          <li className="left-nav__item">
            <NavLink activeClassName="selected" to="/home/info">
              <img className="left-navbar__icon" src="/images/info.svg" />资讯
            </NavLink>
          </li>
          <li className="left-nav__item">
            <NavLink activeClassName="selected" to="/home/ranking">
              <img
                className="left-navbar__icon"
                src="/images/comapny-ranking.svg"
              />排行榜
            </NavLink>
          </li>
          <li className="left-nav__item">
            <NavLink activeClassName="selected" to="/home/chat">
              <img className="left-navbar__icon" src="/images/chat.svg" />贴吧
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }
}

export default LeftNav;
