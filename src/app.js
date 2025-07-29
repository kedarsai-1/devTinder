const express = require('express');
const app = express();

app.get("/user",(req,res)=>{
    res.send({firstname:"kedar",lastname:"Nannapaneni"})
})
app.post("/user",(req,res)=>{
    res.send("Data successfully savec in database")
})
app.delete("/user",(req,res)=>{
    res.send("deleted successfully");
})
app.listen(4000,()=>{
    console.log('server is sucessfully listening on port 4000')
});