import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    getProductStart: (state, action) => {
      state.isFetching = true;
      state.error = false;
      //no action required...u can remove action
    },
    getProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products = action.payload;
    },
    getProductFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
      //no action required...u can remove action
    },

    // deleteProductStart: (state, action) => {
    //   state.isFetching = true;
    //   state.error = false;
    //   //no action required...u can remove action
    // },
    // deleteProductSuccess: (state, action) => {
    //   state.isFetching = false;
    //   state.products.splice(
    //     // (item) => item._id === action.payload._id, //if delete method was to be used then (res.data=payload)/._id
    //     state.products.findIndex((item) => item._id === action.payload), //bcoz payload is id
    //     //finding index where the condition matches
    //     1
    //   );
    //   //const array = [1,2,3,4,5]
    //   //array.splice(2,1)
    //   //[1,2,4,5] -> deleting item corresponding to index=2, second params is deletecount=1

    //   //or

    //   // const filteredProducts = state.products.filter(
    //   //   (item) => item._id !== action.payload
    //   // );
    //   //state.products = filteredProducts; //filter method doesn't changes the orginal array
    // },
    // deleteProductFailure: (state, action) => {
    //   state.isFetching = false;
    //   state.error = true;
    //   //no action required...u can remove action
    // },

    // updateProductStart: (state, action) => {
    //   state.isFetching = true;
    //   state.error = false;
    //   //no action required...u can remove action
    // },
    // updateProductSuccess: (state, action) => {
    //   state.isFetching = false;
    //   state.products[
    //     state.products.findIndex((item) => item._id === action.payload.id)
    //   ] = action.payload.product;
    // },
    // updateProductFailure: (state, action) => {
    //   state.isFetching = false;
    //   state.error = true;
    //   //no action required...u can remove action
    // },

    // addProductStart: (state, action) => {
    //   state.isFetching = true;
    //   state.error = false;
    //   //no action required...u can remove action
    // },
    // addProductSuccess: (state, action) => {
    //   state.isFetching = false;
    //   state.products.push(action.payload);
    // },
    // addProductFailure: (state, action) => {
    //   state.isFetching = false;
    //   state.error = true;
    //   //no action required...u can remove action
    // },
  },
});

export const {
  getProductStart,
  getProductSuccess,
  getProductFailure,
  // deleteProductStart,
  // deleteProductSuccess,
  // deleteProductFailure,
  // updateProductStart,
  // updateProductSuccess,
  // updateProductFailure,
  // addProductStart,
  // addProductSuccess,
  // addProductFailure,
} = productSlice.actions;
// const addProduct = cartSlice.actions; wrong method don't do it
// export { addProduct };

const productReducer = productSlice.reducer; //it should be export default
export default productReducer;
