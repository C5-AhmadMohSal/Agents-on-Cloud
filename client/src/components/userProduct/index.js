import React, { useEffect, useState } from "react";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UserProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [UserProducts, setUserProducts] = useState("");


  const { isLoggedIn, token,userId } = useSelector((state) => {
    return {
      isLoggedIn: state.auth.isLoggedIn,
      userId: state.auth.userId,
      token: state.auth.token,

    };
  });

  const oneuserproducts = () => {
    axios
      .get(`http://localhost:5000/products/getAllProductByUserId`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log(result, `ProductByUserId`);
        setUserProducts(result.data.result);
      })
      .catch((err) => {
        console.log(err, `ERROR IN USER`);
      });
  };

useEffect(() => {
    oneuserproducts();
}, []);

  return (
    <>
  <p>haay</p>
    </>
  );
};

export default UserProducts;
