const validator = require("validator");
const validateSignupdata = (req)=>{
    const {FirstName,LastName,emailId,Password} = req.body;
    if(!FirstName || !LastName ){
        throw new Error("FirstName and LastName are required");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Invalid email");
    }
    else if(!validator.isStrongPassword(Password)){
        throw new Error("Password is not strong");
    }
    else if(Password.length < 8){
        throw new Error("Password must be at least 8 characters long");
    }
}
module.exports={validateSignupdata}