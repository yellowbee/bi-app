/**
 * Created by bhuang on 1/14/18.
 */

import React from 'react'
import '../../../../../css/student/question/StudentHomeTop.scss'

const StudentHomeTop = () => {

    return (
        <div className="top">
            <div id="nav-wrapper">
            <div id="navbar">
                <button><span>Post a request</span></button>
                <span className="nav-link"><a>Become a tutor</a></span>
                <span className="nav-link"><a>Search</a></span>
                <span className="nav-link"><a>Login</a></span>
                <span className="nav-link"><a>Sign up</a></span>
            </div>
            </div>
            <div id="update-account">
                <span className="sec-title">Updated account info to gain more features</span>
                <div className="btn-grp">
                    <button id="go"><span>go</span></button>
                    <button id="remind"><span>Remind me later</span></button>
                </div>
            </div>
            <div className="search">
                <span>Type to start searching</span>
            </div>
        </div>

    )
}

export default StudentHomeTop
