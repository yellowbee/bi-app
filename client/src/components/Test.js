import React, { Component } from "react";
import TreeMenuNode from './widgets/TreeMenuNode';

class Test extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <TreeMenuNode menuName="测试">
                </TreeMenuNode>
                <div>world</div>
                <div>world</div>
                <div>world</div>
                <div>world</div>
            </div>
        );
    }
}

export default Test;
