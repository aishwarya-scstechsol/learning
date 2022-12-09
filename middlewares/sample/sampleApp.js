let express = require ('express')
let compression =  require ('compression')
let cookieParser = require ('cookie-parser')
var app = express() 
let fs = require("fs")
let axios = require("axios")
let path = require("path")
const errorHandler = require('errorhandler')

let morgan = require("morgan")
//http://localhost:4000/get/hi.txt
app.use("/get" , express.static(__dirname + '/files' )) //built in middleware in express
// app.use(bodyParser()) //third party middleware ---deprecated 
app.use(express.json())
app.use(compression())

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))

app.use(cookieParser())
// app.use(errorHandler())
app.post("/post" ,(req,res) =>{
    console.log("P")
    console.log(req.body)
    c
    res.send(JSON.stringify(req.body))
})
let user = {"name" : "aish" ,"age" :22}
app.get("/hey" ,(req,res) =>{
   
res.cookie("cookie1" , user).send("cookie sent")
})

app.get("/show" ,async (req,res)=>{
    console.log("K")
    let a = await axios.get("http://localhost:1000/l")
    console.log(a)
    return a
})


app.listen(2000,() =>{
    console.log("listening")
})