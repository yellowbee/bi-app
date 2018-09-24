/**
 * Date: 2018/09/22
 * Author: Ben huang
 */

import React, { Component } from "react";

class CompanyInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let {
      code,
      reg_addr,
      chairman,
      list_addr,
      list_date,
      ind,
      ceo
    } = this.props.info;

    return (
      <div className="intro">
        <div className="intro__item1 intro__item">
          <span className="intro__label">公司名称(股票代码):</span> {code}
        </div>
        <div className="intro__item2 intro__item">
          <span className="intro__label">实际控制人:</span> {chairman}
        </div>
        <div className="intro__item3 intro__item">
          <span className="intro__label">公司注册地址:</span> {reg_addr}
        </div>
        <div className="intro__item4 intro__item">
          <span className="intro__label">董事长:</span> {chairman}
        </div>
        <div className="intro__item5 intro__item">
          <span className="intro__label">上市地点(交易所):</span> {list_addr}
        </div>
        <div className="intro__item6 intro__item">
          <span className="intro__label">总经理:</span> {ceo}
        </div>
        <div className="intro__item7 intro__item">
          <span className="intro__label">上市年度:</span>
        </div>
        <div className="intro__item8 intro__item">
          <span className="intro__label">所在行业(行业名称和代码):</span> {ind}
        </div>
      </div>
    );
  }
}

export default CompanyInfo;
