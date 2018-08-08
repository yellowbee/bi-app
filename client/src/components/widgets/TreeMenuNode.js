import React, { Component } from "react";

class TreeMenuNode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayChildren: this.props.expandAtOpen ? "block" : "none"
    };
  }

  render() {
    return (
      <div>
        <div
          onClick={e => {
            if (this.state.displayChildren === "none") {
              this.setState({ displayChildren: "block" });
            } else {
              this.setState({ displayChildren: "none" });
            }
            e.stopPropagation();
          }}
        >
          <img
            src={this.state.displayChildren === "none" ? "/images/right_arrow.png" : "/images/down_arrow.png"}
            style={{ display: "inline-block", width: "10px", height: "10px" }}
          />{" "}
          {this.props.nodeName}
        </div>

        <div
          onClick={e => {
            e.stopPropagation();
          }}
          style={{
            display: this.state.displayChildren,
            position: "relative",
            left: "10px"
          }}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default TreeMenuNode;
