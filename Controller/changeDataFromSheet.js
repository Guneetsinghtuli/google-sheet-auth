const { changeData } = require("../Functions/changeData")


const changeDataFromSheet = async(req,res,next) =>{
    try {
        const {spreadsheet_id, sheet_id, row_number, column_number, value} = req.body
        let parsed_Row = parseInt(row_number,10)
        let parsed_Col = parseInt(column_number,10)

        if(!spreadsheet_id || !sheet_id || !row_number || !column_number || !value){
            return res.status(422).json({
                success: false,
                message: "Missing data in query"
            })
        }
        if(parsed_Row < 1 || parsed_Col < 1){
            return res.status(422).json({
                success: false,
                message: "Row number and column number cannot be smaller than 1"
            })
        }

        if(typeof parsed_Row != 'number' && typeof parsed_Col != 'number'){
            return res.status(422).json({
                success: false,
                message: "Row and column must be a number"
            })
        }

        var chr = String.fromCharCode(64 + parsed_Col);
        let range = `Sheet${sheet_id}!${chr}${parsed_Row}:${chr}${parsed_Row + 1}`
        await changeData(spreadsheet_id,range,value)
        return res.send({
            success: true
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal server  occured",
            error:error
        })
    }

}

module.exports = {
    changeDataFromSheet
}