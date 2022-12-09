let express = require("express")
var app = express()
let cors =  require ("cors")
app.use(cors())
app.get('/l' , (req,res) => {
    console.log("**")
    return "boom"
})
app.listen(1000)