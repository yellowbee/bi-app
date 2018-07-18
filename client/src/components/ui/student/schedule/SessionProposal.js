/**
 * This component is located in the question detail page to let a user propose
 * a set of time slots for offering help.
 *
 * Created by bhuang on 6/29/18.
 */

import React, { Component } from "react";
import { connect } from "react-redux";
import uuidv1 from "uuid/v1";
import axios from "axios";
import DatePicker from "react-datepicker";
import moment from "moment";
import TimeOption from "./TimeOption";
import _ from "lodash";
import { API_ROOT_URL } from "../../../../../src/constants";
import "react-datepicker/dist/react-datepicker.css";
import "../../../../../qureative-ui/css/textarea.scss";
import "../../../../../qureative-ui/css/input-text.scss";
import "../../../../../css/schedule/SessionProposal.scss";

class SessionProposal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeOptions: [],
      //date: moment(),
      startTime: moment(),
      endTime: moment()
    };

    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    //this.handleDateChange = this.handleDateChange.bind(this);
    this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
    this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
    this.removeOption = this.removeOption.bind(this);
    this.validateData = this.validateData.bind(this);
  }

  handleDescriptionChange(description) {
    this.setState({ description });
  }
  /*handleDateChange(date) {
    console.log('date | ' + date.toString());
    this.setState({
      date
    });
  }*/
  handleStartTimeChange(startTime) {
    let errors = this.validateData();
    this.setState({
      errors,
      startTime
    });
  }
  handleEndTimeChange(endTime) {
    console.log("end time | " + endTime.toString());
    this.setState({
      endTime
    });
  }
  removeOption(id) {
    let timeOptions = this.state.timeOptions.filter(option => option.id != id);
    this.setState({ timeOptions });
  }

  validateData() {
    let errors = {};

    if (this.state.timeOptions.length <= 0) {
        errors.timeOptions = "You need to have at least one time option";
    }

    if (_.isEmpty(this.state.description)) {
        errors.description = "You need a description";
    }

    return errors;
  }

  render() {
    return (
      <div className="schedule-proposal">
        <div className="schedule-label">You can provide up to 3 time options</div>
        <div className="text-area">
          <textarea
            className="qureative-ui-ta"
            placeholder="Add anything you want to say here"
            value={this.state.description}
            onChange={e => {
              this.handleDescriptionChange(e.target.value);
            }}
          />
        </div>
        <div style={{ color: "red" }}>
          {this.state.errors && this.state.errors.description}
        </div>

        <div className="schedule-date-time">
          <div className="time-picker">
            <div className="label">Pick start time: </div>
            <div className="datepicker">
              <DatePicker
                selected={this.state.startTime}
                onChange={this.handleStartTimeChange}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="LLL"
                timeCaption="time"
              />
            </div>
          </div>
          <div className="time-picker">
            <div className="label">Pick end time:&nbsp;</div>
            <div className="datepicker">
              <DatePicker
                selected={this.state.endTime}
                onChange={this.handleEndTimeChange}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="LLL"
                timeCaption="time"
              />
            </div>
          </div>
          <div className="add-time">
            <span
              onClick={() => {
                let timeOptions = this.state.timeOptions;
                if (timeOptions.length > 2) {
                  return;
                }
                timeOptions.push({
                  id: uuidv1(),
                  startTime: this.state.startTime.toDate().toJSON(),
                  endTime: this.state.endTime.toDate().toJSON()
                });
                this.setState({ timeOptions });
              }}
            >
              +
            </span>
          </div>
          <div className="time-options">
            {this.state.timeOptions.map((option, i) => (
              <TimeOption
                key={i}
                label={i + 1}
                removeOption={this.removeOption}
                {...option}
              />
            ))}
          </div>
          <div style={{ color: "red" }}>
            {this.state.errors && this.state.errors.timeOptions}
          </div>
        </div>
        <button
          className="proposal-btn"
          onClick={e => {
            e.preventDefault();
            let errors = this.validateData();
            this.setState({ errors });
            if (_.isEmpty(errors)) {
              let payload = {
                status: "pending",
                qid: this.props.qid,
                proposedBy: this.props.auth.userName,
                proposedTo: this.props.proposedTo,
                description: this.state.description,
                timeOptions: this.state.timeOptions
              };
              axios
                //.post(`${URL_ROOT}/schedule`, payload)
                .post(`${API_ROOT_URL}/api/proposal`, payload)
                .then(response => {
                  console.log(response);
                  this.setState({
                    timeOptions: [],
                    startTime: moment(),
                    endTime: moment(),
                    description: ""
                  });
                });
            }
          }}
        >
          Offer Help
        </button>
      </div>
    );
  }
}

let mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(SessionProposal);
