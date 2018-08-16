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
      selectedIndex: 0,
      selectedOptions: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleConfirmSelection = this.handleConfirmSelection.bind(this);
    this.onTabSelect = this.onTabSelect.bind(this);
  }

  handleChange(selectedOptions) {
    this.setState({ selectedOptions });
    console.log(`Option selected:`, selectedOptions);
  }

  handleConfirmSelection() {
    if (this.state.selectedOptions && this.state.selectedOptions.length > 0) {
      this.setState({ selector: false, portfolio: true });
    }
  }

  onTabSelect(selectedTabIndex) {
    this.setState({ selectedTabIndex });
  }

  render() {
    return (
      <div className="side home-workspace">
          {/*<span
          style={{ fontSize: "30px", cursor: "pointer" }}
          onClick={e => {
            this.openNav();
          }}
        >
          &#9776;
        </span>*/}
        <NavLink exact to="/login">
          <div>登出</div>
        </NavLink>

        <CompanyPortfolio selection={this.props.state.mainShares} />

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
)(ParameterQuery);
