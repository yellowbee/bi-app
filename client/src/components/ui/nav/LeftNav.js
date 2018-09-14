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
          <div>企业分析</div>
        <ul>
          <li className="left-nav--item">
            <NavLink activeClassName="selected" to="/home/main-shares">
              公司选定
            </NavLink>
          </li>
          <li className="left-nav--item">
            <NavLink activeClassName="selected" to="/home/param-query">
              公司指标查询与分析
            </NavLink>
          </li>
          <li className="left-nav--item">
            <NavLink activeClassName="selected" to="/home/param-prediction">
              自助式指标预测
            </NavLink>
          </li>
          <li className="left-nav--item">
            <NavLink activeClassName="selected" to="/home/accounting-info">
              企业会计信息质量
            </NavLink>
          </li>
          <li className="left-nav--item">
            <NavLink activeClassName="selected" to="/home/estimation">
              企业估值
            </NavLink>
          </li>
          <li className="left-nav--item">
            <NavLink activeClassName="selected" to="/home/report">
              一键报告生成
            </NavLink>
          </li>
        </ul>
        <ul>
          <li className="left-nav--item">
            <a href="#basic-info">我的</a>
          </li>
          <li className="left-nav--item">
            <a href="#basic-info">资讯</a>
          </li>
          <li className="left-nav--item">
            <a href="#basic-info">排行榜</a>
          </li>
          <li className="left-nav--item">
            <a href="#basic-info">贴吧</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default LeftNav;
