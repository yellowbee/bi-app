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
    // this.props.data = [packed, packed, ...]
    //let data = convertTwoArrToOneArray(this.props.data);
    //console.log("packed data")
    //console.log(this.props.data);

    // data = {"0001": [], "0002": [], ...}
    let data = {};
      for (let i=0; i < this.props.data.length; i++) {
          data[this.props.data[i].code] = util.getDataByQtrType(this.props.data[i], this.props.qtrType);
      }
      console.log("expanded data: ");
      console.log(data);
    return (
      <div>
          <div className="std-param-vis">
              <div className="param-vis-elem__title">
                  { this.props.title }
              </div>
            <MultiSeriesLineChart
              size={[1200, 500]}
              data={data}
              domain={this.props.domain}
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
