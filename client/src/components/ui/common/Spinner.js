/**
 * Created by bhuang on 7/12/18.
 */

/**
 * Created by bhuang on 4/27/18.
 */
import React, { Component } from "react";

class Spinner extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <img src="/images/spinner.gif" style={{width: "100px", height: "100px"}} />
            </div>
        );
    }
}

export default Spinner;

