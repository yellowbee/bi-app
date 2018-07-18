/**
 * Created by bhuang on 7/1/18.
 */

import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import ProposalCard from "./ProposalCard";
import Filter from "../../../../../qureative-ui/src/ui/Filter";
import SimpleDropdownList from "../../../../../qureative-ui/src/ui/SimpleDropdownList";
import axios from "axios";
import ReactModal from "react-modal";
import { LOCAL_API_ROOT_URL, API_ROOT_URL } from "../../../../../src/constants";
import "../../../../../css/schedule/Schedule.scss";

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      directionTags: [],
      statusTags: [],
      showDialog: false
    };
    this.getToProposals = this.getToProposals.bind(this);
    this.getProposals = this.getProposals.bind(this);
    this.updateDirectionTags = this.updateDirectionTags.bind(this);
    this.updateStatusTags = this.updateStatusTags.bind(this);
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.updateProposal = this.updateProposal.bind(this);
  }

  getToProposals() {
    axios
      .get(`${API_ROOT_URL}/api/proposals/to/${this.props.auth.userName}`)
      .then(response => {
        console.log("PROFILE RESPONSE");
        console.log(response);
        this.setState({ toProposals: response.data.result });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getProposals() {
    axios
      .get(`${API_ROOT_URL}/api/proposals/${this.props.auth.userName}`)
      .then(response => {
        console.log("PROFILE RESPONSE");
        console.log(response);
        this.setState({ proposals: response.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  updateDirectionTags(tag, on) {
    let directionTags = this.state.directionTags;
    if (on) {
      directionTags.push(tag);
    } else {
      directionTags = directionTags.filter(item => item !== tag);
    }
    this.setState({ directionTags });
  }

  updateStatusTags(tag, on) {
    let statusTags = this.state.statusTags;
    if (on) {
      statusTags.push(tag);
    } else {
      statusTags = statusTags.filter(item => item !== tag);
    }
    this.setState({ statusTags });
  }

  /**
   *
   * @param pid proposal mongodb document id
   * @param hire boolean to indicate to accept or to reject
   */
  openDialog(pid, accept) {
    this.setState({ showDialog: true, onSchedule: { pid, accept } });
  }

  closeDialog() {
    this.setState({ showDialog: false, onSchedule: {} });
  }

  updateProposal() {
      let status = this.state.onSchedule.accept ? 'accepted' : 'rejected';
      axios
          .put(`${API_ROOT_URL}/api/proposal?pid=${this.state.onSchedule.pid}&status=${status}`)
          .then(response => {
              this.getProposals();
              this.closeDialog();
          })
          .catch(err => {
              console.log(err);
              this.closeDialog();
          });
  }

  componentDidMount() {
    //this.getToProposals();
    this.getProposals();
  }

  render() {
    console.log(this.state);

    return (
      <div className="schedule-bg">
        <div className="schedule-panel">
          Schedule
          <div className="schedule-filters">
            <div className="schedule-filter">
              <Filter
                title={"offer/receive"}
                itemList={["offer", "receive"]}
                updateFilterTags={this.updateDirectionTags}
              />
            </div>
            <div className="schedule-filter">
              <Filter
                title={"Status"}
                itemList={["pending", "accepted", "rejected", "completed"]}
                updateFilterTags={this.updateStatusTags}
              />
            </div>
          </div>
          <div className="schedule-cards">
            <div>Proposals being offered to me</div>

            {this.state.proposals &&
              this.state.proposals.receive &&
              this.state.proposals.receive.map(
                toProposal =>
                  (_.isEmpty(this.state.directionTags) ||
                    this.state.directionTags.includes("receive")) &&
                  (_.isEmpty(this.state.statusTags) ||
                    this.state.statusTags.includes(
                      toProposal.status.toLowerCase()
                    )) && (
                    <ProposalCard
                      proposal={toProposal}
                      openDialog={this.openDialog}
                    />
                  )
              )}

            <div>Proposals I am offering</div>
            {this.state.proposals &&
              this.state.proposals.offer &&
              this.state.proposals.offer.map(
                fromProposal =>
                  (_.isEmpty(this.state.directionTags) ||
                    this.state.directionTags.includes("offer")) &&
                  (_.isEmpty(this.state.statusTags) ||
                    this.state.statusTags.includes(
                      fromProposal.status.toLowerCase()
                    )) && (
                    <ProposalCard
                      proposal={fromProposal}
                      openDialog={this.openDialog}
                    />
                  )
              )}
          </div>
        </div>

        <ReactModal
          isOpen={this.state.showDialog}
          contentLabel="onRequestClose Example"
          onRequestClose={this.closeDialog}
          style={{
            overlay: {
              backgroundColor: "rgba(50, 50, 50, 0.7)"
            },
            content: {
              top: "50%",
              left: "50%",
              borderRadius: "10px",
              width: "350px",
              height: "200px",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)"
            }
          }}
        >
          <div className="schedule-dialog">
            {this.state.onSchedule &&
              !this.state.onSchedule.accept && (
                <h5 className="schedule-label">Click OK to reject proposal</h5>
              )}
              {this.state.onSchedule &&
               this.state.onSchedule.accept && (
                  <h5 className="schedule-label">Click OK to accept proposal</h5>
              )}
            <div className="schedule-btns">
              <button className="schedule-btn"
                onClick={() => {
                  this.setState({ onSchedule: {} });
                  this.closeDialog();
                }}
              >
                Cancel
              </button>
              <button className="schedule-btn alert"
                      onClick={this.updateProposal}
              >
                OK
              </button>
            </div>
          </div>
        </ReactModal>
      </div>
    );
  }
}

let mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(Schedule);
