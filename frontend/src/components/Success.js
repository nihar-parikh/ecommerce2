// import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Button = styled.button`
  height: 50px;
  width: 200px;
  background-color: teal;
  color: white;
  border: none;
  font-size: 24px;
  border-radius: 10px;
`;

const Text = styled.div`
  margin: 20px;
  font-size: 30px;
`;

const Success = () => {
  // const location = useLocation();
  // console.log(location);
  return (
    <Container>
      <Wrapper>
        <Button>Successfull</Button>
        <Text>Thanks for shopping.</Text>
        <Link to={"/orders"}>
          <Button>VIEW YOUR ORDER</Button>
        </Link>
      </Wrapper>
    </Container>
  );
};

export default Success;
