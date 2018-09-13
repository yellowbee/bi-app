import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import AccountingPortfolio from "./AccountingPortfolio";
import SlidingPanel from "../../widgets/SlidingPanel";
import AdvancedConfig from "./AdvancedConfig";

class AccountingInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div>
                <NavLink exact to="/login">
                    <div>登出</div>
                </NavLink>

                <AccountingPortfolio/>

                <SlidingPanel>
                    <AdvancedConfig/>
                </SlidingPanel>
            </div>
        );
    }
}

let mapStateToProps = state => ({
    state: state
});

export default connect(
    mapStateToProps,
    null
)(AccountingInfo);
