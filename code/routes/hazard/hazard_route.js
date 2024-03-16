const express = require("express");
const { addHazardIssue, getHazard } = require("../../controllers/hazard/hazardController");
const { uploadMultiple } = require("../../middleware/multer");
const { protect } = require("../../middleware/protect");

const app = express();


const upload = uploadMultiple("images/hazard","hazardImages",6);


app.post("/addHazard",upload, protect,  addHazardIssue);
app.get("/getHazard",protect, getHazard);

module.exports = app;