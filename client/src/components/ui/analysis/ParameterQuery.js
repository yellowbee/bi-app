import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import CompanySelector from "./CompanySelector";
import CompanyPortfolio from "./CompanyPortfolio";

class ParameterQuery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
        selector: true,
        portfolio: false
    };
      this.handleChange = this.handleChange.bind(this);
      this.handleConfirmSelection = this.handleConfirmSelection.bind(this);
      this.handleBackToAddMore = this.handleBackToAddMore.bind(this);
      this.onTabSelect = this.onTabSelect.bind(this);
  }

    handleChange(selectedOptions) {
        this.setState({ selectedOptions });
        console.log(`Option selected:`, selectedOptions);
    }

    handleConfirmSelection() {
        if (this.state.selectedOptions && this.state.selectedOptions.length > 0) {
            this.setState({selector: false, portfolio: true});
        }
    }

    handleBackToAddMore() {
        this.setState({ selector: true, portfolio: false });
    }

    onTabSelect(selectedTabIndex) {
        this.setState({selectedTabIndex});
    }

  render() {
    return (
      <div className="side no-wrap home-workspace">
        <span
          style={{ fontSize: "30px", cursor: "pointer" }}
          onClick={e => {
            this.openNav();
          }}
        >
          &#9776;
        </span>
        <NavLink exact to="/login">
          <div>登出</div>
        </NavLink>

        {this.state.selector && (
          <CompanySelector
            handleChange={this.handleChange}
            handleConfirmSelection={this.handleConfirmSelection}
            defaultValue={this.state.selectedOptions}
          />
        )}

        {this.state.portfolio && (
          <CompanyPortfolio
            selection={this.state.selectedOptions}
            handleBackToAddMore={this.handleBackToAddMore}
          />
        )}
      </div>
    );
  }
}

export default ParameterQuery;
