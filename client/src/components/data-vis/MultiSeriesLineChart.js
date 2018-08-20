/**
 * Created by bhuang on 2018/8/20.
 */

import React, { Component } from "react";
import { scaleLinear, scaleTime } from "d3-scale";
import { timeParse } from "d3-time-format";
import { max, extent } from "d3-array";
import { select } from "d3-selection";
import { line, curveBasis } from "d3-shape";
import { axisBottom, axisLeft } from "d3-axis";

// gridlines in x axis function
function make_x_gridlines(x) {
    return axisBottom(x).ticks(5);
}
// gridlines in y axis function
function make_y_gridlines(y) {
    return axisLeft(y).ticks(5);
}

/**
 *
 * @param svg
 * @param legendText
 */
function addLegend(svg, legendText, xOffset) {
    //D3 Vertical Legend
    let legend = svg.selectAll('.legend')
        .data(legendText)
        .enter().append('g')
        .attr("class", "legends3")
        .attr("transform", function (d, i) {
            {
                return `translate(${xOffset},` + i * 20 + ")"
            }
        })

    legend.append('rect')
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 10)
        .attr("height", 10)
        .attr("class", function (d, i) {
            return "legend" + i;
        });

    legend.append('text')
        .attr("x", 20)
        .attr("y", 10)
        //.attr("dy", ".35em")
        .text(function (d, i) {
            return d
        })
        .attr("class", "textselected")
        .style("text-anchor", "start")
        .style("font-size", 10)
}

class MultiSeriesLineChart extends Component {
    constructor(props) {
        super(props);
        this.createLineChart = this.createLineChart.bind(this);
    }
    componentDidMount() {
        this.createLineChart();
    }
    componentDidUpdate() {
        this.createLineChart();
    }
    createLineChart() {
        let svg = select(this.node);
        let shareNames = Object.keys(this.props.data);

        // set the dimensions and margins of the graph
        let margin = { top: 20, right: 20, bottom: 30, left: 50 },
            width = this.props.size[0] - margin.left - margin.right,
            height = this.props.size[1] - margin.top - margin.bottom;

        // append the svg object to the body of the page
        // appends a 'group' element to 'svg'
        // moves the 'group' element to the top left margin
        svg
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // set the ranges
        let x = scaleTime().range([0, width]);
        let y = scaleLinear().range([height, 0]);
        // Scale the domains
        x.domain(
            extent(this.props.data[shareNames[0]], function(d) {
                return d ? d.date : null;
            })
        );
        y.domain([-20, 40]);

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

        // add the X gridlines
        /*svg
            .append("g")
            .attr("class", "grid")
            .attr("transform", "translate(0," + height + ")")
            .call(
                make_x_gridlines(x)
                    .tickSize(-height)
                    .tickFormat("")
            );
        // add the Y gridlines
        svg
            .append("g")
            .attr("class", "grid")
            .call(
                make_y_gridlines(y)
                    .tickSize(-width)
                    .tickFormat("")
            );*/

        // parse the date / time
        let parseTime = timeParse("%Y-%m");

        for (let i=0; i<shareNames.length; i++) {
            if (i > 4) { // now only draws up to 5 lines
                break;
            }

            let data = this.props.data[shareNames[i]];

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

            // Add the valueline path.
            let lineClass = "line" + i;
            svg
                .append("path")
                .datum(data)
                .attr("class", lineClass)
                .attr("d", valueline)
                .attr("transform", "translate(30, 0)");

            // Add the dots
            let dotClass = ".dot" + i;
            let dotAttrClass = "dot" + i;
            svg
                .selectAll(dotClass)
                .data(
                    data.filter(function(d) {
                        return d;
                    })
                )
                .enter()
                .append("circle")
                .attr("class", dotAttrClass)
                .attr("cx", valueline.x())
                .attr("cy", valueline.y())
                .attr("r", 3.5)
                .attr("transform", "translate(30, 0)");
        }

        addLegend(svg, shareNames, this.props.size[0]-100);

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
export default MultiSeriesLineChart;
