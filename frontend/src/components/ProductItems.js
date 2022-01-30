import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Image = styled.img`
  width: 100%;
  height: 75%;
  object-fit: cover;
`;
const InfoContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  /* vertical alignment flex-direction */
  justify-content: center;
  align-items: center;
  &:hover {
    border: 2px solid lightgray;
  }
`;
const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  cursor: pointer;
  transition: all 0.5s ease;
  &:hover {
    background-color: lightgray;
    transform: scale(1.1);
  }
`;

const Price = styled.div`
  font-weight: 100;
  font-size: 40px;
`;

const Ratings = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;

  display: flex;
  justify-content: space-between;
`;

const RatingsIcon = styled.div`
  /* cursor: pointer; */
`;

const Reviews = styled.div`
  cursor: pointer;
`;

const ProductItems = ({ item }) => {
  return (
    <Container>
      <Image src={item.image} />
      <InfoContainer>
        <Icon>
          <ShoppingCartOutlined />
        </Icon>
        <Icon>
          <Link to={`/product/${item._id}`}>
            <SearchOutlinedIcon />
          </Link>
        </Icon>
        <Icon>
          <FavoriteBorderOutlinedIcon />
        </Icon>
      </InfoContainer>
      <Price>INR {item.price}</Price>
      <Ratings>
        <RatingsIcon>
          <StarOutlineIcon fontSize="small" />
          <StarOutlineIcon fontSize="small" />
          <StarOutlineIcon fontSize="small" />
          <StarOutlineIcon fontSize="small" />
          <StarOutlineIcon fontSize="small" />
        </RatingsIcon>
        <Reviews>(10)</Reviews>
      </Ratings>
    </Container>
  );
};

export default ProductItems;
