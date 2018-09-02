import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import CompanyPortfolio from "./CompanyPortfolio";
import SlidingPanel from "../../widgets/SlidingPanel";
import AdvancedConfig from "./AdvancedConfig";

class ParameterQuery extends Component {
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

        <CompanyPortfolio/>

          {/*<SlidingPanel>
            <AdvancedConfig/>
        </SlidingPanel>*/}
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
)(ParameterQuery);
