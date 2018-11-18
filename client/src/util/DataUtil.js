import axios from "axios";
import { BI_API_ROOT_URL, qtrType } from "../constants";
import ParamUtil from "./ParamUtil";

/**
 * Util module for retrieving data via REST api.
 *
 * Date: 2018/9/23
 */

const util = {
  /**
   * Get predicted roes. "this" needs to be binded where this function is called.
   * @param mainIdx, cannot be undefined
   * @param peers, can be undefined which means no peers needed
   */
  getPredRoes: function(mainIdx, peers) {
    if (mainIdx === undefined) {
      mainIdx = this.state.selectedIndex;
    }
    //this.setState({ fetchInProgress: true });
    let mainCompanyVal = this.props.state.mainShares[mainIdx].value;
    let companies = `codes=${mainCompanyVal}`;
    //let peers = this.props.state.paramAnalysis.peers ? this.props.state.paramAnalysis.peers : [];

    if (peers !== undefined) {
      peers = peers ? peers : [];
      for (let i = 0; i < peers.length; i++) {
        let peerVal = peers[i].value;
        companies += `&codes=${peerVal}`;
      }
    }

    axios
      .get(`${BI_API_ROOT_URL}/api/roes-hist-pred/${companies}`)
      .then(response => {
        console.log(response.data);
        //this.setState({ fetchInProgress: false, roes: response.data });
        this.setState({ roes: response.data });
      });
  },

  /**
   * convert data from [{date: [], val: [], code}, ...] to
   * {'000000.SH': {}, '000001': {}, ...}
   */
  convertDataFormat: function(data) {
    let converted = {};
    let max = 0;
    let min = 0;

    for (let i = 0; i < data.length; i++) {
      converted[data[i].code] = ParamUtil.getDataByQtrType(data[i]);
      let curMax = Math.max(...data[i].val);
      let curMin = Math.min(...data[i].val);
      max = max > curMax ? max : curMax;
      min = min < curMin ? min : curMin;
    }
    max = max <= 99 ? max : 120;
    min = min >= -99 ? min : -120;

    return { converted, max, min };
  },

  prepDaData: function(data) {
    let converted = {};
    let max = 0.2;
    let min = -0.2;

    for (let i = 0; i < data.length; i++) {
      converted[data[i].code] = ParamUtil.getDataByQtrType(data[i]);
      converted[data[i].code].violation = data[i].violation;

      let curMax = Math.max(...data[i].val);
      let curMin = Math.min(...data[i].val);
      max = max > curMax ? max : curMax;
      min = min < curMin ? min : curMin;
    }

    max = max <= 99 ? max : 120;
    min = min >= -99 ? min : -120;

    return { converted, max, min };
  },

  /**
   * prep stands for pre-process, which is the operation to
   * convert data format from db to ui
   *
   * @param data the data returned by /api/x-hist-pred
   */
  prepHistPredCombo(data) {
    // hist = [{code, date, val}, ..., {}]
    let hist = data.hist;
    // pred = [{code, date, val}, ..., {}]
    let pred = _.keyBy(data.pred, "code");

    let converted = {};
    let max = 0;
    let min = -5;
    for (let i = 0; i < hist.length; i++) {
      let code = hist[i].code;
      converted[code] = ParamUtil.getDataByQtrType(hist[i], qtrType.YEAR);
      let curPred = pred[code];

      // replace the last few years' data with predicted data
      for (let i = 0; i < curPred.val.length; i++) {
        let idxToPred = converted[code].data.length - curPred.val.length + i;
        converted[code].data[idxToPred] = {
          date: idxToPred,
          val: curPred.val[i] ? curPred.val[i] : null
        };
      }

      //let curMax = Math.max(...this.props.data[i].val, ...curPred.val);
      //let curMin = Math.min(...this.props.data[i].val, ...curPred.val);
      let curMax = Math.max(...hist[i].val, ...curPred.val);
      let curMin = Math.min(...hist[i].val, ...curPred.val);
      max = max > curMax ? max : curMax;
      min = min < curMin ? min : curMin;
    }

    max = max <= 99 ? max : 120;
    min = min >= -99 ? min : -120;

    return { converted, max, min };
  }
};

module.exports = util;
