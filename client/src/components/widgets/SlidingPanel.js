/**
 * Date: 2018/08/14
 * Author: Ben huang
 */

import React, { Component } from "react";

class SlidingPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    }
  }

  render() {
    let wrapperClass = this.state.show ? "sp-wrapper sp-show" : "sp-wrapper sp-hide";
    let handleArrow = this.state.show ? "/images/arrow-right.png" : "/images/arrow-left.png";
    return (
      <div className={wrapperClass}>
        <div className="sp-panel">{this.props.children}</div>
        <div className="sp-handle" onClick={() => {
            let show = !this.state.show;
            this.setState({show: show})
        }}>
          <div className="sp-handle-label">
            <div>高</div>
            <div>级</div>
            <div>选</div>
            <div>项</div>
          </div>
          <img src={handleArrow}/>
        </div>
      </div>
    );
  }
}

export default SlidingPanel;
