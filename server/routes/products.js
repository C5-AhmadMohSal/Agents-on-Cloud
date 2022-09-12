const express = require("express");

const productsRouter = express.Router();

const { CreateNewProduct,getAllProduct,DeleteProductById,updateProductById } = require("../controllers/products");
const authentication = require("../middlewares/authentication");

productsRouter.post("/CreateNewProduct", authentication, CreateNewProduct);
productsRouter.get("/getAllProduct", getAllProduct);
productsRouter.delete("/delete_product/:id", DeleteProductById);
productsRouter.put("/updateProductById/:id", updateProductById);



module.exports = productsRouter;

// http://localhost:5000/products
// {
//     "title":"a1",
//     "description":"12",
//     "productImage":"ahmad",
//     "price":"la"
// }
