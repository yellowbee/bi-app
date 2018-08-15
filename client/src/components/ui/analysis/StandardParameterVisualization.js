import React, { Component } from "react";
import LineChart from "../../data-vis/LineChart";
import { timeParse } from "d3-time-format";

/**
 * data = [
 *            date: [...],
 *            val: [...]
 *        ]
 */
const convertTwoArrToOneArray = data => {
  let parseTime = timeParse("%Y-%m");
  let newArray = [];
  for (let i = 0; i < data.date.length; i++) {
    newArray.push(
      data.val[i] ? { date: parseTime(data.date[i]), val: data.val[i] } : null
    );
  }
  return newArray;
};

class StandardParameterVisualization extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    console.log(this.props.data);
    let data = convertTwoArrToOneArray(this.props.data);
    console.log(data);
    return (
      <div>
        <div
          style={{ width: "100%", backgroundColor: "#d0e7f2", textAlign: "center", padding: "5px 0" }}
        >
          ROE (净资产收益率)
        </div>
        <div style={{marginTop: "20px"}}>
            <LineChart size={[1000, 500]} data={data} />
        </div>
      </div>
    );
  }
}

export default StandardParameterVisualization;
