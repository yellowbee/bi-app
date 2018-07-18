/**
 * Created by bhuang on 3/4/18.
 */

import React, { Component } from "react";
import "../../css/image.scss";

class TextArea extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {name, publicId, imgUrl, deleteImage } = this.props;
        return (
            <div className="image">
                <img src={imgUrl} />
                <div className="circle-cross" onClick={() => {
                    deleteImage(name, publicId);
                }}>X</div>
            </div>
        );
    }
}

export default TextArea;

