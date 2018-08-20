/**
 * Date: 2018/08/14
 * Author: Ben huang
 */

import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class LandscapeNavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    /**
     * style = {
     *      container: {
                grid-template-columns: repeat(12, 1fr);
            }
       }

        items = [
            {
                style: {
                    grid-area: item1;
                },
                path: "/home/apple",
                label: "apple"
            },
            {
                style: {
                    grid-area: item2;
                }
                path: "/home/pear",
                label: "pear"
            }
        ]
     * @returns {*}
     */
    render() {
        let {style, items} = this.props;

        return (
            <ul style={style.container} className="lsnavbar-container">
                {items.map((item, i) =>
                    <li key={i} style={item.style} className="lsnavbar-item">
                        <NavLink activeClassName="selected" exact to={item.path}>{item.label}</NavLink>
                    </li>
                )}
            </ul>
        );
    }
}

export default LandscapeNavBar;
