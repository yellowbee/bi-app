import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { NavLink, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import "react-tabs/style/react-tabs.css";
import axios from "axios";
import Spinner from "../common/Spinner";
import ParameterVisualization from "./StandardParameterVisualization";
import { BI_API_ROOT_URL } from "../../../constants";
//import LandscapeNavBar from "../../widgets/LandscapeNavBar";
import BooleanNavbar from "../../widgets/BooleanNavbar";
import StandardParameterVisualization from "./StandardParameterVisualization";
import ShareSelector from "./ShareSelector";
import ParameterQuery from "./ParameterQuery";
import { qtrType } from "../../../constants";
import SlidingPanel from "../../widgets/SlidingPanel";
import AdvancedConfig from "./AdvancedConfig";

class CompanyPortfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      qtrType: this.props.state.paramAnalysis.qtrType,
      peers: this.props.state.paramAnalysis.peers,
      menuItems: [true, false, false, false, false, false],
        paramsToLoad: ['roas', 'epss', 'cfpss', 'brgrs', 'npgrs'],
        paramNames: ['总资产收益率', '每股收益', '每股净现金流', '营业总收入增长率', '净利润增长率'],
      loadTracker: []
    };
    this.getRoes = this.getRoes.bind(this);
    this.getNextParam = this.getNextParam.bind(this);
    this.getRoe = this.getRoe.bind(this);
    this.updateQtrType = this.updateQtrType.bind(this);
    this.updateNavbar = this.updateNavbar.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  // infinite scrolling handler
  handleScroll() {
    const windowHeight =
      "innerHeight" in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      /*this.setState({
                message:'bottom reached'
            });*/
      console.log("bottom reached");
      if (this.state.loadTracker.length < 6) {
        let nextParam = this.state.paramsToLoad[this.state.loadTracker.length];
          this.getNextParam(
              this.state.selectedIndex,
              this.props.state.paramAnalysis.peers,
              nextParam
          );
      }
    } else {
      /*this.setState({
                message:'not at bottom'
            });*/
      console.log("not at bottom");
    }
  }

  /**
   * Get the roes of the main share and its peers from rest api.
   * @param mainIdx the tab index of the current main share
   * @param peers
   */
  getRoes(mainIdx, peers) {
    if (mainIdx === undefined) {
      mainIdx = this.state.selectedIndex;
    }
    this.setState({ fetchInProgress: true });
    let mainCompanyVal = this.props.state.mainShares[mainIdx].value;
    let companies = `codes=${mainCompanyVal}`;
    //let peers = this.props.state.paramAnalysis.peers ? this.props.state.paramAnalysis.peers : [];
    peers = peers ? peers : [];
    for (let i = 0; i < peers.length; i++) {
      let peerVal = peers[i].value;
      companies += `&codes=${peerVal}`;
    }
    console.log(companies);
    axios.get(`${BI_API_ROOT_URL}/api/roes/${companies}`).then(response => {
      console.log(response.data);
      this.setState({ fetchInProgress: false, roes: response.data });
    });
  }

  getNextParam(mainIdx, peers, paramAcro) {
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
  }

  getRoe(code) {
    this.setState({ fetchInProgress: true });
    axios.get(`${BI_API_ROOT_URL}/api/roe/${code}`).then(response => {
      console.log("ROE for current option:");
      console.log(response.data);
      this.setState({ fetchInProgress: false, curRoe: response.data });
    });
  }

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

    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
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
        label: "查看标准分析"
      },
      {
        style: {
          gridColumn: "2 / 3"
        },
        label: "查看更多指标"
      }
    ];

    let options = this.props.state.mainShares;
    return (
      <div>
        <div style={{ marginBottom: "40px" }}>
          <span>已选定公司 ({options.length}) &nbsp;&nbsp;&nbsp;</span>
          <NavLink activeClassName="selected" to="/home/main-shares">
              <span className="label1--themed">返回设置主选公司</span>
          </NavLink>
        </div>

        {this.state.fetchInProgress && <Spinner />}
        {!this.state.fetchInProgress && (
          <Tabs
            selectedIndex={this.state.selectedIndex}
            onSelect={tabIndex => {
              this.setState({ selectedIndex: tabIndex, loadTracker: [] });
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
                          <StandardParameterVisualization
                            data={this.state.roes}
                            domain={[-40, 40]}
                            qtrType={this.state.qtrType}
                            mainIdx={this.state.selectedIndex}
                            title="ROE (净资产收益率)"
                          />

                            {this.state.loadTracker.map((param, i) => (
                                <StandardParameterVisualization
                                    key={param.paramAcro}
                                    data={param.data}
                                    qtrType={this.state.qtrType}
                                    mainIdx={this.state.selectedIndex}
                                    title={this.state.paramNames[i]}
                                />
                            ))}
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
)(CompanyPortfolio);
