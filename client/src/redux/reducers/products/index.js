import { createSlice } from "@reduxjs/toolkit";
const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    Product:[],
    oneProduct:[],
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setOneProduct: (state, action) => {
      state.oneProduct = action.payload;
    },
    addProduct: (state, action) => {
        state.Product.push(action.payload);
      },
      deleteProduct: (state, action) => {
        state.Product = state.Product.filter((element) => {
          return element.id !== action.payload;
        });
      },
      setProduct: (state, action) => {
        if (action.payload.length) {
          state.Product = action.payload;
          return;
        }
        if (typeof action.payload == "object") {
          state.Product = [...state.Product, action.payload];
        }
      },
  
  },
});
export const { setProducts, setOneProduct,addProduct,deleteProduct,setProduct} = productSlice.actions;
export default productSlice.reducer;
