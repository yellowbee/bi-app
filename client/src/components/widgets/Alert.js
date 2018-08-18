/**
 * Date: 2018/08/18
 * Author: Ben huang
 */

import React, { Component } from "react";

class Alert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
        this.success = this.success.bind(this);
    }

    /**
     * configObj is like {message, timeout}
     * @param configObj
     */
    success(message, timeout) {
        this.setState({show: true, message});
        window.setTimeout(() => {
            this.setState({show: false})
        }, timeout);
    }

    render() {
        let className = this.state.show ? "bi-alert bi-alert-show" : "bi-alert bi-alert-hide";
        return (
            <div className={className}>
                <span>{ this.state.message }</span>
            </div>
        );
    }
}

export default Alert;
