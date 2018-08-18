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

class CompanyPortfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0
    };
    this.getRoes = this.getRoes.bind(this);
    this.getRoe = this.getRoe.bind(this);
  }

  getRoes() {
    this.setState({ fetchInProgress: true });
    axios.get(`${BI_API_ROOT_URL}/api/roes/codes=000001.SZ`).then(response => {
      console.log(response.data);
      this.setState({ fetchInProgress: false, roes: response.data });
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

  componentDidMount() {
    if (this.props.selection.length > 0) {
      this.getRoe(this.props.selection[0].value);
    }
  }

  render() {
    let style = {
      container: {
        gridTemplateColumns: "repeat(6, 1fr)",
      }
    };

    let items = [
      {
        style: {
          gridColumn: "1 / 2"
        },
        path: "/home/param-query",
        label: "查看标准分析"
      },
      {
        style: {
          gridColumn: "2 / 3"
        },
        path: "/home/param-query/more-param",
        label: "查看更多指标"
      }
    ];

    let options = this.props.selection;
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
              this.getRoe(this.props.selection[tabIndex].value);
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
                  this.state.curRoe && (
                    <div>
                      <LandscapeNavBar style={style} items={items} />
                      <Switch>
                          <Route
                              exact
                              path="/home/param-query/more-param"
                              render={() => (
                                  <div>More Param</div>
                              )}
                          />
                          <Route
                              path="/home/param-query"
                              render={() => (
                                  <StandardParameterVisualization
                                      data={this.state.curRoe}
                                  />
                              )}
                          />
                      </Switch>
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

export default connect(mapStateToProps, null)(CompanyPortfolio);
