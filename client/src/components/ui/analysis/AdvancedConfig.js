/**
 * Date: 2018/08/15
 * Author: Ben huang
 */

import React, { Component } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import { setParamAnalysis } from "../../../actions/action_analysis_config";
import options from "../../../../json/quarters";
import peerOptions from "../../shanghai-a-share";
import "../../../../qureative-ui/css/radio-group.scss";
import Alert from "../../widgets/Alert";
import { qtrType } from "../../../constants";

const typeOptions = ["一季报", "半年报", "三季报", "年报"];
const qtrTypeEnum = [qtrType.FIRST, qtrType.MID, qtrType.THIRD, qtrType.YEAR];

class AdvancedConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peers: this.props.state.paramAnalysis.peers,
      radioGroup: [
          this.props.state.paramAnalysis.qtrType === 0,
          this.props.state.paramAnalysis.qtrType === 1,
          this.props.state.paramAnalysis.qtrType === 2,
          this.props.state.paramAnalysis.qtrType === 3
      ]
    };
    this.radioCallback = this.radioCallback.bind(this);
    this.handlePeerChange = this.handlePeerChange.bind(this);
  }

  radioCallback(i) {
    let radioGroup = this.state.radioGroup.map((item, j) => {
      return i === j;
    });

    this.setState({ radioGroup, qtrType: qtrTypeEnum[i] });
  }

  handlePeerChange(selectedOptions) {
    //let oldParamAnalysis = this.props.state.analysisConfig.paramAnalysis;
    //this.props.setParamAnalysis({peers: selectedOptions});
    this.setState({ peers: selectedOptions });
  }

  render() {
    return (
      <div>
        <form
          onSubmit={e => {
            e.preventDefault();
            this.props.setParamAnalysis({ peers: this.state.peers, qtrType: this.state.qtrType });
            this.props.updateQtrType(this.state.qtrType);
            this.props.updateData(undefined, this.state.peers);
            this.refs.myAlert.success("设置保存成功!", 2000);
          }}
        >
          <div className="ac-qtr">
            <div className="ac-title">时间设置</div>
            <div className="qtr-selector-container">
              <div className="qtr-selector-ele">
                <Select
                  options={options}
                  isMulti={false}
                  isSearchable={false}
                  placeholder={"开始年与季报..."}
                  onChange={() => {}}
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
                  onChange={() => {}}
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
                  <div
                    className="halo"
                    onClick={() => {
                      this.radioCallback(i);
                    }}
                  >
                    {this.state.radioGroup[i] && <div className="sun" />}
                  </div>
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
              defaultValue={this.state.peers}
              closeMenuOnSelect={false}
              classNamePrefix="ac-peer"
            />
          </div>

          <div className="ac-submit">
            <button className="ac-button" type="submit">
              确认设置
            </button>
          </div>
        </form>

        <Alert ref="myAlert" />
      </div>
    );
  }
}

let mapStateToProps = state => ({
  state: state
});

let mapDispatchToProps = dispatch => ({
  setParamAnalysis: value => {
    dispatch(setParamAnalysis(value));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdvancedConfig);
