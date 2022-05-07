const sheets = require("../sheets");

const changeData = (spreadsheetId,range,value) =>{
    let values = [
        [
          value
        ]
      ];
      const requestBody = {
        values,
      };
      sheets.spreadsheets.values.update({
        spreadsheetId,
        range,
        valueInputOption: 'RAW',
        requestBody,
      }, (err, result) => {
        if (err) {
          // Handle error
          console.log(err);
        } else {
          console.log('%d cells updated.', result.updatedCells);
        }
      });
}

module.exports = {
    changeData
}