const mongoose = require('mongoose');
const connectDB = async()=>{
    await mongoose.connect(
        "mongodb+srv://kedar:00puUSqw7agrCQIe@node.4meexer.mongodb.net/devTinder"
    )
}
module.exports = {connectDB}


