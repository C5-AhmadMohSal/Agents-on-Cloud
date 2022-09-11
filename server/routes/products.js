const express = require("express");

const productsRouter = express.Router();

const { CreateNewProduct } = require("../controllers/products");

productsRouter.post("/", CreateNewProduct);

module.exports = productsRouter;

// http://localhost:5000/products
// {
//     "title":"a1",
//     "description":"12",
//     "productImage":"ahmad",
//     "price":"la"
// }