const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./models/db")

const app = express();
app.use(express.json());
app.use(cors());

//routes
const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");


//.use
app.use("/register", registerRouter);
app.use("/login", loginRouter);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server on PORT ${PORT}`);
});
