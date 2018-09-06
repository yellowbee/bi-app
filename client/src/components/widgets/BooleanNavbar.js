/**
 * Date: 2018/08/14
 * Author: Ben huang
 */

import React, { Component } from "react";

class BooleanNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItems: [true, false, false, false, false, false]
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
    let { style, items } = this.props;

    return (
      <ul style={style.container} className="bool-navbar">
        {items.map((item, i) => (
          <li
            key={i}
            style={item.style}
            className={this.state.menuItems[i] ? "bool-navbar__item bool-navbar__item--selected" : "bool-navbar__item"}
            onClick={() => {
                let menuItems = this.state.menuItems.map((item, j) => {
                    return j === i;
                });
                this.setState({menuItems});
                this.props.updateNavbar(menuItems);
            }}
          >
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    );
  }
}

export default BooleanNavbar;
