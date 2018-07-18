/**
 * Created by bhuang on 7/1/18.
 */
/**
 * Created by bhuang on 6/26/18.
 */
import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import moment from "moment";
import "../../../../../css/schedule/ProposalCard.scss";
import "../../../../../qureative-ui/css/radio-group.scss";

class ProposalCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radioGroup: [false, false, false]
    };

    this.radioCallback = this.radioCallback.bind(this);
  }

  radioCallback(i) {
    let radioGroup = this.state.radioGroup.map((item, j) => {
      return i === j;
    });

    this.setState({ radioGroup });
  }

  render() {
    let {
        _id,
      status,
      qid,
      proposedBy,
      proposedTo,
      description,
      timeOptions
    } = this.props.proposal;

    return (
      <div className="proposalcard">
        <div>By {proposedBy}</div>
        <div>To {proposedTo}</div>
        <Link to={`/question-pool/question-detail/${qid}`}>
          Link to the question
        </Link>
          { status == 'pending' &&
            <span className="proposal-status proposal-pending">
            {status}
            </span>
          }
          { status == 'rejected' &&
          <span className="proposal-status proposal-rejected">
            {status}
            </span>
          }
          { status == 'accepted' &&
          <span className="proposal-status proposal-accepted">
            {status}
            </span>
          }

        <div className="proposal-desc">{description}</div>

        <div className="radio-group">
          {timeOptions.map((option, i) => (
            <div className="radio-item">
                { status !== 'rejected' && status !== 'accepted' &&
                    <div
                        className="halo"
                        onClick={() => {
                            this.radioCallback(i);
                        }}
                    >
                        {this.state.radioGroup[i] && <div className="sun"/>}
                    </div>
                }
              <div className="radio-label" style={{ fontSize: "0.8em" }}>
                <span>
                  {moment(option.startTime).format("YYYY/MM/DD")} &nbsp;&nbsp;
                </span>
                <span>{moment(option.startTime).format("LT")} - </span>
                <span>{moment(option.endTime).format("LT")}</span>
              </div>
            </div>
          ))}
        </div>
          {/* if proposal is in permanent status OR user is the author of the proposal, don't show buttons */}
          { status !== 'rejected' && status !== 'accepted' && (proposedBy !== this.props.auth.userName) &&
              <div className="proposal-btns">
                  <button
                      className="proposal-btn"
                      style={{backgroundColor: "white", color: "gray"}}
                      onClick={() => {
                          this.props.openDialog(_id, false);
                      }}
                  >
                      Not interested
                  </button>
                  <button className="proposal-btn"
                          onClick={() => {
                              this.props.openDialog(_id, true);
                          }}
                  >
                      Hire
                  </button>
              </div>
          }
      </div>
    );
  }
}

let mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(ProposalCard);
