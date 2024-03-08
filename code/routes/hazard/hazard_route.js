const express = require("express");
const { addHazardIssue, getHazard } = require("../../controllers/hazard/hazardController");
const { uploadMultiple } = require("../../middleware/multer");

const app = express();


const upload = uploadMultiple("images/hazard","hazardImages",6);


app.post("/addHazard",upload, addHazardIssue);
app.get("/getHazard",upload, getHazard);



module.exports = app;