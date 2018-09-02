const util = require("../ParamUtil");

let data = {
    date: [
        "1990-03",
        "1990-06",
        "1990-09",
        "1990-12",
        "1991-03",
        "1991-06",
        "1991-09",
        "1991-12"
    ],
    val: [
        null,
        0.1,
        0.2,
        0.3,
        0.4,
        0.5,
        null,
        0.6
    ],
    code: "0001"
}

test('getDataByYear retrieves yearly data from raw', () => {
    expect(util.getDataByQtrType(data, 3)).toEqual({
        startYear: "1990",
        data: [
            {date: 0, val: 0.3},
            {date: 1, val: 0.6}
        ]
    });
});