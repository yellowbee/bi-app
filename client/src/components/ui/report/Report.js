import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { NavLink, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import "react-tabs/style/react-tabs.css";
import axios from "axios";
import Spinner from "../common/Spinner";
import { BI_API_ROOT_URL } from "../../../constants";
import BooleanNavbar from "../../widgets/BooleanNavbar";
import Blind from "../../widgets/Blind";
import SimpleBlind from "../../widgets/SimpleBlind";
import CompanyInfo from "./CompanyInfo";
import dataUtil from "../../../util/DataUtil";
import ParameterPredictionVisualization from "../analysis/ParameterPredictionVisualization";
import MultiLinePredChart from "../../data-vis/MultiLinePredChart";
import ChartContainer from "../analysis/containers/ChartContainer";
import DataUtil from "../../../util/DataUtil";
import MultiLineDAChart from "../../data-vis/MultiLineDAChart";
import MultiLineDualPriceChart from "../../data-vis/MulltiLineDualPriceChart";
import MultiSeriesLineChart from "../../data-vis/MultiSeriesLineChart";

class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      qtrType: this.props.state.paramAnalysis.qtrType,
      peers: this.props.state.paramAnalysis.peers,
      menuItems: [true, false, false, false, false, false]
    };
    this.updateQtrType = this.updateQtrType.bind(this);
    this.updateNavbar = this.updateNavbar.bind(this);
    this.getCompanyIntro = this.getCompanyIntro.bind(this);
    this.getPredRoes = dataUtil.getPredRoes.bind(this);
  }

  /**
   * Get the roes of the main share and its peers from rest api.
   * @param mainIdx the tab index of the current main share
   * @param peers
   */
  getCompanyIntro(mainIdx) {
    if (mainIdx === undefined) {
      mainIdx = this.state.selectedIndex;
    }
    this.setState({ fetchInProgress: true });
    let mainCompanyVal = this.props.state.mainShares[mainIdx].value;
    let companies = `codes=${mainCompanyVal}`;
    axios
      .get(`${BI_API_ROOT_URL}/api/company-info/${companies}`)
      .then(response => {
        console.log(response.data);
        this.setState({ fetchInProgress: false, companyInfo: response.data });
      });
  }

  updateQtrType(qtrType) {
    this.setState({ qtrType: qtrType });
  }

  componentDidMount() {
    if (this.props.state.mainShares.length > 0) {
      this.getCompanyIntro(this.state.selectedIndex);
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
        label: "基本报告"
      },
      {
        style: {
          gridColumn: "2 / 3"
        },
        label: "高级报告"
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
          <button className="bi-button"
            onClick={e => window.print()}
          >
            打印报告
          </button>
        </div>

        {this.state.fetchInProgress && <Spinner />}
        {!this.state.fetchInProgress && (
          <Tabs
            selectedIndex={this.state.selectedIndex}
            onSelect={tabIndex => {
              this.setState({ selectedIndex: tabIndex });
              this.getCompanyIntro(tabIndex);
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
                  this.state.companyInfo && (
                    <div>
                      <BooleanNavbar
                        style={style}
                        items={items}
                        updateNavbar={this.updateNavbar}
                      />
                      {this.state.menuItems[0] && (
                        <div>
                          <Blind
                            index={1}
                            title={"公司简介"}
                            extendedAtRender={true}
                          >
                            <CompanyInfo info={this.state.companyInfo[0]} />
                          </Blind>
                          <SimpleBlind
                            index={2}
                            title={"公司业绩预测"}
                            extendedAtRender={false}
                          >
                            <ChartContainer
                              mainIdx={this.state.selectedIndex}
                              dataApi={"/api/roes-hist-pred"}
                              title={"ROE (净资产收益率)"}
                              prepData={DataUtil.prepHistPredCombo}
                            >
                              <MultiLinePredChart />
                            </ChartContainer>
                          </SimpleBlind>
                          <SimpleBlind
                            index={3}
                            title={"公司估值"}
                            extendedAtRender={false}
                          >
                            <ChartContainer
                              mainIdx={this.state.selectedIndex}
                              dataApi={"/api/p-dual"}
                              title={"公司股票估值"}
                              prepData={DataUtil.prepHistEstimateData}
                            >
                              <MultiLineDualPriceChart/>
                            </ChartContainer>
                          </SimpleBlind>
                          <SimpleBlind
                            index={4}
                            title={"公司会计信息质量"}
                            extendedAtRender={false}
                          >
                            <ChartContainer
                              mainIdx={this.state.selectedIndex}
                              dataApi={"/api/das"}
                              title={"DA (可操纵性应计)"}
                              prepData={DataUtil.prepDaData}
                            >
                              <MultiLineDAChart />
                            </ChartContainer>
                          </SimpleBlind>
                          <SimpleBlind
                            index={5}
                            title={"公司盈利能力分析"}
                            extendedAtRender={false}
                          >
                            <ChartContainer
                              mainIdx={this.state.selectedIndex}
                              dataApi={"/api/roas"}
                              title={"总资产收益率 ROA (%)"}
                              prepData={DataUtil.convertDataFormat}
                              qtrType={3}
                            >
                              <MultiSeriesLineChart/>
                            </ChartContainer>
                          </SimpleBlind>
                          <SimpleBlind
                            index={6}
                            title={"公司成长能力分析"}
                            extendedAtRender={false}
                          >
                            <ChartContainer
                              mainIdx={this.state.selectedIndex}
                              dataApi={"/api/brgrs"}
                              title={"营业总收入增长率"}
                              prepData={DataUtil.convertDataFormat}
                              qtrType={3}
                            >
                              <MultiSeriesLineChart/>
                            </ChartContainer>
                            <ChartContainer
                              mainIdx={this.state.selectedIndex}
                              dataApi={"/api/npgrs"}
                              title={"净利润增长率"}
                              prepData={DataUtil.convertDataFormat}
                              qtrType={3}
                            >
                              <MultiSeriesLineChart/>
                            </ChartContainer>
                          </SimpleBlind>
                          <SimpleBlind
                            index={7}
                            title={"公司盈利质量分析"}
                            extendedAtRender={false}
                          >
                            <ChartContainer
                              mainIdx={this.state.selectedIndex}
                              dataApi={"/api/op2nirs"}
                              title={"净收益营运指数"}
                              prepData={DataUtil.convertDataFormat}
                              qtrType={3}
                            >
                              <MultiSeriesLineChart/>
                            </ChartContainer>
                          </SimpleBlind>
                          <SimpleBlind
                            index={8}
                            title={"公司营运能力分析"}
                            extendedAtRender={false}
                          >
                            <ChartContainer
                              mainIdx={this.state.selectedIndex}
                              dataApi={"/api/tats"}
                              title={"总资产周转率 (%)"}
                              prepData={DataUtil.convertDataFormat}
                              qtrType={3}
                            >
                              <MultiSeriesLineChart/>
                            </ChartContainer>
                            <ChartContainer
                              mainIdx={this.state.selectedIndex}
                              dataApi={"/api/trois"}
                              title={"存货周转率 (%)"}
                              prepData={DataUtil.convertDataFormat}
                              qtrType={3}
                            >
                              <MultiSeriesLineChart/>
                            </ChartContainer>
                          </SimpleBlind>
                          <SimpleBlind
                            index={9}
                            title={"公司风险分析"}
                            extendedAtRender={false}
                          >
                            <ChartContainer
                              mainIdx={this.state.selectedIndex}
                              dataApi={"/api/z-scores"}
                              title={"风险指数"}
                              prepData={DataUtil.convertDataFormat}
                              qtrType={4}
                            >
                              <MultiSeriesLineChart/>
                            </ChartContainer>
                          </SimpleBlind>
                          <Blind
                            index={10}
                            title={"公司排行榜"}
                            extendedAtRender={false}
                          >
                            Sample text
                          </Blind>
                        </div>
                      )}
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

export default connect(mapStateToProps, null)(Report);
