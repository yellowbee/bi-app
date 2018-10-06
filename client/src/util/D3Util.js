/**
 * util functions for d3 data visualization.
 * Date: 2018/10/05
 */
const commonUtil = require("./CommonUtil");

const util = {
  addLegend: function(svg, legendText, xOffset, stocks) {
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
        return commonUtil.getStockName(stocks, d) + "(" + d + ")";
      })
      .attr("class", "textselected")
      .style("text-anchor", "start")
      .style("font-size", 10);
  }
};

module.exports = util;
