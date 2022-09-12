//if the user is login 
// he,she will be apile to creat a new product
import React, {useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

const AddNewProduct = ()=>{
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
            price
           };
        const result = await axios.post(
          `http://localhost:5000/products/CreateNewProduct`,

          {title,
          description,
          productImage,
          price,},
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
      {/* <product/> */}
        <form onSubmit={NewProduct
        
        // navigate(`/`);
        }>
          <br />
          <input
            type="text"
            placeholder="product Name here"
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />

          <input
            type="text"
            placeholder="product description here"
            onChange={(e) => setDescriptin(e.target.value)}
          />
          <br />
          <input
            type="text"
            placeholder="product img here"
            onChange={(e) => setProductimg(e.target.value)}
          />
          <br />
          <input
            type="text"
            placeholder="product price here"
            onChange={(e) => setPrice(e.target.value)}
          />
          <br />
          <button>Create New product</button>
        </form>
        <br />
        {status
          ? message && <div className="SuccessMessage">{message}</div>
          : message && <div className="ErrorMessage">{message}</div>}
      </>
    );
  };
  
  export default AddNewProduct;