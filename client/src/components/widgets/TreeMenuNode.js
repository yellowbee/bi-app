import React, { Component } from "react";

class TreeMenuNode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayChildren: 'block'
    };
  }

  render() {
    return (
        <div
        onClick={e => {
          if (this.state.displayChildren === 'none') {
            this.setState({ displayChildren: 'block' });
          } else {
              this.setState({ displayChildren: 'none' });
          }
          e.stopPropagation();
        }}
        style={{
          width: "100px",
          height: "30px",
          border: "1px solid gray"
        }}
      >
        <div>{this.props.menuName}</div>

          <div
            onClick={e => {
              e.stopPropagation();
            }}
          >
              <div>TEST</div>
              <div>TEST</div>
              <div>TEST</div>
              <div>TEST</div>
              <div>TEST</div>
          </div>
      </div>
    );
  }
}

export default TreeMenuNode;
