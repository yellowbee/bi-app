import axios from "axios";
import {BI_API_ROOT_URL} from "../constants";

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

        axios.get(`${BI_API_ROOT_URL}/api/roes-hist-pred/${companies}`).then(response => {
            console.log(response.data);
            //this.setState({ fetchInProgress: false, roes: response.data });
            this.setState({ roes: response.data });
        });
    }
};

module.exports = util;
