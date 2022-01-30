import { publicRequest, userRequest } from "../requestMethods";
import {
  createCartFailure,
  createCartStart,
  createCartSuccess,
  deleteCartFailure,
  deleteCartStart,
  deleteCartSuccess,
  getCartFailure,
  getCartStart,
  getCartSuccess,
} from "./cartRedux";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
} from "./productRedux";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  signUpFailure,
  signUpStart,
  signUpSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "./userRedux";

export const signUpUser = async (user, dispatch) => {
  console.log("userInfo: ", user);
  dispatch(signUpStart());

  try {
    const res = await publicRequest.post("/users/signup", user);
    console.log("response: ", res.data);
    if (res.data) {
      dispatch(signUpSuccess(res.data));
    } else {
      dispatch(signUpFailure());
    }
  } catch (error) {
    console.log("error:", error);
    dispatch(signUpFailure());
  }
};

export const login = async (dispatch, userInfo) => {
  //console.log("userInfo: ", userInfo);
  dispatch(loginStart());

  try {
    const res = await publicRequest.post("/users/login", userInfo); //don't use {userInfo:userInfo} bcoz already userInfo is an object
    //console.log("response: ", res.data);
    // console.log(res.data.token);
    localStorage.setItem("token", res.data.token);
    dispatch(loginSuccess(res.data));
    // console.log(res.data);
    getCart(res.data.otherInfo._id, dispatch);
  } catch (error) {
    //console.log("error:", error);
    dispatch(loginFailure());
  }
};

export const updateUser = async (id, user, dispatch) => {
  //console.log("userInfo: ", userInfo);
  dispatch(updateUserStart());

  try {
    const res = await userRequest.put(`/users/${id}`, user);
    console.log("response: ", res.data);
    if (res.data) {
      dispatch(updateUserSuccess({ id, user }));
    } else {
      dispatch(updateUserFailure());
    }
  } catch (error) {
    console.log("error:", error);
    dispatch(updateUserFailure());
  }
};

//Get all products
export const getProducts = async (dispatch) => {
  dispatch(getProductStart());

  try {
    const res = await publicRequest.get("/products");
    // console.log("response: ", res.data);
    if (res.data) {
      dispatch(getProductSuccess(res.data));
    } else {
      dispatch(getProductFailure());
    }
  } catch (error) {
    console.log("error:", error);
    dispatch(getProductFailure());
  }
};

export const getCart = async (userId, dispatch) => {
  // console.log(dbProducts);
  dispatch(getCartStart());

  try {
    const res = await userRequest.get(`/carts/${userId}`);

    console.log("response: ", res.data);

    // const res1 = addedProducts.filter((addedProduct) =>
    //   res.data.find(
    //     (resData) => addedProduct._id === resData.products[0].productId
    //   )
    // );
    // console.log(res1);

    if (res.data) {
      dispatch(getCartSuccess(res.data));
    } else {
      dispatch(getCartFailure());
    }
  } catch (error) {
    console.log("error:", error);
    dispatch(getCartFailure());
  }
};

export const createCart = async (cart, dispatch) => {
  console.log("cartInfo: ", cart);
  dispatch(createCartStart());

  try {
    const res = await userRequest.post("/carts", cart);
    console.log("response: ", res.data);

    if (res.data) {
      dispatch(createCartSuccess(res.data));
    } else {
      dispatch(createCartFailure());
    }
  } catch (error) {
    console.log("error:", error);
    dispatch(createCartFailure());
  }
};

//Delete cart
export const deleteCart = async (cartId, dispatch) => {
  console.log("cartId: ", cartId);
  dispatch(deleteCartStart());

  try {
    const res = await userRequest.delete(`/carts/deletecart/${cartId}`);
    console.log("response: ", res.data.cart);
    if (res.data) {
      dispatch(deleteCartSuccess(res.data.cart));
    } else {
      dispatch(deleteCartFailure());
    }
  } catch (error) {
    console.log("error: ", error);
    dispatch(deleteCartFailure());
  }
};
