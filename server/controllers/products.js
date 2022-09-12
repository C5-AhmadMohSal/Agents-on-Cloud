//Add a new item to the website.
//Edit or delete item (only the user who added the item can delete or edit it).

const connection = require("../models/db");

const CreateNewProduct = (req, res) => {
    const id = req.token.userId;
  const img = `https://m.media-amazon.com/images/I/61zanx+VVkL._SX522_.jpg`;
  const { title, description, productImage, price } = req.body;
  const query = `INSERT INTO products (
              title,
              description,
              productImage,
              price,
              user_id)
               VALUES (?,?,?,?,?);`;
  const data = [title, description, productImage || img, price,id];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server error",
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      massage: "product created",
      result: result,
    });
  });
};

const getAllProduct = (req, res) => {
  const query = "select * FROM products WHERE products.is_deleted=0" ;
  connection.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "server error",
        err: err,
      });
    }
 
    res.status(200).json({
      success: true,
      massage: "All products",
      result: result,
    });
  });
};


const DeleteProductById = (req, res) => {
  const id = req.params.id;
  const query = `UPDATE products SET is_deleted=1 WHERE id=?;`;
  const data = [id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server Error",
        err: err,
      });
    }
    if (!result.changedRows) {
      return res.status(404).json({
        success: false,
        massage: `The product: ${id} is not found`,
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      massage: `Succeeded to delete product with id: ${id}`,
      result: result,
    });
  });
};

const updateProductById = (req, res) => {
    const {
      title,
      description,
      productImage,
      price,
    } = req.body;
    const id = req.params.id;
    const istitle = title ? true : false;
    const isdescription = description ? true : false;
    const isproductImage = productImage ? true : false;
    const isprice = price ? true : false;


    const query = `UPDATE products SET 
    title=IF(${istitle},?,title),
    description=IF(${isdescription},?,description),
    productImage=IF(${isproductImage},?,productImage),
    price=IF(${isprice},?,price)
    WHERE id=? AND is_deleted=0 ;`;
    const data = [
      title,
      description,
      productImage,
      price,
      id,
    ];

    connection.query(query, data, (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          massage: "server err",
          err: err,
        });
      }
      if (!result) {
        return res.status(404).json({
          success: false,
          massage: `there is no  product whith id: ${id} `,
          err: err,
        });
      }
      if (!result.changedRows) {
        return res.status(404).json({
          success: false,
          massage: `there is no changes to the product id: ${id} `,
          err: err,
        });
      }

      res.status(200).json({
        success: true,
        massage: `Succeeded to update product with id: ${id}`,
        result: result,
      });
    });
  };

  const getAllProductByUserId = (req, res) => {
    const user_id = req.token.userId;
    // const query = `select * FROM products WHERE user_id=? AND products.is_deleted=0` ;
    const query = `SELECT * FROM products WHERE products.user_id=? AND favorites.is_deleted=0`;
    const data = [user_id];

    connection.query(query,data, (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          massage: "server error",
          err: err,
        });
      }
      res.status(200).json({
        success: true,
        massage: `All products for the user with the id =>${id}`,
        result: result,
      });
    });
  };

  const getOneProductById = (req, res) => {
    const id = req.params.id;
    const query = `SELECT * FROM products WHERE products.is_deleted=0 AND products.id=?`;
    const data = [id];
  
    connection.query(query, data, (err, result) => {
      if (err) {
       return res.status(500).json({
          success: false,
          massage: "Server Error",
          err: err,
        });
      }
      if (!result.length) {
        return  res.status(404).json({
          success: false,
          massage: "The product is Not Found",
        });
      }
      res.status(200).json({
        success: true,
        massage: `The product of this  ${id}`,
        result: result,
      });
    });
  };

module.exports = {
  CreateNewProduct,
  getAllProduct,
  DeleteProductById,
  updateProductById,
  getAllProductByUserId,
  getOneProductById,
  };