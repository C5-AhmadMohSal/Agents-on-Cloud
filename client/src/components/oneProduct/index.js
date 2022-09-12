import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const OneProduct = () => {
  const dispatch = useDispatch();
  const [productId, setProductIs] = useState("");
  const { userId } = useSelector((state) => {
    return {
      userId: state.auth.userId,
    };
  });
  const { id } = useParams();
  const [oneProduct, setOneProduct] = useState("");
  const [message, setMessage] = useState("");

  const getOneProduct = () => {
    axios
      .get(`http://localhost:5000/products/getOneProductById/${id}`)
      .then((result) => {
        setOneProduct(result.data.result);
        setMessage("one product");
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.response.data.message);
      });
  };
  useEffect(() => {
    getOneProduct();
  }, []);
  return (
<> <div className="container">
      {oneProduct &&
        oneProduct.map((product, i) => {
          return (
            <>
              <div className="container1">
                <div className="ONEproductImage">
                  <img src={product.productImage} />
                </div>
                  <div className="details-Container">
                      <div className="TiiTle">
                        <p className="title1">{product.title}</p>
                      </div>
                    <p className="description1">{product.description}</p>
                    <p className="price">${product.price}</p>
                  </div>
                  </div>
            </>
          );
        })}
    </div></>
  );
};

export default OneProduct;
