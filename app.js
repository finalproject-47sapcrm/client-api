require("dotenv").config();
const express = require("express")
const app= express()
const bodyParser=require("body-parser")
const cors= require("cors")
const helmet= require("helmet")
const  morgan= require("morgan")
const port = process.env.PORT || 3001
const { application } = require("express")







//api security
app.use(helmet());

//api handle cors error
app.use(cors());


//mongod connections setup
const mongoose = require('mongoose');
 mongoose.connect(process.env.MONGO_URL,/* {
     useNewUrlParser:true,
     useUnifiedTopology:true,
     useFindAndModify: false,
     useCreateIndex: true,
 } */);
if(process.env.NODE_ENV !== "production"){//development
const mdb=mongoose.connection;
mdb.on("open",()=>
{ 
    console.log("mongodb is connected")});//if mongodb is on open state then

mdb.on("error",(error)=>
{ console.log("error")});
//logger
app.use(morgan("tiny"));
}






//set body bodyParser
app.use(bodyParser.urlencoded({urlencoded:true}));
app.use(bodyParser.json());







//load routers
const userouter = require("./src/routers/user.router")
const ticketrouter = require("./src/routers/ticket.router")

// use routers

app.use("/v1/user",userouter);
app.use("/v1/ticket",ticketrouter);




app.use('/',(req, res,next)=>
{
    res.json({message :"Hi there"});
}); 

const handleError= require("./src/utils/errorHandler.js")
app.use((req, res,next)=>
{

    const error= new Error("resourcse are not  found !");
    error.status=404;
    next(error);
});
app.use((error,req, res,next)=>
{

    handleError(error,res);
});




app.listen(port,() =>
{
    console.log(`api is ready to used on http://localhost:${port}`)
} );