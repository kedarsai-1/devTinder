const express = require('express');
const {validateSignupdata}= require('./utils/validation');
const app = express();
const {connectDB} = require("./config/database");
const validator = require("validator");
const User = require('./models/user')
const bcrypt = require('bcrypt');
app.use(express.json());
app.post("/signup",async (req,res)=>{
    try{
    // validate the request body
    validateSignupdata(req);
     // creating a new instance of the User model
     const {FirstName,LastName,emailId,Password}= req.body;
     const passwordHesh = await bcrypt.hash(Password, 10);
     console.log(passwordHesh)
    
  const user = new User({
    FirstName,
    LastName,
    emailId,
    Password:passwordHesh
  });
   
  


 await user.save();
 res.send("user added successfully")
    }
catch(err){
  res.status(400).send("Error saving the user" +err.message)

   

}
})
app.post('/login',async (req,res)=>{
    try{
        const {emailId,Password}=req.body;
        if(!validator.isEmail(emailId)){
            throw new Error("Enter valid Email Id");
        }
       
        const user = await User.findOne({emailId:emailId});
        if(!user){
            throw new Error("Invalid Credentials");
        }
        const isPasswordValid = await bcrypt.compare(Password,user.Password);
        if(isPasswordValid){
            res.send("login Successfully");
        }
        else{
            res.send("Invalid Credentials");
        }

    }
    catch(err){
        res.status(400).send("Error"+err.message)
    }
})


//get user by email
app.get("/user",async (req,res)=>{
 const email = req.body.emailId;
    try{
        console.log(email)
        const users = await  User.findOne({emailId:email});
        if(users.length === 0){
                res.status(500).send("user not found");
            }
                else{
                    res.send(users);
                }
    }
    catch(err){
          res.status(400).send("something went wrong");
          console.log(err.message);
       
       }
//      try{
//     const users = await User.find({emailId:email});
//     if(users.length === 0){
//         res.status(500).send("user not found");
//     }
//         else{
//             res.send(users);
//         }
    
//  }
// catch(err){
//    res.status(400).send("something went wrong");
//    console.log(err.message);

// }


})

// feed api - get /feed - get all the users from database
 app.get('/feed',async (req,res)=>{
try{
    const users = await User.find({});
    res.send(users);
}
catch(err){
    res.status(400).send("something went wrong");

}
 })
 app.delete("/user",async(req,res)=>{
    const id =req.body.id
    try{
       
        const users = await User.findByIdAndDelete({_id:id})
        res.send('successfully deleted')
    }
    catch(err){
        res.status(400).send("something went wrong");
        console.log(err.message);

    }
 })
 app.patch("/user/:id",async(req,res)=>{
    try{
                    const id = req.params.id;
                    const data = req.body;
                    const ALLOWED_UPDATES = ["photoUrl","about","skills","gender","age"]; 
                    const isUpdateAllowed = Object.keys(data).every((update)=>ALLOWED_UPDATES.includes(update));
                    if(!isUpdateAllowed){
                        return res.status(400).send("Invalid updates");
                    }
        const users = await User.findByIdAndUpdate({_id:id},data,{
            returnDocument:"after",
            runValidators:true
        });
        res.send("successfully updated");

    }
    catch(err){
        res.status(400).send("something went wrong");
        console.log(err.message);

    }
 })


connectDB().then(()=>{
    console.log('Database connection established ..')
     
app.listen(4000,()=>{
    console.log('server is sucessfully listening on port 4000')
});
    }).catch(err =>{
        console.error("database cannot be connected");
        console.log(err);
    }
)



