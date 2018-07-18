/**
 * Created by bhuang on 2/24/18.
 */

/**
 * Created by bhuang on 2/24/18.
 */
import React, { Component } from "react";
import { connect } from 'react-redux';

const DropdownItem = ({form, id, name, label, value, setCategories, hideDropdown}) => {
    let onClick = () => {
        setCategories(name, value);
        hideDropdown();
    }

    return (
        <div className="select-item" value={value} onClick={onClick}>
            {label}
        </div>
    );
};

export default DropdownItem;
