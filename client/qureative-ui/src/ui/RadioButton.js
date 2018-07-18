/**
 * Created by bhuang on 2/24/18.
 */
import React, { Component } from "react";
import { connect } from 'react-redux';

const RadioButton = ({label, name, id, value, onClick, form}) => {
        return (
            <li
            >
                <input onChange={() => {
                    onClick(name, id, value);
                }} type="radio" name={name} label={label} value={value} id={id} checked={form[name] && form[name][id]}/>
                <label htmlFor={id}>{label}</label>
                <div className="check"/>
            </li>
        );
};

export default RadioButton;
