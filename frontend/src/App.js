import Home from "./pages/Home";
import "./App.css";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Pay from "./components/Pay";
import Success from "./components/Success";
import { useSelector } from "react-redux";
import User from "./pages/user/User";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  // const user = false;
  return (
    <div>
      {/* <Home /> */}
      {/* <ProductList /> */}
      {/* <Product /> */}
      {/* <Signup /> */}
      {/* <Login /> */}
      {/* <Cart /> */}
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/products/:category" element={<ProductList />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/users/:id" element={<User />} />

          <Route
            path="/login"
            element={user ? <Navigate replace to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate replace to="/" /> : <Signup />}
          />

          <Route path="/pay" element={<Pay />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
