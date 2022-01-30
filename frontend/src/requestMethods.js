import axios from "axios";

const BASE_URL = "http://localhost:8000/api/";
// const TOKEN =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTk0YjZlOGIwNTRjMjU4MDVmMzYxNTkiLCJpYXQiOjE2NDE2NTQ5Nzl9.G2ECUYk5bm7_diAAh8n3PtY07ba5x9ajcFoeNEbAwMY";
// const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
//   .currentUser.token;
// console.log(JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.token);
// const TOKEN2 = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
//   .currentUser.token;
// console.log("token2: ", TOKEN2);
const TOKEN1 = localStorage.getItem("token");
console.log("TOKEN1: ", TOKEN1);

const publicRequest = axios.create({
  baseURL: BASE_URL,
});

const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: TOKEN1 },
});

export { publicRequest, userRequest };
