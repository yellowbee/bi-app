/**
 * Created by bhuang on 2/23/18.
 */

import React, {Component} from 'react';
import { Field } from "redux-form";
import '../../css/select.scss';

class SelectDropdown extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.onClickBackgroud = this.onClickBackgroud.bind(this);
    }

    componentDidMount() {
        this.refs['orig-select'].value = 'select';
    }

    onClick(e) {
        e.stopPropagation();
        console.log('select clicked');
        if (this.refs['dropdown'].className.includes('show')) {
            this.refs['dropdown'].className = "select-dropdown hide";
        } else {
            this.refs['dropdown'].className = "select-dropdown show";
        }
    }

    onClickBackgroud(e) {
        e.stopPropagation();
        console.log('bg clicked');
        this.refs['dropdown'].className = "select-dropdown hide";
    }

    render() {
        return (
            <div onClick={this.onClickBackgroud}>
                <h4 className="field-title">Creative Categories</h4>
                <div className="custom-select">
                    <div className="select-div" ref="orig-select">
                        <div style={{position: "relative", top: "25px", left: "20px"}} onClick={this.onClick}></div>
                        <div name="categories"  onClick={this.onClick}>
                            <option />
                            <option value="ff0000">All Industries</option>
                            <option value="00ff00">Architecture</option>
                            <option value="0000ff">Art Direction</option>
                            <option value="0000ff">Branding</option>
                            <option value="0000ff">Fashion</option>
                            <option value="0000ff">Graphic Design</option>
                            <option value="0000ff">Illustration</option>
                            <option value="0000ff">Industrial Design</option>
                            <option value="0000ff">Interaction Design</option>
                            <option value="0000ff">Motion Graphics</option>
                            <option value="0000ff">Photography</option>
                            <option value="0000ff">UI/UX</option>
                            <option value="0000ff">Web Design</option>
                        </div>
                    </div>
                    <div className="select-dropdown" ref="dropdown">
                        <div className="select-item" value="ff0000">All Industries</div>
                        <div className="select-item" value="00ff00">Architecture</div>
                        <div className="select-item" value="0000ff">Art Direction</div>
                        <div className="select-item" value="0000ff">Branding</div>
                        <div className="select-item" value="0000ff">Fashion</div>
                        <div className="select-item" value="0000ff">Graphic Design</div>
                        <div className="select-item"  value="0000ff">Illustration</div>
                        <div className="select-item"  value="0000ff">Industrial Design</div>
                        <div className="select-item" value="0000ff">Interaction Design</div>
                        <div className="select-item" value="0000ff">Motion Graphics</div>
                        <div className="select-item" value="0000ff">Photography</div>
                        <div className="select-item" value="0000ff">UI/UX</div>
                        <div className="select-item" value="0000ff">Web Design</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SelectDropdown;
