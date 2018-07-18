/**
 * This is the page to present a question from a user.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from "axios";
import ProfileIcon from '../../../common/ProfileIcon';
import SessionProposal from '../../schedule/SessionProposal';
import { API_ROOT_URL } from "../../../../../../src/constants";
import '../../../../../../css/student/question/paidquestion/QuestionDetail.scss';
//import {getQuestionDetail} from "../../../../../actions/action_questionDetail";

class QuestionDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        //const { id } = this.props.match.params;
        console.log('Route params: ' + this.props.match.params.id);
        this.getQuestionDetail(this.props.match.params.id);
    }

    getQuestionDetail(id) {
        axios.get(`${API_ROOT_URL}/api/question-detail/${id}`)
            .then((response) => {
                console.log(response);
                this.setState({question: response.data});
            });
    }

    render() {
        let { question } = this.state;
        return (
            <div className="question-detail">
                {question &&
                <div>
                <h2>{question.title}</h2>
                <h4>{question.tags}</h4>
                <ProfileIcon profileImg={question.profileImg} fullName={question.fullName}/>
                {/*<p>{question.description.split('\n').map((text) => (
                    <div>{text}</div>
                ))}</p>*/}
                <div>{question.description && question.description.map((block) => {
                    if (block.type === 'text') {
                        return <div className="paragraph">{block.value}</div>
                    } else if (block.type === 'image') {
                        return <div className="question-img"><img src={block.imgUrl} /></div>
                    }
                })}
                </div>
                <div id="solution"><h2>Tutor Solution</h2></div>
                {this.props.auth.userName !== question.userName &&
                    <SessionProposal qid={question._id} proposedTo={question.userName} />
                }
                </div>}
            </div>
        )
    }
};

let mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, null)(QuestionDetail);