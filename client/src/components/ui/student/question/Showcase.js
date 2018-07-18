/**
 * Created by bhuang on 1/13/18.
 */
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import _ from "lodash";
import TutorProjCard from "../../common/TutorProjCard";
import Spinner from "../../common/Spinner";
import { API_ROOT_URL } from "../../../../../src/constants";
import "../../../../../css/common/Showcase.scss";
import { connect } from "react-redux";

class Showcase extends Component {
   constructor() {
       super();
       this.state = {
           //serverPort: localStorage.getItem("server_port")
       };
       this.handlePostQuestion = this.handlePostQuestion.bind(this);
       this.getProjects = this.getProjects.bind(this);
    }

    getProjects() {
        this.setState({fetchInProgress: true});
        axios.get(`${API_ROOT_URL}/api/projects`)
            .then((response) => {
                console.log(response.data);
                this.setState({fetchInProgress: false, projectCards: response.data});
            });
    }

    handlePostQuestion() {
        if (this.props.auth && this.props.auth.token) {
            this.props.history.push("/new-project");
        } else {
            this.handleOpenLogin();
        }
    }

    componentDidMount() {
       this.getProjects();
    }

    render() {
        return (
            <div id="showcase-container">
            <div id="show-case">
                <div id="showcase-toolbar">
                    <button id="showcase-post" onClick={this.handlePostQuestion}>
                        <span>Post a Project</span>
                    </button>
                    <div className="clear-bar" style={{clear: "both"}}/>
                </div>
                <div className="cardWrapper">
                    {this.state.fetchInProgress && <Spinner />}
                    {!this.state.fetchInProgress && this.state.projectCards && this.state.projectCards.map((proj, i) => <div className="card-project"><TutorProjCard key={i} {...proj} /></div>)}
                </div>
            </div>
            </div>
        );
    }
}

let mapStateToProps = state => ({
  projectCards: state.projectCards,
  auth: state.auth
});

export default withRouter(connect(mapStateToProps)(Showcase));
