/**
 * Util module for preprocessing accounting parameter data.
 *
 * Date: 2018/9/1
 */

/**
 *
 * @param data packed data = {
 *                            code: "0001",
 *                            date: ["1990-03", ...],
 *                            val: [...]
 *                          }
 * @param qtrType: 1st qtr = 0, 2nd qtr = 1, 3rd qtr = 2, year = 3
 */

const util = {
    getDataByQtrType: (data_raw, qtrType) => {

        let startYear = data_raw.date[0].split("-")[0];

        let val = data_raw.val.filter((d, i) => {
            switch(qtrType) {
                case 0:
                    return i % 4 === 0; // only get 1st qtr
                    break;
                case 1:
                    return i % 4 === 1; // only get 2nd qtr
                    break;
                case 2:
                    return i % 4 === 2; // only get 3rd qtr
                    break;
                default:
                    return i % 4 === 3; // year by default
            }
        });

        let data = [];
        for (let i=0; i<val.length; i++) {
            data.push(val[i] ? {date: i, val: val[i]} : null);
        }

        return { startYear, data };
    }
};

module.exports = util;