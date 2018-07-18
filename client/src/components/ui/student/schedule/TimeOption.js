/**
 * This component is a time option in the HelpProposal UI.
 *
 * Created by bhuang on 6/29/18.
 */

import React, { Component } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import "../../../../../css/schedule/TimeOption.scss";

class TimeOption extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { label, id, startTime, endTime, removeOption } = this.props;
    return (
      <div className="time-option">
        <div>Option {label}</div>
        <div>
          <span>{moment(startTime).format("YYYY-MM-DD")} &nbsp;&nbsp;</span>
          <span>{moment(startTime).format("LT")} - </span>
          <span>{moment(endTime).format("LT")}</span>
        </div>
        <span className="x" onClick={() => {removeOption(id);}}>X</span>
      </div>
    );
  }
}

export default TimeOption;
