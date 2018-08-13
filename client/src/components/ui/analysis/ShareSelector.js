import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import CompanySelector from "./CompanySelector";
import { connect } from "react-redux";
import {setToken} from "../../../actions/action_auth";
import { setMainShares } from "../../../actions/action_main_shares";

class ShareSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleConfirmSelection = this.handleConfirmSelection.bind(this);
    this.onTabSelect = this.onTabSelect.bind(this);
  }

  handleChange(selectedOptions) {
    //this.setState({ selectedOptions });
    console.log(`Option selected:`, selectedOptions);
      this.props.setMainShares(selectedOptions);
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

        <CompanySelector
          handleChange={this.handleChange}
          defaultValue={this.props.state.mainShares}
        />
      </div>
    );
  }
}

let mapStateToProps = state => ({
    state: state
});

let mapDispatchToProps = dispatch => ({
    setMainShares: value => {
        dispatch(setMainShares(value));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ShareSelector);
