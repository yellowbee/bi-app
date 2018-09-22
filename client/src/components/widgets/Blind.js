/**
 * Date: 2018/09/21
 * Author: Ben huang
 */

import React, { Component } from "react";

class Blind extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  render() {
    let label = this.state.expanded ? "-" : "+";
    return (
      <div>
        <div className="bi-blind__bar">
          <div className="bi-blind__desc">
            {this.props.index}.{this.props.title}
          </div>
          <div
            className="bi-blind__btn"
            onClick={() => {
              this.setState({ expanded: !this.state.expanded });
            }}
          >
            <span className="bi-blind__btn__label">{label}</span>
          </div>
        </div>
        {this.state.expanded && (
          <div className="bi-blind__content">{this.props.children}</div>
        )}
      </div>
    );
  }
}

export default Blind;
