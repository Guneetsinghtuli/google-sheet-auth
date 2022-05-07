const express = require('express')
const chalk = require('chalk')
const userRouter = require('./Router/userRouter')
const dotenv = require('dotenv')
const fetchDataRouter = require('./Router/fetchDataRouter')
const updateDataRouter = require('./Router/updateDataRouter')

const app = express()
app.use(express.json())
dotenv.config()

const PORT = process.env.PORT || 4000

app.use("/user",userRouter)
app.use("/",fetchDataRouter)
app.use("/spreadsheet",updateDataRouter)

app.get("/",(req,res)=>{
    res.send("Server is working")
})

app.listen(PORT,()=>{
    console.log(chalk.yellow(`Server is listening on port ${PORT}`))
})