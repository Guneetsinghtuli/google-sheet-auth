const sheets = require("../sheets");

const getDataFromSheet = async (SPREADSHEET_ID, range) => {
  try {
    let response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range,
    });
    return response.data.values;
  } catch (error) {
    console.log(error);
  }
};
module.exports = getDataFromSheet;
