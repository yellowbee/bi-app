/**
 * Created by bhuang on 2/24/18.
 */

import React, { Component } from "react";
import DropdownItem from "./DropdownItem";
import "../../css/dropdown-list.scss";

class DropdownList extends Component {
  constructor(props) {
    super(props);
    this.onClickSelected = this.onClickSelected.bind(this);
    this.hideDropdown = this.hideDropdown.bind(this);
  }

  componentDidMount() {
    this.refs["dropdown"].className = "select-dropdown hide";
  }

  onClickSelected() {
    if (this.refs["dropdown"].className == "select-dropdown hide") {
      this.refs["dropdown"].className = "select-dropdown show";
    } else {
      this.refs["dropdown"].className = "select-dropdown hide";
    }
  }

  hideDropdown() {
    this.refs["dropdown"].className = "select-dropdown hide";
  }

  render() {
    let { value, itemList } = this.props;

    /*<div className="select-item" value={item.value} onClick={this.onClickItem}>
       {item.label}
       </div>*/
    return (
      <div className="dropdown">
        <div
          className="selected-item"
          ref="selected"
          id="qureative-dropdown-selected"
          onClick={this.onClickSelected}
        >
          {value || "Category"}
        </div>
        <div className="select-dropdown" ref="dropdown" id="qureative-dropdown-list">
          {itemList.map((item, i) => (
            <DropdownItem {...item} key={i} hideDropdown={this.hideDropdown} />
          ))}
        </div>
      </div>
    );
  }
}

export default DropdownList;
