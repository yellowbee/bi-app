/**
 * Top level navbar.
 * Created by bhuang on 1/14/18.
 */

import React, { Component } from "react";
import { Route, NavLink, Switch, withRouter } from "react-router-dom";
import _ from 'lodash';
import RequestPool from "../student/question/RequestPool";
import Showcase from "../student/question/Showcase";
import Profile from '../student/profile/Profile';
import EditProfile from "../student/profile/EditProfile";
//import TutorProjectPool from '../student/tutorproject/TutorProjectPool'
import { connect } from "react-redux";
import PaidRequestPool from '../student/question/paidquestion/PaidRequestPool';
import QuestionDetail from '../student/question/paidquestion/QuestionDetail';
import Schedule from '../student/schedule/Schedule';
import Project from '../student/project/Project';
import "../../../../css/common/NavbarMain.scss";

class NavbarMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
        serverPort: localStorage.getItem("server_port")
    }
  }

  render() {
    return (
      <div className="link">
        <ul id="level-1">
          <li>
            <NavLink activeClassName="selected" exact to="/">
              <div>Showcase</div>
                {/*<div className="arrow-up" />*/}
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="selected" to="/question-pool">
              Question & Answer
                {/*<div className="arrow-up" />*/}
            </NavLink>
          </li>
            { /*(!_.isEmpty(this.state.serverPort) || this.props.auth.token) &&
              <li>
                <NavLink activeClassName="selected" to="/profile">
                  Profile
                </NavLink>
              </li>*/
            }
        </ul>
        <div className="gradient-bar"/>
        <Switch>
          {/*
                        Use "render" instead of "component" so that parameters can be passed in
                    */}
          <Route exact path="/" render={() => <Showcase />} />
          {/*<Route path="/question-pool" component={RequestPool} />*/}
          <Route path="/profile/edit-profile" component={EditProfile} />
          <Route path="/profile" component={Profile} />

          <Route path="/question-pool/question-detail/:id" component={QuestionDetail} />
          <Route path="/schedule" component={Schedule} />
          <Route path="/project-detail/:id" component={Project} />
          <Route exact path="/question-pool" component={PaidRequestPool} />
        </Switch>
      </div>
    );
  }
}

let mapStateToProps = state => ({
    auth: state.auth
});

// withRouter is needed if component is wrapped in connect
export default withRouter(connect(mapStateToProps, null)(NavbarMain));
