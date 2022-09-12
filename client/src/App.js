import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";

import Login from "./components/login";
import Register from "./components/register";
import TopBar from "./components/Navbar";
import Products from "./components/Products";
import AddNewProduct from "./components/AddNewProduct";

function App() {
  return <div className="App">
      <TopBar/>
      <Routes>
          <Route path={"/Login"} element={<Login />} />
          <Route path={"/register"} element={<Register />} />
          <Route path={"/Products"} element={<Products />} />
          <Route path={"/AddNewProduct"} element={<AddNewProduct />} />



        </Routes></div>;
}

export default App;
