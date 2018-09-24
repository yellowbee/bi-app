/**
 * Date: 2018/09/21
 * Author: Ben huang
 */

import React, { Component } from "react";

class Blind extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: this.props.extendedAtRender
    };
  }

  render() {
    let label = this.state.expanded ? "-" : "+";
    return (
      <div className="bi-blind">
        <div className="bi-blind__bar">
          <div className="bi-blind__desc">
            {this.props.index}.{this.props.title}
          </div>
          <div
            className="bi-blind__btn"
            onClick={() => {
              if (!this.state.expanded && this.props.callback) {
                this.props.callback();
              }
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
