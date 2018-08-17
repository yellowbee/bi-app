/**
 * Date: 2018/08/15
 * Author: Ben huang
 */

import React, { Component } from "react";
import Select from "react-select";
import options from "../../../../json/quarters";
import peerOptions from "../../shanghai-a-share";
import "../../../../qureative-ui/css/radio-group.scss";

const typeOptions = ["一季报", "半年报", "三季报", "年报"];

class AdvancedConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radioGroup: [false, false, false, false]
    };
    this.radioCallback = this.radioCallback.bind(this);
    this.handlePeerChange = this.handlePeerChange.bind(this);
  }

  radioCallback(i) {
    let radioGroup = this.state.radioGroup.map((item, j) => {
      return i === j;
    });

    this.setState({ radioGroup });
  }

  handlePeerChange(selectedOptions) {
      //this.props.setMainShares(selectedOptions);
  }

  render() {
    return (
      <div>
        <form onSubmit={e => {
          e.preventDefault();
        }}>
          <div className="ac-qtr">
            <div className="ac-title">时间设置</div>
            <div className="qtr-selector-container">
              <div className="qtr-selector-ele">
                <Select
                  options={options}
                  isMulti={false}
                  isSearchable={false}
                  placeholder={"开始年与季报..."}
                  onChange={this.props.handleChange}
                  closeMenuOnSelect={true}
                  className="ac-select"
                  classNamePrefix="ac-select"
                />
              </div>
              <div className="ac-text">至</div>
              <div className="qtr-selector-ele">
                <Select
                  options={options}
                  isMulti={false}
                  isSearchable={false}
                  placeholder={"开始年与季报..."}
                  onChange={this.props.handleChange}
                  closeMenuOnSelect={true}
                  className="ac-select"
                  classNamePrefix="ac-select"
                />
              </div>
            </div>
          </div>

          <div className="ac-type">
            <div className="ac-title">类别设置</div>
            <div className="radio-group">
              {typeOptions.map((option, i) => (
                <div className="radio-item">
                  {status !== "rejected" &&
                    status !== "accepted" && (
                      <div
                        className="halo"
                        onClick={() => {
                          this.radioCallback(i);
                        }}
                      >
                        {this.state.radioGroup[i] && <div className="sun" />}
                      </div>
                    )}
                  <div className="radio-label" style={{ fontSize: "0.6em" }}>
                    {option}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="ac-peer">
            <div className="ac-title">添加对比公司</div>
            <Select
              options={peerOptions}
              isMulti={true}
              isSearchable={true}
              placeholder={"简称/代码"}
              onChange={this.handlePeerChange}
              closeMenuOnSelect={false}
              classNamePrefix="ac-peer"
            />
          </div>

          <div className="ac-submit">
            <button className="bi-button" type="submit">保存设置</button>
          </div>
        </form>
      </div>
    );
  }
}

export default AdvancedConfig;
