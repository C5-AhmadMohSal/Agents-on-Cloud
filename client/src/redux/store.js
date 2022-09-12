import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/reducers/auth";
import productReducer from "./reducers/products/index";

// import pr

export default configureStore({
    reducer: {
      auth: authReducer,  
      products: productReducer,

    },
  });
  