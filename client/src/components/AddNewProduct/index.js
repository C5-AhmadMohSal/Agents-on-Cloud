//if the user is login
// he,she will be apile to creat a new product
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const AddNewProduct = () => {
  const dispatch = useDispatch();
  const { token, isLoggedIn } = useSelector((state) => {
    return { token: state.auth.token, isLoggedIn: state.auth.isLoggedIn };
  });

  // title,
  // description,
  // productImage,
  // price,
  // user_id

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescriptin] = useState("");
  const [productImage, setProductimg] = useState("");
  const [price, setPrice] = useState("");

  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);

  const NewProduct = async (e) => {
    e.preventDefault();
    try {
      const product = {
        title,
        description,
        productImage,
        price,
      };
      const result = await axios.post(
        `http://localhost:5000/products/CreateNewProduct`,

        { title, description, productImage, price },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (result.data.success) {
        setStatus(true);
        setMessage(`${title} created`);
        console.log(result.data.result.insertId);
      }
      console.log(product);
    } catch (error) {
      if (!error.response.data.success) {
        setStatus(false);
        setMessage(error.response.data.message);
      }
    }
  };
  return (
    <>
      <form
        onSubmit={
          NewProduct

          // navigate(`/`);
        }
      >
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Title</label>
          <div className="col-sm-10">
            {" "}
            <input
              className="form-control"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Descriptin</label>
          <div className="col-sm-10">
            <input
              className="form-control"
              type="text"
              onChange={(e) => setDescriptin(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Productimg</label>
          <div className="col-sm-10">
            <input
              className="form-control"
              type="text"
              onChange={(e) => setProductimg(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Price</label>
          <div className="col-sm-10">
            <input
              className="form-control"
              type="text"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>

        <button>Create New product</button>
      </form>

      {status
        ? message && <div className="SuccessMessage">{message}</div>
        : message && <div className="ErrorMessage">{message}</div>}
    </>
  );
};

export default AddNewProduct;
