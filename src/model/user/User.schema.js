//desribe schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema= new Schema({
    
        name: {
            type:String,
            maxlength:50,
            required:true
        },
        company:{type:String,
            maxlength:50,
            required:true},
        address: {type:String,
            maxlength:50,
           },
        phone: {type:Number,
            maxlength:11,
            },
        email: {type:String,
            maxlength:50,
            required:true},
        password:{type:String,
            minLength:8,
            maxlength:100,
            required:true}
    
 });


 module.exports= {
     userSchema:mongoose.model('User', userSchema)
  }