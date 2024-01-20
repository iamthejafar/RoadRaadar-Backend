const express = require("express");
const { login, signUp } = require("../../controllers/auth/authController");

const app = express();

app.get("/login", login);
app.get("/signup", signUp);


module.exports = app;