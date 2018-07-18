/**
 * Created by bhuang on 1/14/18.
 */

import React from 'react';
import {
    NavLink,
    Route,
    Switch
} from 'react-router-dom'
import PaidRequestPool from '../student/question/paidquestion/PaidRequestPool'
import '../../../../css/common/DropdownList.scss'

const DropdownList = () => {
    return (
        <div className="dropdown">
            <ul>
                <li><NavLink activeClassName="selected" to="/paid-request">Paid Request</NavLink></li>
                <li><NavLink activeClassName="selected" to="/free-request">Free Request</NavLink></li>
                <li><NavLink activeClassName="selected" to="/solved-request">Sovled Request</NavLink></li>
                <li><NavLink activeClassName="selected" to="/my-request">My Request</NavLink></li>
            </ul>
            <Switch>
                <Route exact path="/paid-request" component={PaidRequestPool}/>
            </Switch>
        </div>
    )
}

export default DropdownList
