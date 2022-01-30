import React from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Badge } from "@mui/material";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/userRedux";

const Container = styled.div`
  height: 60px;
  ${mobile({
    height: "50px",
  })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  ${mobile({
    padding: "10px 0px",
  })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({
    display: "none",
  })}
`;
const SearchContainer = styled.div`
  border: 1px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({
    width: "50px",
  })}
`;

const Center = styled.div`
  flex: 1;
`;

const Logo = styled.h1`
  font-weight: bold;
  text-align: center;
  ${mobile({
    fontSize: "24px",
    margin: "15px",
  })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({
    flex: 2,
    justifyContent: "center",
  })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin: 25px;
  ${mobile({
    fontSize: "12px",
    margin: "2px",
  })}
`;

const Navbar = () => {
  const user = useSelector((state) => state.user.currentUser);
  // const userId = useSelector((state) => state.user.currentUser.otherInfo._id);

  // console.log(user.otherInfo._id);
  // const userInfo = useSelector((state) => state.user.currentUser.otherInfo);
  // const cart = useSelector((initialstate) => initialstate.cart);
  // console.log("cart", cart);
  const cartQuantity = useSelector((state) => state.cart.cartQuantity);
  //console.log(cartQuantity);
  const dispatch = useDispatch();

  const handleLogout = () => {
    // console.log("clicked");
    dispatch(logout());
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>ENG</Language>

          <SearchContainer>
            <Input placeholder="Search" />
            <SearchIcon style={{ color: "gray", fontSize: "20px" }} />
          </SearchContainer>
        </Left>
        <Center>
          <Link to="/">
            <Logo>KRISHNA</Logo>
          </Link>
        </Center>
        <Right>
          {user ? (
            <>
              <Link to={`/users/${user.otherInfo?._id}`}>
                <MenuItem>
                  HELLO
                  <br />
                  {user !== null && user.otherInfo?.name.toUpperCase()}
                </MenuItem>
              </Link>
              <Link to="/">
                <MenuItem onClick={handleLogout}>LOG OUT</MenuItem>
              </Link>
            </>
          ) : (
            <>
              <Link to="/signup">
                <MenuItem>SIGN UP</MenuItem>
              </Link>
              <Link to="/login">
                <MenuItem>LOGIN</MenuItem>
              </Link>
            </>
          )}
          {user ? (
            <Link to={"/cart"}>
              <MenuItem>
                <Badge badgeContent={cartQuantity} color="primary">
                  <ShoppingCartOutlinedIcon />
                </Badge>
              </MenuItem>
            </Link>
          ) : (
            <MenuItem>
              <Badge badgeContent={0} color="primary">
                <ShoppingCartOutlinedIcon />
              </Badge>
            </MenuItem>
          )}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
