import { publicRequest, userRequest } from "../requestMethods";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  addProductStart,
  addProductSuccess,
  addProductFailure,
} from "./productRedux";
import {
  addUserFailure,
  addUserStart,
  addUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  getUsersFailure,
  getUsersStart,
  getUsersSuccess,
  loginFailure,
  loginStart,
  loginSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "./userRedux";

//Admin login
export const login = async (dispatch, userInfo) => {
  //console.log("userInfo: ", userInfo);
  dispatch(loginStart());

  try {
    const res = await publicRequest.post("/users/login", userInfo); //don't use {userInfo:userInfo} bcoz already userInfo is an object
    console.log("response: ", res.data.otherInfo.isAdmin);
    if (res.data.otherInfo.isAdmin) {
      dispatch(loginSuccess(res.data));
    } else {
      dispatch(loginFailure());
    }
  } catch (error) {
    //console.log("error:", error);
    dispatch(loginFailure());
  }
};

//Get all users
export const getUsers = async (dispatch) => {
  //console.log("userInfo: ", userInfo);
  dispatch(getUsersStart());

  try {
    const res = await userRequest.get("/users?new=true");
    console.log("response: ", res.data);
    if (res.data) {
      dispatch(getUsersSuccess(res.data));
    } else {
      dispatch(getUsersFailure());
    }
  } catch (error) {
    console.log("error:", error);
    dispatch(getUsersFailure());
  }
};

//Delete user
export const deleteUser = async (id, dispatch) => {
  //console.log("userInfo: ", userInfo);
  dispatch(deleteUserStart());

  try {
    //not public request bcoz admin can only delete
    //delete method will delete user from database but we have few products in db so just pass id
    // const res = await userRequest.delete(`/users/deleteuser/${id}`);
    // console.log("response: ", res.data);
    // if (res.data) {
    //   dispatch(deleteUserSuccess(res.data));
    // } else {
    //   dispatch(deleteUserFailure());
    // }
    dispatch(deleteUserSuccess(id));
  } catch (error) {
    console.log("error:", error);
    dispatch(deleteUserFailure());
  }
};

//Add user
export const addUser = async (user, dispatch) => {
  console.log("userInfo: ", user);
  dispatch(addUserStart());

  try {
    const res = await userRequest.post("/users/signup", user);
    console.log("response: ", res.data);
    if (res.data) {
      dispatch(addUserSuccess(res.data));
    } else {
      dispatch(addUserFailure());
    }
  } catch (error) {
    console.log("error:", error);
    dispatch(addUserFailure());
  }
};

//Update user
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
  //console.log("userInfo: ", userInfo);
  dispatch(getProductStart());

  try {
    const res = await publicRequest.get("/products");
    console.log("response: ", res.data);
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

//Delete product
export const deleteProduct = async (id, dispatch) => {
  //console.log("userInfo: ", userInfo);
  dispatch(deleteProductStart());

  try {
    //not public request bcoz admin can only delete
    //delete method will delete product from database but we have few products in db so just pass id
    // const res = await userRequest.delete(`/products/deleteproduct/${id}`);
    // console.log("response: ", res.data);
    // if (res.data) {
    //   dispatch(deleteProductSuccess(res.data));
    // } else {
    //   dispatch(deleteProductFailure());
    // }
    dispatch(deleteProductSuccess(id));
  } catch (error) {
    console.log("error:", error);
    dispatch(deleteProductFailure());
  }
};

//Update product
export const updateProducts = async (id, product, dispatch) => {
  //console.log("userInfo: ", userInfo);
  dispatch(updateProductStart());

  try {
    const res = await userRequest.put(`/products/${id}`, product);
    console.log("response: ", res.data);
    if (res.data) {
      dispatch(updateProductSuccess({ id, product }));
    } else {
      dispatch(updateProductFailure());
    }
  } catch (error) {
    console.log("error:", error);
    dispatch(updateProductFailure());
  }
};

//Add product
export const addProducts = async (product, dispatch) => {
  // console.log("productInfo: ", product);
  dispatch(addProductStart());

  try {
    const res = await userRequest.post("/products", product);
    console.log("response: ", res.data);
    if (res.data) {
      dispatch(addProductSuccess(res.data));
    } else {
      dispatch(addProductFailure());
    }
  } catch (error) {
    console.log("error:", error);
    dispatch(addProductFailure());
  }
};
