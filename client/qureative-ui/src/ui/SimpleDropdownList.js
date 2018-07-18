/**
 * Simple dropdown list that does not use redux
 *
 * Created by bhuang on 6/15/18.
 */

import React, { Component } from "react";
import "../../css/dropdown-list.scss";

class SimpleDropdownList extends Component {
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
                <div className="select-dropdown" ref="dropdown" id="qureative-dropdown-list">
                    {itemList.map((item, i) => (
                        <div key={i} className="select-item" onClick={() => {
                            this.hideDropdown();
                            this.props.setCategory(item);
                        }}>{item}</div>
                    ))}
                </div>
            </div>
        );
    }
}

export default SimpleDropdownList;
