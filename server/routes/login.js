const express = require("express");

const loginRouter = express.Router();

const login = require("../controllers/login");

loginRouter.post("/", login);

module.exports = loginRouter;

// http://localhost:5000/login
// {
//     "email":"a1",
//     "password":"12",
// }