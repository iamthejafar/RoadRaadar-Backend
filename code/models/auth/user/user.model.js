const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
    {
        password : {
            type : String,
            required: true
        },
        email : {
            type : String,
            require : true
        },
        
    },
    { timestamps:true }
);


module.exports.UserSchema = mongoose.model('User',UserSchema);