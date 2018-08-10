import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import axios from "axios";
import Spinner from "../common/Spinner";
import { BI_API_ROOT_URL } from "../../../constants";

class CompanyPortfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      curRoe: {}
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
    axios
      .get(`${BI_API_ROOT_URL}/api/roe/${code}`)
      .then(response => {
        console.log("ROE for current option:");
        console.log(response.data);
        this.setState({ fetchInProgress: false, curRoe: response.data });
      });
  }

  componentDidMount() {
    this.getRoe(this.props.selection[0].value);
  }

  render() {
    let options = this.props.selection;
    return (
      <div>
        <div style={{ marginBottom: "40px" }}>
          <span>已选定公司 ({options.length}) &nbsp;&nbsp;&nbsp;</span>
          <a href="javascript:;" onClick={this.props.handleBackToAddMore}>
            返回继续添加
          </a>
        </div>

        {this.state.fetchInProgress && <Spinner />}
        {!this.state.fetchInProgress && (
          <Tabs selectedIndex={this.state.selectedIndex} onSelect={(tabIndex) => {
            this.setState({selectedIndex: tabIndex})
            this.getRoe(this.props.selection[tabIndex].value)
          }}>
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
                  {
                    this.state.selectedIndex === i &&
                    <span>这是{option.label}的分析</span>
                  }
              </TabPanel>
            ))}
          </Tabs>
        )}
      </div>
    );
  }
}

export default CompanyPortfolio;
