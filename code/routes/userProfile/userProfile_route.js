

const express = require("express");
const { uploadMultiple } = require("../../middleware/multer");
const { completeUserProfile, editUserProfile, getUserProfile } = require("../../controllers/userProfile/userProfileController");

const app = express();


const upload = uploadMultiple("images/profile","profilePic",1);


app.post("/completeProfile",upload, completeUserProfile);
app.put("/editProfile",upload, editUserProfile);
app.get("/getProfile",getUserProfile);



module.exports = app;