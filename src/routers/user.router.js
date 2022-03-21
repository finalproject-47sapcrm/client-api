 const express = require("express")
 const router = express.Router();
 const {insertUser} = require("../model/user/User.model")
 const {hashPassword}= require("../helpers/bcrypt.helper")
// router.post/.get/.all
 router.all("/",(req, res , next) =>{

    //console.log(name);
     //res.json({message:"return from user router"});
     next();
 });

router.post("/", async(req,res)=>{
//res.json(req.body);
const {name,company,address,email,password}= req.body;


try{


    const hashedPass=await hashPassword(password)
    const newUserObj={name,company,address,email,
        password:hashedPass,};
    const result= await insertUser(newUserObj)
    console.log(result);
    res.json({message :"new user created",result});
}catch(error){ 
    console.log(error);
    res.json({status:"error", message: error.message });
}



});





 module.exports= router;//export the router