const mongoose = require("mongoose")


async function dbConnect() {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDb');

    } catch(e){
        console.log(e);
    }
}


module.exports = {dbConnect};
