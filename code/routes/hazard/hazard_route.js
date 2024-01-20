const express = require("express");
const { addHazardIssue } = require("../../controllers/hazard_issue/hazardIssueController");

const app = express();


app.post("/addHazard", addHazardIssue);



module.exports = app;