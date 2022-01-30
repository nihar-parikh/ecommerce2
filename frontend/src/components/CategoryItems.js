import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({
    height: "30vh",
  })}
`;
const InfoContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  /* vertical alignment flex-direction */
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  color: white;
  margin-bottom: 20px;
`;
const Button = styled.button`
  border: none;
  padding: 10px;
  border-color: white;
  color: gray;
  cursor: pointer;
  font-weight: 600;
`;

const CategoryItems = ({ image, title, category }) => {
  return (
    <Container>
      <Link to={`/products/${category}`}>
        <Image src={image} />
        <InfoContainer>
          <Title>{title}</Title>
          <Button>SHOP NOW</Button>
        </InfoContainer>
      </Link>
    </Container>
  );
};

export default CategoryItems;
