const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const { dbConnect } = require("./config/db");
const dotenv = require("dotenv").config();

const app = express();

const port = process.env.port || 5000;



dbConnect();
app.use(express.json());
app.use(express.urlencoded({ limit: "100mb", extended: true }));
// app.use(errorHandler);


app.use(cors());
app.options("*", cors());


app.use("/api/auth", require("./routes/auth/auth_route"));


app.use("/api/hazard",require("./routes/hazard/hazard_route"));

app.listen(port,()=>{
    console.log(`Server running at port ${port}`);
})
