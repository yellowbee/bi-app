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
    const data = this.props.data;
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
              return d.date;
          })
      );
      /*y.domain([
          0,
          max(data, function(d) {
              return d.val;
          })
      ]);*/
      console.log(max(data, function (d) {
          return d.val;
      }));
      y.domain([0, 20]);

    // define the line
    let valueline = line()
      //.curve(curveBasis)
      .x(function(d) {
        return x(d.date);
      })
      .y(function(d) {
        return y(d.val);
      });

      // define the line2
      let valueline2 = line()
      //.curve(curveBasis)
          .x(function(d) {
              return x(d.date);
          })
          .y(function(d) {
              return y(d.val2);
          });

    // append the svg obgect to the body of the page
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
          .datum(data)
          .attr("class", "line2")
          .attr("d", valueline2)
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
          return axisBottom(x)
              .ticks(5)
      }
      // gridlines in y axis function
      function make_y_gridlines() {
          return axisLeft(y)
              .ticks(5)
      }
      // add the X gridlines
      svg.append("g")
          .attr("class", "grid")
          .attr("transform", "translate(0," + height + ")")
          .call(make_x_gridlines()
              .tickSize(-height)
              .tickFormat("")
          )
    // add the Y gridlines
      svg.append("g")
          .attr("class", "grid")
          .call(make_y_gridlines()
              .tickSize(-width)
              .tickFormat("")
          )
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
