import React, { Component } from "react";
import MultiSeriesLineChart from "../../data-vis/MultiSeriesLineChart";
import MultiLineDualPriceChart from "../../data-vis/MulltiLineDualPriceChart";
const util = require("../../../util/ParamUtil");
import { connect } from "react-redux";

class DualPriceVisualization extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log("raw data: ");
    console.log(this.props.data);
    // data = {"0001": [], "0002": [], ...}
    let max = 0.2;
    let min = 0;

    let history = {} ;
    let estimate = {};

    for (let i = 0; i < this.props.data.history.length; i++) {
      history[this.props.data.history[i].code] = util.getDataByQtrType(
        this.props.data.history[i]
      );

      let curMax = Math.max(...this.props.data.history[i].val);
      let curMin = Math.min(...this.props.data.history[i].val);
      max = max > curMax ? max : curMax;
      min = min < curMin ? min : curMin;
    }

    max = max <= 99 ? max : 120;
    min = min >= -99 ? min : -120;

    console.log("assembled history data: ");
    console.log(history);
    return (
      <div>
        <div className="std-param-vis" style={{ width: "90%", margin: "0 auto 100px auto" }}>
          <div className="param-vis-elem__title">{this.props.title}</div>
          <MultiLineDualPriceChart
            size={[1200, 500]}
            data={history}
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
