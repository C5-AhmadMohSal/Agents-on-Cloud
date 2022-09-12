import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/reducers/auth";
export default configureStore({
    reducer: {
      auth: authReducer,  
    },
  });
  