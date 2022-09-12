const express = require("express");

const productsRouter = express.Router();

const {
  CreateNewProduct,
  getAllProduct,
  DeleteProductById,
  updateProductById,
  getAllProductByUserId,
  getOneProductById,
} = require("../controllers/products");
const authentication = require("../middlewares/authentication");

productsRouter.post("/CreateNewProduct", authentication, CreateNewProduct);
productsRouter.get("/getAllProduct", getAllProduct);
productsRouter.delete("/DeleteProductById/:id", DeleteProductById);
productsRouter.put("/updateProductById/:id", updateProductById);
productsRouter.get(
  "/getAllProductByUserId",
  getAllProductByUserId
);
productsRouter.get("/getOneProductById/:id", getOneProductById);

module.exports = productsRouter;