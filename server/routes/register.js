const express = require("express");

const registerRouter = express.Router();

const { register } = require("../controllers/register");

registerRouter.post("/", register);

module.exports = registerRouter;

// http://localhost:5000/register
// {
//     "email":"a1",
//     "password":"12",
//     "firstName":"ahmad",
//     "lastName":"la"
// }