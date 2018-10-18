import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class HandyNav extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{paddingTop: "20px"}}>
        <div>进入:</div>
        <ul className="hdnav">
          <li className="hn-item">
            <NavLink activeClassName="selected" to="/home/param-query">
              公司指标查询与分析
            </NavLink>
          </li>
          <li className="hn-item">
            <NavLink activeClassName="selected" to="/home/param-prediction">
              自助式指标预测
            </NavLink>
          </li>
          <li className="hn-item">
            <NavLink activeClassName="selected" to="/home/accounting-info">
              企业会计信息质量
            </NavLink>
          </li>
          <li className="hn-item">
            <NavLink activeClassName="selected" to="/home/estimate">
              企业估值
            </NavLink>
          </li>
          <li className="hn-item">
            <NavLink activeClassName="selected" to="/home/report">
              一键报告生成
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }
}

export default HandyNav;
