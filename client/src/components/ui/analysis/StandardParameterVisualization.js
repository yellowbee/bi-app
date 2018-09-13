import React, { Component } from "react";
//import LineChart from "../../data-vis/LineChart";
import MultiSeriesLineChart from "../../data-vis/MultiSeriesLineChart";
import { timeParse } from "d3-time-format";
const util = require("../../../util/ParamUtil");
import { BI_API_ROOT_URL, qtrType } from "../../../constants";
import axios from "axios";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";

/** packed parameter
 * packed = {
 *            code: "0001",
 *            date: [...],
 *            val: [...]
 *        };
 *
 * expanded = [
 *               {date: "", val: 1},
 *               {date: "", val: 1},
 *               ...
 *            ]
 */

class StandardParameterVisualization extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log("raw data: ");
    console.log(this.props.data);
    // data = {"0001": [], "0002": [], ...}
    let data = {};
    let max = 5;
    let min = -5;
    for (let i = 0; i < this.props.data.length; i++) {
      data[this.props.data[i].code] = util.getDataByQtrType(
        this.props.data[i],
        this.props.qtrType
      );
      let curMax = Math.max(...this.props.data[i].val);
      let curMin = Math.min(...this.props.data[i].val);
      max = max > curMax ? max : curMax;
      min = min < curMin ? min : curMin;
    }

    max = max <= 99 ? max : 120;
    min = min >= -99 ? min : -120;

    console.log("expanded data: ");
    console.log(data);
    return (
      <div>
        <div className="std-param-vis" style={{ width: "90%", margin: "0 auto 100px auto" }}>
          <div className="param-vis-elem__title">{this.props.title}</div>
          <MultiSeriesLineChart
            size={[1200, 500]}
            data={data}
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
)(StandardParameterVisualization);
