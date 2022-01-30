import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
    users: [],
  },
  reducers: {
    loginStart: (state, action) => {
      state.isFetching = true;
      //no action required...u can remove action
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
      //no action required...u can remove action
    },

    getUsersStart: (state, action) => {
      state.isFetching = true;
      state.error = false;
      //no action required...u can remove action
    },
    getUsersSuccess: (state, action) => {
      state.isFetching = false;
      state.users = action.payload;
    },
    getUsersFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
      //no action required...u can remove action
    },

    deleteUserStart: (state, action) => {
      state.isFetching = true;
      state.error = false;
      //no action required...u can remove action
    },
    deleteUserSuccess: (state, action) => {
      state.isFetching = false;
      state.users.splice(
        // (item) => item._id === action.payload._id, //if delete method was to be used then (res.data=payload)/._id
        state.users.findIndex((item) => item._id === action.payload), //bcoz payload is id
        //finding index where the condition matches
        1
      );
      //const array = [1,2,3,4,5]
      //array.splice(2,1)
      //[1,2,4,5] -> deleting item corresponding to index=2, second params is deletecount=1

      //or

      // const filteredUsers = state.users.filter(
      //   (item) => item._id !== action.payload
      // );
      //state.users = filteredUsers; //filter method doesn't changes the orginal array
    },
    deleteUserFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
      //no action required...u can remove action
    },

    addUserStart: (state, action) => {
      state.isFetching = true;
      state.error = false;
      //no action required...u can remove action
    },
    addUserSuccess: (state, action) => {
      state.isFetching = false;
      state.users.push(action.payload);
    },
    addUserFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
      //no action required...u can remove action
    },

    updateUserStart: (state, action) => {
      state.isFetching = true;
      state.error = false;
      //no action required...u can remove action
    },
    updateUserSuccess: (state, action) => {
      state.isFetching = false;
      state.users[
        state.users.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.user;
      console.log(state.users);
      console.log(action.payload.user);
    },
    updateUserFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
      //no action required...u can remove action
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  getUsersStart,
  getUsersSuccess,
  getUsersFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  addUserStart,
  addUserSuccess,
  addUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} = userSlice.actions;
// const addProduct = cartSlice.actions; wrong method don't do it
// export { addProduct };

const userReducer = userSlice.reducer; //it should be export default
export default userReducer;
