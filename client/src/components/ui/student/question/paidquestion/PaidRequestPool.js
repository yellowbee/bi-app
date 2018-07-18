/**
 * Created by bhuang on 1/15/18.
 */

import React, { Component } from "react";
import axios from "axios";
import QuestionCard from "../../../common/QuestionCard";
import SearchBar from "../../../common/SearchBar";
import DropDownFilter from "../../../common/DropDownFilter";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getQuestions } from "../../../../../actions/action_question";
import Spinner from "../../../common/Spinner";
import { API_ROOT_URL } from "../../../../../../src/constants";
import _ from "lodash";
import "../../../../../../css/student/question/paidquestion/PaidRequestPool.scss";

//const PaidRequestPool = ({questionCards}) => {
class PaidRequestPool extends Component {
  constructor() {
    super();
    this.state = {
      showLogin: false,
      showSignup: false,
      serverPort: localStorage.getItem("server_port")
    };

    //this.handleOpenLogin = this.handleOpenLogin.bind(this);
    //this.handleCloseLogin = this.handleCloseLogin.bind(this);

    //this.handleOpenSignup = this.handleOpenSignup.bind(this);
    //this.handleCloseSignup = this.handleCloseSignup.bind(this);

    this.handlePostQuestion = this.handlePostQuestion.bind(this);
    this.getQuestionCards = this.getQuestionCards.bind(this);
  }

  componentDidMount() {
    //this.props.getQuestions();
      this.getQuestionCards();
  }

  getQuestionCards() {
      this.setState({fetchInProgress: true});
      axios.get(`${API_ROOT_URL}/api/questions`)
          .then((response) => {
              console.log(response.data);
              this.setState({fetchInProgress: false, questionCards: response.data});
          });
  }

  renderQuestionCards() {
    /*return _.map(this.props.questions, q => {
      return <QuestionCard {...q} />;
    });*/

    return this.state.questionCards.map((question) => <QuestionCard {...question} />);

    /*return this.props.questions.map((q) =>
      <QuestionCard {...q} />
    )*/
  }

  handlePostQuestion() {
    if (_.isEmpty(this.state.serverPort) && _.isEmpty(this.props.auth)) {
      this.handleOpenLogin();
    } else {
      this.props.history.push("/new-question/description");
    }
  }

  render() {
    return (
      <div id="q-pool">
        {/*<SearchBar />
        <DropDownFilter />*/}
        <div id="qa-tool-bar">
          <button id="qa-post" onClick={this.handlePostQuestion}>
            <span>Post a Question</span>
          </button>
          <div style={{ clear: "both" }} />
        </div>

          {this.state.fetchInProgress && <div style={{height: "100px", width: "100px", margin: "auto"}}><Spinner /></div>}
          {
              !this.state.fetchInProgress &&
              <div id="qa-sched-container">
                  <div id="cards-wrapper">
                      {
                          this.state.questionCards &&
                          this.state.questionCards.map((question) => <QuestionCard {...question} />)
                      }
                  </div>
                  <div id="qa-tool-sidebar">
                      <Link to={`/schedule`}>
                          <div className="qa-sidebar-tool">Schedule</div>
                      </Link>
                      <div className="qa-sidebar-tool">Classroom</div>
                  </div>
              </div>
          }
      </div>
    );
  }
}

let mapStateToProps = state => ({
  questions: state.questions,
  auth: state.auth
});

let mapDispatchToProps = dispatch => ({
  getQuestions: () => {
    dispatch(getQuestions());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PaidRequestPool);
