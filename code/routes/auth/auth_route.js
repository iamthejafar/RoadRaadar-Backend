const express = require("express");
const { login } = require("../../controllers/auth/authController");

const app = express();

app.get(login);