//Add a new item to the website.
//Edit or delete item (only the user who added the item can delete or edit it).

const connection = require("../models/db");

const CreateNewProduct = (req, res) => {
    const user_id = req.token.userId;
  const img = `https://m.media-amazon.com/images/I/61zanx+VVkL._SX522_.jpg`;
  const { title, description, productImage, price } = req.body;
  const query = `INSERT INTO products (
              title,
              description,
              productImage,
              price,
              user_id)
               VALUES (?,?,?,?,?);`;
  const data = [title, description, productImage || img, price,user_id];

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

module.exports = {
  CreateNewProduct,
  };