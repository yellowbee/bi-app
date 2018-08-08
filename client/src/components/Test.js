import React, { Component } from "react";
import TreeMenuNode from "./widgets/TreeMenuNode";
import TreeMenuRoot from "./widgets/TreeMenuRoot";

class Test extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{width: "100px", height: "30px"}}>
        <TreeMenuRoot>
          <TreeMenuNode nodeName="测试">
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
            <TreeMenuNode nodeName="测试2">
              <div>hi</div>
              <div>hi</div>
              <div>hi</div>
            </TreeMenuNode>
          </TreeMenuNode>
          <div style={{ display: "block" }}>world</div>
        </TreeMenuRoot>
      </div>
    );
  }
}

export default Test;
