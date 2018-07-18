import React from 'react';
import {
    NavLink,
    Route,
    Switch
} from 'react-router-dom';
import PaidRequestPool from '../student/question/paidquestion/PaidRequestPool';
import QuestionDetail from '../student/question/paidquestion/QuestionDetail';
import '../../../../css/common/NavbarRequestPool.scss';

const NavbarRequestPool = () => {

    return (
        <div>
            <ul id="level-2">
                <li><NavLink exact activeClassName="selected" to="/question-pool">Paid Question</NavLink></li>
                <li><NavLink activeClassName="selected" to="/question-pool/free-request">Free Question</NavLink></li>
                <li><NavLink activeClassName="selected" to="/question-pool/solved-request">Sovled Question</NavLink></li>
            </ul>
            <Switch>
                <Route path="/question-pool/question-detail/:id" component={QuestionDetail} />
                <Route exact path="/question-pool" component={PaidRequestPool} />
            </Switch>
        </div>
    )
}

export default NavbarRequestPool;