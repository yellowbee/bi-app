/**
 * Common util functions.
 * Date: 2018/10/05
 */

const util = {
  /**
   * find the stock name by stock code
   * @param stocks the array of stock objects
   * @param stockCode code of the stock to search for
   * @return stock name
   */
  getStockName: function(stocks, stockCode) {
    for (let stock of stocks) {
      if (stock.value === stockCode) {
        return stock.label;
      }
    }
  },

  /**
   * scroll event handler to implement infinite scroll
   * handleScroll needs to be binded where it's called
   * callback contains the actual code to execute when
   * the "scroll to bottom" event happens
   */
  handleScroll(callback) {
    const windowHeight =
      "innerHeight" in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      /*this.setState({
                message:'bottom reached'
            });*/
      console.log("bottom reached");
      callback();
    } else {
      /*this.setState({
                message:'not at bottom'
            });*/
      console.log("not at bottom");
    }
  }
};

module.exports = util;