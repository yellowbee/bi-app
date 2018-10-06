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
  }
};

module.exports = util;