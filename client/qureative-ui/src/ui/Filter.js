/**
 * UI widget filter
 * Created by bhuang on 7/3/18.
 */

import React, { Component } from "react";
import "../../css/filter.scss";

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.onClickSelected = this.onClickSelected.bind(this);
    this.hideDropdown = this.hideDropdown.bind(this);
  }

  componentDidMount() {
    //this.refs["dropdown"].className = "select-dropdown hide";

    let itemToggle = new Array(this.props.itemList.length);
    itemToggle.fill(false);
    this.setState({ itemToggle });
  }

  onClickSelected(e) {
      e.target.nextSibling.classList.toggle("show");
      e.target.nextSibling.classList.toggle("hide");
  }

  hideDropdown() {
    this.refs["dropdown"].className = "select-dropdown hide";
  }

  render() {
    let { title, itemList } = this.props;

    return (
      <div className="dropdown">
        <div
          className="selected-item"
          ref="selected"
          id="qureative-dropdown-selected"
          onClick={this.onClickSelected}
        >
          {title}
        </div>
        <div
          className="select-dropdown hide"
          ref="dropdown"
          id="qureative-dropdown-list"
        >
          {itemList.map((item, i) => (
            <div
              key={i}
              className="select-item"
              onClick={e => {
                let itemToggle = this.state.itemToggle;
                itemToggle[i] = !itemToggle[i];
                this.setState(itemToggle);
                this.props.updateFilterTags(item, itemToggle[i]);
                e.stopPropagation();
              }}
            >
              {this.state.itemToggle && this.state.itemToggle[i] && (
                <span className="dingbats" style={{ color: "blue" }}>
                  &#x2714;
                </span>
              )}&nbsp;&nbsp;&nbsp;&nbsp;
              {item}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Filter;
