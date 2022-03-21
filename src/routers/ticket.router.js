const express = require("express")
 const router = express.Router();

// router.post/.get/.all
 router.all("/",(req, res , next) =>{
     res.json({message:"return from ticket router"});
 });


 module.exports= router;//export the router