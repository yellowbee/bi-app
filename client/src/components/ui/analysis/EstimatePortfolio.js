import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { NavLink, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import "react-tabs/style/react-tabs.css";
import axios from "axios";
import Spinner from "../common/Spinner";
import ParameterVisualization from "./StandardParameterVisualization";
import { BI_API_ROOT_URL } from "../../../constants";
import DualPriceVisualization from "./DualPriceVisualization";
import LandscapeNavBar from "../../widgets/LandscapeNavBar";
import StandardParameterVisualization from "./StandardParameterVisualization";
import ShareSelector from "./ShareSelector";
import ParameterQuery from "./ParameterQuery";

class EstimatePortfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0
    };
    this.getDualPrice = this.getDualPrice.bind(this);
  }

  /**
   * Get the dual(history and estimate) price of a share.
   * @param mainIdx
   */
  getDualPrice(mainIdx) {
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
    //console.log(companies);
    axios.get(`${BI_API_ROOT_URL}/api/p-dual/${companies}`).then(response => {
      console.log(response.data);
      this.setState({ fetchInProgress: false, pDual: response.data });
    });
  }

  componentDidMount() {
    if (this.props.state.mainShares.length > 0) {
      this.getDualPrice(this.state.selectedIndex);
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
              this.getDualPrice(tabIndex);
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
                  this.state.pDual && (
                    <div>
                      <DualPriceVisualization
                        data={this.state.pDual}
                        title={"公司股票估值"}
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

export default connect(mapStateToProps, null)(EstimatePortfolio);
