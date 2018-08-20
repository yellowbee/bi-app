import React, { Component } from "react";
//import LineChart from "../../data-vis/LineChart";
import MultiSeriesLineChart from "../../data-vis/MultiSeriesLineChart";
import { timeParse } from "d3-time-format";

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
const convertTwoArrToOneArray = packed => {
  let parseTime = timeParse("%Y-%m");
  let expanded = [];
  for (let i = 0; i < packed.date.length; i++) {
    expanded.push(
      packed.val[i] ? { date: parseTime(packed.date[i]), val: packed.val[i] } : null
    );
  }
  return expanded;
};

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
          data[this.props.data[i].code] = convertTwoArrToOneArray(this.props.data[i]);
      }
      //console.log("expanded data: ");
      //console.log(data);

    return (
      <div>
        <div
          style={{ width: "100%", backgroundColor: "#d0e7f2", textAlign: "center", padding: "5px 0" }}
        >
          ROE (净资产收益率)
        </div>
        <div style={{marginTop: "20px"}}>
            {/*<LineChart size={[1000, 500]} data={data} />*/}
            <MultiSeriesLineChart size={[1000, 500]} data={data} />
        </div>
      </div>
    );
  }
}

export default StandardParameterVisualization;
