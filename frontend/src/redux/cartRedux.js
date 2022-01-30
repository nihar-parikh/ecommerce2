// import { createSlice } from "@reduxjs/toolkit";

// const cartSlice = createSlice({
//   name: "cart",
//   initialState: {
//     products: [],
//     quantity: 0,
//     total: 0,
//   },
//   reducers: {
//     addProduct: (state, action) => {
//       state.quantity += 1;
//       state.products.push(action.payload.product);
//       state.total += action.payload.price;
//     },
//   },
// });

// const addProduct = cartSlice.actions;
// const cartReducer = cartSlice.reducer; //it should be export default

// export { addProduct };
// export default cartReducer;

import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    carts: [],
    userCart: {},
    userCarts: [],
    products: [],
    productQuantity: 0,
    cartQuantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload.product);
      state.productQuantity =
        state.productQuantity + action.payload.productQuantity;
      state.cartQuantity = state.cartQuantity + 1;
      state.total =
        state.total +
        action.payload.product.price * action.payload.productQuantity;
    },

    getCartStart: (state, action) => {
      state.isFetching = true;
      state.error = false;
      //no action required...u can remove action
    },
    getCartSuccess: (state, action) => {
      console.log(state.userCarts);
      state.isFetching = false;
      console.log("action.payload: ", action.payload);
      state.cartQuantity = action.payload.length;

      state.userCarts = action.payload;
      // state.userCarts = state.userCarts.concat(action.payload);
      // let array = [];
      // array = state.userCarts.filter(
      //   (x) => x.userId == action.payload[0].userId
      // );
      // state.userCarts = array;
      // console.log(array);
      console.log(state.userCarts);
      state.productQuantity = 0;
      state.total = 0;
      action.payload.forEach((payload) => {
        state.productQuantity =
          state.productQuantity + payload.products[0].quantity;
        state.total =
          state.total +
          payload.products[0].quantity * payload.products[0].price;
      });
    },
    getCartFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
      //no action required...u can remove action
    },

    createCartStart: (state, action) => {
      state.isFetching = true;
      state.error = false;
      //no action required...u can remove action
    },
    createCartSuccess: (state, action) => {
      state.isFetching = false;
      state.cartQuantity = state.cartQuantity + 1;
      state.userCarts.push(action.payload);
      state.productQuantity = 0;
      state.total = 0;
      state.userCarts.forEach((userCart) => {
        state.productQuantity =
          state.productQuantity + userCart.products[0].quantity;
        state.total =
          state.total +
          userCart.products[0].quantity * userCart.products[0].price;
      });
    },
    createCartFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
      //no action required...u can remove action
    },

    deleteCartStart: (state, action) => {
      state.isFetching = true;
      state.error = false;
      //no action required...u can remove action
    },
    deleteCartSuccess: (state, action) => {
      state.isFetching = false;
      // state.products.splice(
      //   // (item) => item._id === action.payload._id, //if delete method was to be used then (res.data=payload)/._id
      //   state.products.findIndex((item) => item._id === action.payload), //bcoz payload is id
      //   //finding index where the condition matches
      //   1
      // );
      //const array = [1,2,3,4,5]
      //array.splice(2,1)
      //[1,2,4,5] -> deleting item corresponding to index=2, second params is deletecount=1

      //or

      const filteredCarts = state.userCarts.filter(
        (userCart) => userCart._id !== action.payload._id
      );
      state.userCarts = filteredCarts; //filter method doesn't changes the orginal array
      state.cartQuantity = state.userCarts.length;
      state.productQuantity = 0;
      state.total = 0;
      state.userCarts.forEach((userCart) => {
        state.productQuantity =
          state.productQuantity + userCart.products[0].quantity;
        state.total =
          state.total +
          userCart.products[0].quantity * userCart.products[0].price;
      });
    },
    deleteCartFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
      //no action required...u can remove action
    },
  },
});

export const {
  addProduct,

  getCartStart,
  getCartSuccess,
  getCartFailure,
  createCartStart,
  createCartSuccess,
  createCartFailure,
  deleteCartStart,
  deleteCartSuccess,
  deleteCartFailure,
} = cartSlice.actions;
// const addProduct = cartSlice.actions; wrong method don't do it
// export { addProduct };

const cartReducer = cartSlice.reducer; //it should be export default
export default cartReducer;
