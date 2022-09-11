const connection = require("../models/db");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const query = `INSERT INTO users(
    email,
    password,
    firstName,
    lastName
) VALUES(?,?,?,?)`;

  const data = [email.toLowerCase(), hashedPassword, firstName, lastName];

  connection.query(query, data, (err, result) => {
    if (err) {
      console.log(err);
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(409).json({
          success: false,
          message: "Email Already Exist",
          err: err.message,
        });
      }
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Server Error",
        err: err.message,
      });
    }
    res.status(201).json({
      success: true,
      message: `Account Created Successfully`,
      result: result,
    });
  });
};
module.exports = { register };
