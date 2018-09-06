import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PredictionPortfolio from "./PredictionPortfolio";
import SlidingPanel from "../../widgets/SlidingPanel";
import AdvancedConfig from "./AdvancedConfig";

class ParameterPrediction extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="side home-workspace">
                <NavLink exact to="/login">
                    <div>登出</div>
                </NavLink>

                <PredictionPortfolio/>
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
)(ParameterPrediction);
