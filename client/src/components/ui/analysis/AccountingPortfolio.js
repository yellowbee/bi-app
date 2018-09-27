import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { NavLink, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import "react-tabs/style/react-tabs.css";
import axios from "axios";
import Spinner from "../common/Spinner";
import ParameterVisualization from "./StandardParameterVisualization";
import { BI_API_ROOT_URL } from "../../../constants";
import LandscapeNavBar from "../../widgets/LandscapeNavBar";
import StandardParameterVisualization from "./StandardParameterVisualization";
import ShareSelector from "./ShareSelector";
import ParameterQuery from "./ParameterQuery";
import AccountingInfoVisualization from "./AccountingInfoVisualization";

class CompanyPortfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0
    };
    this.getDAs = this.getDAs.bind(this);
  }

  /**
   * Get the DAs of the main share and its peers from rest api.
   * @param mainIdx the tab index of the current main share
   * @param peers
   */
  getDAs(mainIdx) {
    this.setState({ fetchInProgress: true });
    let mainCompanyVal = this.props.state.mainShares[mainIdx].value;
    let companies = `codes=${mainCompanyVal}`;
    let peers = this.props.state.paramAnalysis.peers
      ? this.props.state.paramAnalysis.peers
      : [];
    for (let i = 0; i < peers.length; i++) {
      let peerVal = peers[i].value;
      companies += `&codes=${peerVal}`;
    }
    console.log(companies);
    axios.get(`${BI_API_ROOT_URL}/api/das/${companies}`).then(response => {
      console.log(response.data);
      this.setState({ fetchInProgress: false, das: response.data });
    });
  }

  componentDidMount() {
    if (this.props.state.mainShares.length > 0) {
      this.getDAs(this.state.selectedIndex);
    }
  }

  render() {
    console.log("current local state: ");
    console.log(this.state);

    let options = this.props.state.mainShares;
    return (
      <div>
        <div style={{ marginBottom: "40px" }}>
          <span>已选定公司 ({options.length}) &nbsp;&nbsp;&nbsp;</span>
          <NavLink activeClassName="selected" to="/home/main-shares">
            返回设置主选公司
          </NavLink>
        </div>

        {this.state.fetchInProgress && <Spinner />}
        {!this.state.fetchInProgress && (
          <Tabs
            selectedIndex={this.state.selectedIndex}
            onSelect={tabIndex => {
              this.setState({ selectedIndex: tabIndex });
              this.getDAs(tabIndex);
            }}
          >
            <TabList>
              {options.map(option => (
                <Tab key={option.value}>
                  <span style={{ fontSize: "0.8em" }}>
                    {option.label} ({option.value})
                  </span>
                </Tab>
              ))}
            </TabList>

            {options.map((option, i) => (
              <TabPanel key={option.value}>
                {this.state.selectedIndex === i &&
                  this.state.das && (
                    <div>
                        <div
                            style={{ width: "100%", backgroundColor: "#d0e7f2", textAlign: "center", padding: "5px 0" }}
                        >
                            DA (可操纵性应计)
                        </div>
                        <AccountingInfoVisualization
                          data={this.state.das}
                        />
                      />
                    </div>
                  )}
              </TabPanel>
            ))}
          </Tabs>
        )}
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
)(CompanyPortfolio);
