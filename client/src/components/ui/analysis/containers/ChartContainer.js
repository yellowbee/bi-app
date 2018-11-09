import React, { Component } from "react";
import { connect } from "react-redux";
import "react-tabs/style/react-tabs.css";
import axios from "axios";
import Spinner from "../../common/Spinner";
import { BI_API_ROOT_URL } from "../../../../constants";
import DataUtil from "../../../../util/DataUtil";
import MultiLineFraudChart from "../../../data-vis/MultiLineFraudChart";
import MultiLineDAChart from "../../../data-vis/MultiLineDAChart";

class ChartContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.getData = this.getData.bind(this);
  }

  /**
   * Get data of the main share and its peers from api.
   */
  getData(mainIdx) {
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
    //axios.get(`${BI_API_ROOT_URL}/api/das/${companies}`).then(response => {
    axios
      .get(`${BI_API_ROOT_URL}${this.props.dataApi}/${companies}`)
      .then(response => {
        console.log("ChartContainer -> get data from service: ");
        console.log(response.data);
        let data = DataUtil.convertDataFormat(response.data);
        console.log("ChartContainer -> converted data: ");
        console.log(data);
        this.setState({ fetchInProgress: false, data });
      });
  }

  componentDidMount() {
    if (this.props.state.mainShares.length > 0) {
      this.getData(this.props.mainIdx);
    }
  }

  render() {
    console.log("current local state: ");
    console.log(this.state);

    let options = this.props.state.mainShares;
    return (
      <div>
        {this.state.fetchInProgress && <Spinner />}
        {!this.state.fetchInProgress &&
          (this.state.data && (
            <div
              className="std-param-vis"
              style={{ width: "90%", margin: "0 auto 100px auto" }}
            >
              <div className="param-vis-elem__title">{'舞弊概率'}</div>
              {/*<AccountingInfoVisualization data={this.state.das} title={"DA (可操纵性应计)"}/>*/}
              <MultiLineFraudChart
                size={[1200, 500]}
                data={this.state.data.converted}
                domain={[0, 1]}
              />
            </div>
          ))}
      </div>
    );
  }
}

let mapStateToProps = state => ({
  state: state
});

export default connect(mapStateToProps, null)(ChartContainer);