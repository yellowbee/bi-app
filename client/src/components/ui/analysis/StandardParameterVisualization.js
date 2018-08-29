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

class StandardParameterVisualization extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.convertTwoArrToOneArray = this.convertTwoArrToOneArray.bind(this);
  }

   convertTwoArrToOneArray(packed, timeFormat) {
        let parseTime = timeParse(timeFormat);
        let expanded = [];
        for (let i = 0; i < packed.date.length; i++) {
            let dpt = {};
            if (this.props.dateType === 'quarter') {
                dpt = packed.val[i] ? { date: i, val: packed.val[i] } : null;
            } else {
                dpt = packed.val[i] ? { date: parseTime(packed.date[i]), val: packed.val[i] } : null;
            }

            expanded.push(dpt);
        }
        return expanded;
    };

  render() {
      // this.props.data = [packed, packed, ...]
    //let data = convertTwoArrToOneArray(this.props.data);
      //console.log("packed data")
      //console.log(this.props.data);

      // data = {"0001": [], "0002": [], ...}
      let data = {};
      for (let i=0; i < this.props.data.length; i++) {
          data[this.props.data[i].code] = this.convertTwoArrToOneArray(this.props.data[i], this.props.timeFormat);
      }
      //console.log("expanded data: ");
      //console.log(data);
    return (
      <div>
        <div style={{marginTop: "20px"}}>
            {/*<LineChart size={[1000, 500]} data={data} />*/}
            <MultiSeriesLineChart size={[1200, 500]} data={data} domain={this.props.domain} dateType={this.props.dateType}/>
        </div>
      </div>
    );
  }
}

export default StandardParameterVisualization;
