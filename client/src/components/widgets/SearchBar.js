/**
 * Created by bhuang on 7/17/18.
 */

import React, { Component } from "react";

class SearchBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="bi-searchbar">
                <div>
                    <input placeholder={this.props.placeholder} className="bi-input"/>
                </div>
                <img src="/images/magnifier.png"
                     className="bi-searchbar-img"/>
            </div>
        );
    }
}

export default SearchBar;

