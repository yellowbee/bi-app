import React, { Component } from "react";
import MultiSeriesLineChart from "../../data-vis/MultiSeriesLineChart";
import MultiLinePredChart from "../../data-vis/MultiLinePredChart";
const util = require("../../../util/ParamUtil");
import { connect } from "react-redux";
import { qtrType } from "../../../constants";
import _ from "lodash";

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

class ParameterPredictionVisualization extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log("raw data: ");
    console.log(this.props.data);

    // hist = [{code, date, val}, ..., {}]
    let hist = this.props.data.hist;
    // pred = [{code, date, val}, ..., {}]
    let pred = _.keyBy(this.props.data.pred, "code");

    let data = {};
    let max = 5;
    let min = -10;
    for (let i = 0; i < hist.length; i++) {
      let code = hist[i].code;
      data[code] = util.getDataByQtrType(hist[i], qtrType.YEAR);
      let curPred = pred[code];

      // replace the last few years' data with predicted data
      for (let i = 0; i < curPred.val.length; i++) {
        let idxToPred = data[code].data.length - curPred.val.length + i;
        data[code].data[idxToPred] = {
          date: idxToPred,
          val: curPred.val[i] ? curPred.val[i] : null
        };
      }

      //let curMax = Math.max(...this.props.data[i].val, ...curPred.val);
      //let curMin = Math.min(...this.props.data[i].val, ...curPred.val);
      let curMax = Math.max(...hist[i].val, ...curPred.val);
      let curMin = Math.min(...hist[i].val, ...curPred.val);
      max = max > curMax ? max : curMax;
      min = min < curMin ? min : curMin;
    }

    max = max <= 99 ? max : 120;
    min = min >= -99 ? min : -120;

    console.log("expanded data: ");
    console.log(data);
    return (
      <div>
        <div
          className="std-param-vis"
          style={{ width: "90%", margin: "0 auto 100px auto" }}
        >
          <div className="param-vis-elem__title">{this.props.title}</div>
          <MultiLinePredChart
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
)(ParameterPredictionVisualization);
