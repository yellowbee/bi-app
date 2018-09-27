/**
 * Created by bhuang on 2018/8/20.
 */

import React, { Component } from "react";
import { scaleLinear, scaleTime } from "d3-scale";
import { extent } from "d3-array";
import { select } from "d3-selection";
import { line } from "d3-shape";
import { axisBottom, axisLeft } from "d3-axis";
import { qtrType } from "../../constants";

// gridlines in x axis function
/*function make_x_gridlines(x) {
  return axisBottom(x).ticks(5);
}*/
function make_x_gridlines(x, tValues) {
    return axisBottom(x).tickValues(tValues);
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
    let legend = svg
        .selectAll(".legend")
        .data(legendText)
        .enter()
        .append("g")
        .attr("class", "legends3")
        .attr("transform", function(d, i) {
            {
                return `translate(${xOffset},` + (i * 20 + 10) + ")";
            }
        });

    legend
        .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 10)
        .attr("height", 10)
        .attr("class", function(d, i) {
            return "legend" + i;
        });

    legend
        .append("text")
        .attr("x", 20)
        .attr("y", 10)
        //.attr("dy", ".35em")
        .text(function(d, i) {
            return d;
        })
        .attr("class", "textselected")
        .style("text-anchor", "start")
        .style("font-size", 10);
}

class MultiLinePredChart extends Component {
    constructor(props) {
        super(props);
        this.createLineChart = this.createLineChart.bind(this);
        this.removePreviousChart = this.removePreviousChart.bind(this);
    }
    componentDidMount() {
        this.createLineChart();
    }
    componentDidUpdate() {
        this.removePreviousChart();
        this.createLineChart();
    }

    removePreviousChart() {
        let svg = select(this.node);
        svg.selectAll("*").remove();
    }

    createLineChart() {
        console.log("data: ");
        console.log(this.props.data);
        let svg = select(this.node);

        let shareNames = Object.keys(this.props.data);
        if (shareNames.length > 0) {
            // set the dimensions and margins of the graph
            let margin = { top: 20, right: 100, bottom: 30, left: 100 },
                width = this.props.size[0] - margin.left - margin.right,
                height = this.props.size[1] - margin.top - margin.bottom;

            svg
                .attr(
                    "viewBox",
                    //"0 0 " + Math.max(width, height) + " " + Math.min(width, height)
                    "0 0 1100 450"
                )
                .attr("preserveAspectRatio", "xMinYMin");
            //.append("g")
            //.attr("transform", "translate(" + 500 + "," + margin.top + ")");
            // append the svg object to the body of the page
            // appends a 'group' element to 'svg'
            // moves the 'group' element to the top left margin
            /*svg
                      .attr("width", width + margin.left + margin.right)
                      .attr("height", height + margin.top + margin.bottom)
                      .append("g")
                      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");*/

            // set the ranges
            let x;
            if (this.props.dateType === "quarter") {
                x = scaleLinear().range([0, width]);
            } else {
                x = scaleTime().range([0, width]);
            }
            let y = scaleLinear().range([height, 0]);
            // Scale the domains
            x.domain(
                extent(this.props.data[shareNames[0]].data, function(d) {
                    return d ? d.date : null;
                })
            );
            y.domain(this.props.domain);

            // Add the X Axis
            let originRatio =
                Math.abs(this.props.domain[1] - 0) /
                Math.abs(this.props.domain[1] - this.props.domain[0]);

            // get all non null data points
            let tValues = [];
            for (let i = 0; i < this.props.data[shareNames[0]].data.length; i++) {
                tValues.push(i);
            }
            svg
                .append("g")
                .attr("transform", "translate(30," + originRatio * height + ")")
                .call(
                    axisBottom(x)
                        .tickValues(tValues)
                        .tickFormat((d, i) => {
                            let quarter;
                            let year = 1990 + d;
                            switch (this.props.qtrType) {
                                case qtrType.FIRST:
                                    quarter = "一季报";
                                    break;
                                case qtrType.MID:
                                    quarter = "半年报";
                                    break;
                                case qtrType.THIRD:
                                    quarter = "三季报";
                                    break;
                                default:
                                    quarter = "年报";
                                    if (i >= 23) {
                                        quarter += "预测";
                                    }
                                    break;
                            }
                            return year + quarter;
                        })
                );

            svg
                .selectAll(".tick > text")
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", ".15em")
                .attr("transform", "rotate(-45)");

            // Add the Y Axis
            svg
                .append("g")
                .attr("transform", "translate(30,0)")
                .call(axisLeft(y));

            // add the X gridlines
            // To remove annoying end tick, use tickSizeOuter(0)
            svg
                .append("g")
                .attr("class", "grid")
                .attr("transform", "translate(30," + height + ")")
                .call(
                    make_x_gridlines(x, tValues)
                        .tickSize(-height)
                        .tickFormat("")
                        .tickSizeOuter(0)
                );

            // add the delimiter between history and prediction
            svg
                .append("g")
                .attr("class", "delimiter")
                .attr("transform", "translate(30," + height + ")")
                .call(
                    make_x_gridlines(x, [22.5])
                        .tickSize(-height)
                        .tickFormat("")
                        .tickSizeOuter(0)
                );

            // add the Y gridlines
            /*svg
                      .append("g")
                      .attr("class", "grid")
                      .call(
                          make_y_gridlines(y)
                              .tickSize(-width)
                              .tickFormat("")
                      );*/

            // parse the date / time
            //let parseTime = timeParse(this.props.timeFormat);

            for (let i = 0; i < shareNames.length; i++) {
                if (i > 4) {
                    // now only draws up to 5 lines
                    break;
                }

                let data = this.props.data[shareNames[i]].data;

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
                    .datum(data.slice(0, 24))
                    .attr("class", lineClass + " solid")
                    .attr("d", valueline)
                    .attr("transform", "translate(30, 0)");
                svg
                    .append("path")
                    .datum(data.slice(23, 29))
                    .attr("class", lineClass + " dashed")
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
                    .attr("transform", "translate(30, 0)")
                    .on("mouseover", function (d) {
                        let x = parseFloat(select(this).attr('cx'));
                        let y = parseFloat(select(this).attr('cy'));
                        let tipG = svg.append('g')
                            .attr("transform", "translate(" + x + ", " + (y-35) + ")")
                            .attr("class", "bi-tooltip");

                        tipG.append('rect')
                            .attr("class", "bi-tooltip__block")

                        tipG.append('text')
                            .attr("transform", "translate(10, 15)")
                            .attr("class", "bi-tooltip__block__text")
                            .text(d.val);

                    })
                    .on("mouseout", function () {
                        svg.selectAll('.bi-tooltip').remove();
                    })
            }

            addLegend(svg, shareNames, this.props.size[0] - 400);
        }
    }

    render() {
        return (
            <div>
                <div className="line-chart-wrapper">
                    {this.props.data && <svg ref={node => (this.node = node)}/>}
                </div>
            </div>
        );
    }
}
export default MultiLinePredChart;
