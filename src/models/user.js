const validator = require('validator');
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    FirstName: {
        type: String,
        required:true,
        maxLength:50,
        trim:true
    },
    LastName: {
        type: String,
     
    },
    emailId: {
        type: String,
        required:true,
        unique:true ,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email");
            }
        }
    },
    Password: {
        type: String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password must be strong");
            }
        }   
    },
    age:{
        type:Number ,
        min:18
    },
    gender:{
        type:String,
        validate(value){
            if(value !== "male" && value !== "female" && value !== "other"){
                throw new Error("Gender must be either male or female or other")
            }
        }
    },
    photoUrl:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid photo URL");
            }
        }
    },
    about:{
        type:String,
        default:"This is a default about of the user "
    },
    skills:{
        type:[String],
        maxLength:10,
        validate(value){
            if(value.length > 10){
                throw new Error("Skills must be less than 10");
            }
        }   
       
    }
   

},
{
    timestamps:true
});
module.exports=mongoose.model("User",userSchema);
