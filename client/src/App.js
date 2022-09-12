import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Login from "./components/login";
import Register from "./components/register";
import TopBar from "./components/Navbar";
import Products from "./components/Products";
import AddNewProduct from "./components/AddNewProduct";
import UserProducts from "./components/userProduct";
import OneProduct from "./components/oneProduct";
function App() {
  const { isLoggedIn, userId } = useSelector((state) => {
    return {
      isLoggedIn: state.auth.isLoggedIn,
      userId: state.auth.userId,
    };
  });
  return <div className="App">
      <TopBar/>
      <Routes>
      
          <Route path={"/Login"} element={<Login />} />
          <Route path={"/register"} element={<Register />} />
          <Route path={"/Products"} element={<Products />} />
          <Route path={"/AddNewProduct"} element={<AddNewProduct />} />
          <Route path={"/UserProducts"} element={<UserProducts />} />
          <Route path={"/OneProduct/:id"} element={<OneProduct />} />




        </Routes></div>;
}

export default App;
