const mongoose = require("mongoose")

async function conn(){
    try{
        await mongoose.connect(process.env.MONGO_URI+'/test') 
        console.log("Connection Successful")
    }
    catch(err){
        console.log(err)
    } 
}

conn()