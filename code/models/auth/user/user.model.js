const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
    {
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        about: {
            type: String
        },
        name: {
            type: String
        },
        mobileNo: {
            type: String
        },
        profilePic:   {
            mimeType: {
                type: String,
            },
            url: {
                type: String,
            },
        },
        completeProfile:{
            type: Boolean,
            default : false,
            required : true
        }
    },
    { timestamps: true }
);


module.exports.UserSchema = mongoose.model('User',UserSchema);