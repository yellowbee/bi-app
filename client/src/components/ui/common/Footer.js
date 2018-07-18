/**
 * The footer at the very bottom of a page.
 * Created by bhuang on 1/14/18.
 */

import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../../../css/common/Footer.scss'

const Footer = () => {

    return (
        <div id="footer">
            <ul>
                <li className="left"><NavLink to="#">About us |&nbsp;</NavLink></li>
                <li className="left"><NavLink to="#">Language: English |&nbsp; </NavLink></li>
                <li className="left"><NavLink to="#">Privacy |&nbsp;</NavLink></li>
                <li className="left"><NavLink to="#">FAQ</NavLink></li>
                <li className="right">2018 Whenty</li>
            </ul>
        </div>
    )
}

export default Footer;