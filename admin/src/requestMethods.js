import axios from "axios";

const BASE_URL = "http://localhost:8000/api/";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTk0ZmZjY2Q2ZmRmYjBkNzc5MTYxOWQiLCJpYXQiOjE2MzcxNTg1ODd9.jk-tD_VT4Wdir47ZyQAnBmVc04aQv9TSzfjir2pZLDI";

// console.log(JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.token);
// const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
//   .currentUser.token;

const publicRequest = axios.create({
  baseURL: BASE_URL,
});

const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: TOKEN },
});

export { publicRequest, userRequest };
