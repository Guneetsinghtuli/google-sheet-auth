const sheets = require("../sheets");


const saveLoginCred = (spreadsheetId,values) =>{
    
      const requestBody = {
        values,
      };
      sheets.spreadsheets.values.append({
        spreadsheetId,
        range: 'Sheet2!A2:A3',
        valueInputOption:'RAW',
        requestBody,
      }, (err, result) => {
        if (err) {
          // Handle error.
          console.log(err);
        } else {
          console.log(`${result} cells appended.`);
        }
      });
}

module.exports = saveLoginCred