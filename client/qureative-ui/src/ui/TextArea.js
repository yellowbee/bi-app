/**
 * Created by bhuang on 2/25/18.
 */

import React, { Component } from "react";
import "../../css/textarea.scss";

class TextArea extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { name, id, value, deleteTextBlock, setTextBlockText } = this.props;
        return (
            <div className="text-area" >
                <textarea name={name} rows="4" value={value} onChange={(e) => {
                    setTextBlockText(name, id, e.target.value);
                }}/>
                <div className="circle-cross" onClick={() => {
                    deleteTextBlock(name, id);
                }}>X</div>
            </div>
        );
    }
}

export default TextArea;
