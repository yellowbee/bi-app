import React, { Component } from "react";
import MultiSeriesLineChart from "../../data-vis/MultiSeriesLineChart";
import MultiLineDualPriceChart from "../../data-vis/MulltiLineDualPriceChart";
const util = require("../../../util/ParamUtil");
import { connect } from "react-redux";

class DualPriceVisualization extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.dataPreprocess = this.dataPreprocess.bind(this);
  }

  dataPreprocess(rawData) {
    let data = {} ;
    let max = 0;
    let min = 0;
    for (let i = 0; i < rawData.length; i++) {
      data[rawData[i].code] = util.getDataByQtrType(
        rawData[i]
      );

      let curMax = Math.max(...rawData[i].val);
      let curMin = Math.min(...rawData[i].val);
      max = max > curMax ? max : curMax;
      min = min < curMin ? min : curMin;
    }

    return {data, max, min}
  }

  render() {
    console.log("raw data: ");
    console.log(this.props.data);
    // data = {"0001": [], "0002": [], ...}

    let history = this.dataPreprocess(this.props.data.history);
    let estimate = this.dataPreprocess(this.props.data.estimate);
    let min = Math.min(history.min, estimate.min);
    let max = Math.max(history.max, estimate.max);

    console.log("assembled history data: ");
    console.log(history);
    return (
      <div>
        <div className="std-param-vis" style={{ width: "90%", margin: "0 auto 100px auto" }}>
          <div className="param-vis-elem__title">{this.props.title}</div>
          <MultiLineDualPriceChart
            size={[1200, 500]}
            history={history.data}
            estimate={estimate.data}
            domain={[min, max]}
            qtrType={this.props.qtrType}
          />
        </div>
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
)(DualPriceVisualization);
