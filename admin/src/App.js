import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";

function App() {
  // const admin = useSelector(
  //   (state) => state.user.currentUser.otherInfo.isAdmin
  // );
  const admin = true;
  // console.log(admin);
  // const user = true;
  // const admin = JSON.parse(
  //   JSON.parse(localStorage.getItem("persist:root")).user
  // ).currentUser.otherInfo.isAdmin;
  return (
    <div>
      <Router>
        <Topbar />
        <div className="container">
          <Sidebar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/users" element={<UserList />} />
            <Route exact path="/user/:userId" element={<User />} />
            <Route exact path="/newUser" element={<NewUser />} />

            <Route path="/products" element={<ProductList />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/newproduct" element={<NewProduct />} />

            <Route
              path="/login"
              element={admin ? <Navigate replace to="/" /> : <Login />}
            />
          </Routes>
        </div>
      </Router>
    </div>
    // <Router>
    //   <Switch>
    //     <Route
    //       path="/login"
    //       element={user ? <Navigate replace to="/" /> : <Login />}
    //     ></Route>
    //     <Topbar />
    //     <div className="container">
    //       <Sidebar />
    //       <Route exact path="/">
    //         <Home />
    //       </Route>
    //       <Route path="/users">
    //         <UserList />
    //       </Route>
    //       <Route path="/user/:userId">
    //         <User />
    //       </Route>
    //       <Route path="/newUser">
    //         <NewUser />
    //       </Route>
    //       <Route path="/products">
    //         <ProductList />
    //       </Route>
    //       <Route path="/product/:productId">
    //         <Product />
    //       </Route>
    //       <Route path="/newproduct">
    //         <NewProduct />
    //       </Route>
    //     </div>
    //   </Switch>
    // </Router>
  );
}

export default App;
