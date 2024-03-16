

const express = require("express");
const { uploadMultiple } = require("../../middleware/multer");
const { completeUserProfile, editUserProfile, getUserProfile } = require("../../controllers/userProfile/userProfileController");
const { protect } = require("../../middleware/protect");

const app = express();


const upload = uploadMultiple("images/profile","profilePic",1);


app.post("/completeProfile",upload, protect, completeUserProfile);
app.put("/editProfile",upload, protect, editUserProfile);
app.get("/getProfile", protect, getUserProfile);



module.exports = app;