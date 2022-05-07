const getDataFromSheet = require("../Functions/getData");

const fetchDataFromSheet = async (req, res, next) => {
  let spreadsheetId = req.params.id;
  if (!spreadsheetId) {
    return res.send({
      success: false,
      message: "SpreadsheetId is missing",
    });
  }

  let data = await getDataFromSheet(spreadsheetId, "Sheet1");
  let result = [];
  for (let index = 0; index < data.length; index++) {
    let obj = Object.assign({}, data[index]);
    result.push(obj);
  }
  res.status(200).json({
    success: true,
    data: result,
  });
};

module.exports = {
  fetchDataFromSheet,
};
