import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { NavLink, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import "react-tabs/style/react-tabs.css";
import axios from "axios";
import Spinner from "../common/Spinner";
import ParameterVisualization from "./StandardParameterVisualization";
import { BI_API_ROOT_URL } from "../../../constants";
import BooleanNavbar from "../../widgets/BooleanNavbar";
import StandardParameterVisualization from "./StandardParameterVisualization";
import ShareSelector from "./ShareSelector";
import ParameterQuery from "./ParameterQuery";
import { qtrType } from "../../../constants";
import SlidingPanel from "../../widgets/SlidingPanel";
import AdvancedConfig from "./AdvancedConfig";
import ParameterPredictionVisualization from "./ParameterPredictionVisualization";
import DataUtil from "../../../util/DataUtil";
import ChartContainer from "./containers/ChartContainer";
import MultiLinePredChart from "../../data-vis/MultiLinePredChart";

class PredictionPortfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      qtrType: this.props.state.paramAnalysis.qtrType,
      peers: this.props.state.paramAnalysis.peers,
      menuItems: [true, false, false, false, false, false]
    };
      this.getRoes = DataUtil.getPredRoes.bind(this);
    this.updateQtrType = this.updateQtrType.bind(this);
    this.updateNavbar = this.updateNavbar.bind(this);
  }

    /*getPredParamByName(mainIdx, peers, paramAcro) {
        if (mainIdx === undefined) {
            mainIdx = this.state.selectedIndex;
        }
        let mainCompanyVal = this.props.state.mainShares[mainIdx].value;
        let companies = `codes=${mainCompanyVal}`;
        //let peers = this.props.state.paramAnalysis.peers ? this.props.state.paramAnalysis.peers : [];
        peers = peers ? peers : [];
        for (let i = 0; i < peers.length; i++) {
            let peerVal = peers[i].value;
            companies += `&codes=${peerVal}`;
        }
        console.log(companies);
        axios.get(`${BI_API_ROOT_URL}/api/${paramAcro}/${companies}`).then(response => {
            let loadTracker = this.state.loadTracker;
            loadTracker.push({paramAcro, data: response.data});
            this.setState({ loadTracker });
        });
    }*/

  updateQtrType(qtrType) {
    this.setState({ qtrType: qtrType });
  }

  componentDidMount() {
    if (this.props.state.mainShares.length > 0) {
      //this.getRoe(this.props.state.mainShares[this.state.selectedIndex].value);
      this.getRoes(
        this.state.selectedIndex,
        this.props.state.paramAnalysis.peers
      );
    }
  }

  updateNavbar(menuItems) {
    this.setState({ menuItems });
  }

  render() {
    console.log("current local state: ");
    console.log(this.state);

    let style = {
      container: {
        gridTemplateColumns: "repeat(6, 1fr)"
      }
    };

    let items = [
      {
        style: {
          gridColumn: "1 / 2"
        },
        label: "业绩预测"
      },
      {
        style: {
          gridColumn: "2 / 3"
        },
        label: "风险预测"
      },
      {
        style: {
          gridColumn: "3 / 4"
        },
        label: "收入预测"
      }
    ];

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
              //this.getRoe(this.props.state.mainShares[tabIndex].value);
              this.getRoes(tabIndex, this.props.state.paramAnalysis.peers);
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
                  this.state.roes && (
                    <div>
                      <BooleanNavbar
                        style={style}
                        items={items}
                        updateNavbar={this.updateNavbar}
                      />
                      {this.state.menuItems[0] && (
                        <div>
                            {/*<StandardParameterVisualization
                            data={this.state.roes}
                            domain={[-40, 40]}
                            qtrType={this.state.qtrType}
                            mainIdx={this.state.selectedIndex}
                            title="ROE (净资产收益率)"
                          />*/}
                          <ParameterPredictionVisualization
                              data={this.state.roes}
                              domain={[-40, 40]}
                              qtrType={this.state.qtrType}
                              mainIdx={this.state.selectedIndex}
                              title="ROE (净资产收益率)"
                          />
                          <ChartContainer
                            mainIdx={this.state.selectedIndex}
                            dataApi={"/api/roas-hist-pred"}
                            title={"ROA (总资产收益率)"}
                            prepData={DataUtil.prepHistPredCombo}
                          >
                            <MultiLinePredChart/>
                          </ChartContainer>
                          <ChartContainer
                            mainIdx={this.state.selectedIndex}
                            dataApi={"/api/epss-hist-pred"}
                            title={"EPS (每股收益)"}
                            prepData={DataUtil.prepHistPredCombo}
                          >
                            <MultiLinePredChart/>
                          </ChartContainer>
                        </div>
                      )}
                    </div>
                  )}
              </TabPanel>
            ))}
          </Tabs>
        )}
        <SlidingPanel>
          <AdvancedConfig
            updateQtrType={this.updateQtrType}
            updateData={this.getRoes}
          />
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
)(PredictionPortfolio);
