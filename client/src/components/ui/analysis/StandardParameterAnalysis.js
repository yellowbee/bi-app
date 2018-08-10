import React, { Component } from "react";
import LineChart from "../../data-vis/LineChart";
import { timeParse } from "d3-time-format";

/**
 * data = [
 *            date: [...],
 *            val: [...]
 *        ]
 */
const convertTwoArrToOneArray = (data) => {
    let parseTime = timeParse("%Y-%m");
  let newArray = [];
  for (let i=0; i<data.date.length; i++) {
      newArray.push(data.val[i] ? {date: parseTime(data.date[i]), val: data.val[i]} : null);
  }
  return newArray;
};

class StandardParameterAnalysis extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
    }

    render() {
        console.log(this.props.data);
        let data = convertTwoArrToOneArray(this.props.data);
        console.log(data);
        return (
            <div>
                <LineChart
                    size={[1000, 500]}
                    data={data}
                />
            </div>
        );
    }
}

export default StandardParameterAnalysis;
