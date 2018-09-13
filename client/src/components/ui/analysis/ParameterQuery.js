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
      <div>
        <NavLink exact to="/login">
          <div>登出</div>
        </NavLink>

          <div style={{marginTop: "150px", marginBottom: "100px"}}>
        <CompanyPortfolio/>
          </div>

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
