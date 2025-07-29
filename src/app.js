const express = require('express');
const app = express();
app.use("hello",(req,res)=>{
res.send('hello world');
}
);
app.use("/home",(req,res)=>{
    res.send('hell0 ');
});
app.use("/zero",(req,res)=>{
    res.send('hell0 hello');
});

app.listen(4000,()=>{
    console.log('server is sucessfully listening on port 4000')
});