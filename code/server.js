const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();

const app = express();

const port = process.env.port || 5000;




app.use(express.json());

app.use(errorHandler);

app.use("/api/auth", require("./routes/auth/auth_route"));

// app.use(lof)
app.listen(port,()=>{
    console.log(`Server running at port ${port}`);
})
