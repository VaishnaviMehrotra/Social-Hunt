const mongoose = require('mongoose');
require("dotenv").config();

async function dbConnect(){
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            useCreateIndex: true,
            useFindAndModify:false,
            useNewUrlParser: true,
            useUnifiedTopology:true,
        });
        console.log("DB connected");
    }
    catch(err){
        console.log("DB Failed to Connect");
        console.log(err);
        process.exit(1);
    }
}
module.exports = dbConnect;