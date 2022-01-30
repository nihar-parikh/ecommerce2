import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { login } from "../redux/apiCalls";
import { useNavigate, Link } from "react-router-dom";

import { mobile } from "../responsive";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: url("https://media.istockphoto.com/photos/woman-holding-sale-shopping-bags-consumerism-shopping-lifestyle-picture-id1254508881?b=1&k=20&m=1254508881&s=170667a&w=0&h=e8irxc-knpSghyK9ZI19uOOHv0QDEWscs2O4BwGRcLA=")
    center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: teal;
  ${mobile({
    width: "75%",
  })}
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: black;
  color: white;
  cursor: pointer;
  margin-top: 10px;

  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Error = styled.div`
  color: darkgreen;
`;

const Links = styled.a`
  font-size: 12px;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  margin: 10px 0px;
  cursor: pointer;

  &:hover {
    color: white;
    text-decoration: underline;
  }
`;

const Login = () => {
  const navigate = useNavigate();
  //u can use object instead of separate email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("Invalid Credentials!!!");
  const dispatch = useDispatch();
  const { isFectching, error } = useSelector((state) => state.user);
  // console.log(isFectching, error);

  const handleEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault(); //bcoz when input field is filled the page refreshes so to avoid it
    login(dispatch, { email, password });
  };

  return (
    <Container>
      <Wrapper>
        <Title>LOGIN</Title>
        <Form>
          <Input placeholder="email" type="email" onChange={handleEmail} />
          <Input
            placeholder="password"
            type="password"
            onChange={handlePassword}
          />
        </Form>
        {email && password ? (
          <Button onClick={handleLogin}>LOGIN</Button>
        ) : (
          <Button disabled>LOGIN</Button>
        )}
        {error && <Error>{errorMsg}</Error>}
        <Links>Forgot your password?</Links>
        <Link to="/signup">
          <Links>Create a new account</Links>
        </Link>
      </Wrapper>
    </Container>
  );
};

export default Login;
