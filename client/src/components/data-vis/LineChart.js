/**
 * Created by bhuang on 7/22/18.
 */

import React, { Component } from "react";
import { scaleLinear, scaleTime } from "d3-scale";
import { timeParse } from "d3-time-format";
import { max, extent } from "d3-array";
import { select } from "d3-selection";
import { line, curveBasis } from "d3-shape";
import { axisBottom, axisLeft } from "d3-axis";

class LineChart extends Component {
  constructor(props) {
    super(props);
    this.createBarChart = this.createBarChart.bind(this);
  }
  componentDidMount() {
    this.createBarChart();
  }
  componentDidUpdate() {
    this.createBarChart();
  }
  createBarChart() {
    let shareNames = Object.keys(this.props.data);
    const data = this.props.data[shareNames[0]];
    const data2 = this.props.data[shareNames[1]];

    let svg = select(this.node);
    //let g = select(svg).append('g');

    // set the dimensions and margins of the graph
    let margin = { top: 20, right: 20, bottom: 30, left: 50 },
      width = this.props.size[0] - margin.left - margin.right,
      height = this.props.size[1] - margin.top - margin.bottom;

    // parse the date / time
    let parseTime = timeParse("%Y-%m");

    // set the ranges
    let x = scaleTime().range([0, width]);
    let y = scaleLinear().range([height, 0]);

    // Scale the range of the data
    x.domain(
      extent(data, function(d) {
        return d ? d.date : null;
      })
    );
    y.domain([-20, 40]);

    // set the ranges
    let x2 = scaleTime().range([0, width]);
    let y2 = scaleLinear().range([height, 0]);

    // Scale the range of the data
    x2.domain(
      extent(data2, function(d) {
        return d ? d.date : null;
      })
    );
    y2.domain([-20, 40]);

    // define the line
    let valueline = line()
      //.curve(curveBasis)
      .defined(function(d) {
        return d;
      })
      .x(function(d) {
        return x(d.date);
      })
      .y(function(d) {
        return y(d.val);
      });

    // define the line2
    let valueline2 = line()
      .defined(function(d) {
        return d;
      })
      .x(function(d) {
        return x2(d.date);
      })
      .y(function(d) {
        return y2(d.val);
      });

    // append the svg object to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // format the data
    /*data.forEach(function(d) {
                d.date = parseTime(d.date);
                d.val = +d.val;
            });*/

    // Add the valueline path.
    svg
      .append("path")
      .datum(data)
      .attr("class", "line1")
      .attr("d", valueline)
      .attr("transform", "translate(30, 0)");

    // add valueline2 path
    svg
      .append("path")
      .datum(data2)
      .attr("class", "line2")
      .attr("d", valueline2);
    //.attr("transform", "translate(30, 0)");

    // Add the X Axis
    svg
      .append("g")
      .attr("transform", "translate(30," + height + ")")
      .call(axisBottom(x));

    // Add the Y Axis
    svg
      .append("g")
      .attr("transform", "translate(30,0)")
      .call(axisLeft(y));

    // gridlines in x axis function
    function make_x_gridlines() {
      return axisBottom(x).ticks(5);
    }
    // gridlines in y axis function
    function make_y_gridlines() {
      return axisLeft(y).ticks(5);
    }
    // add the X gridlines
    svg
      .append("g")
      .attr("class", "grid")
      .attr("transform", "translate(0," + height + ")")
      .call(
        make_x_gridlines()
          .tickSize(-height)
          .tickFormat("")
      );
    // add the Y gridlines
    svg
      .append("g")
      .attr("class", "grid")
      .call(
        make_y_gridlines()
          .tickSize(-width)
          .tickFormat("")
      );

    svg
      .selectAll(".dot")
      .data(
        data.filter(function(d) {
          return d;
        })
      )
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", valueline.x())
      .attr("cy", valueline.y())
      .attr("r", 3.5)
      .attr("transform", "translate(30, 0)");

    svg
      .selectAll(".dot2")
      .data(
        data2.filter(function(d) {
          return d;
        })
      )
      .enter()
      .append("circle")
      .attr("class", "dot2")
      .attr("cx", valueline2.x())
      .attr("cy", valueline2.y())
      .attr("r", 3.5);
    //.attr("transform", "translate(30, 0)");
  }

  render() {
    return (
      <svg
        ref={node => (this.node = node)}
        width={this.props.size[0]}
        height={this.props.size[1]}
      />
    );
  }
}
export default LineChart;
