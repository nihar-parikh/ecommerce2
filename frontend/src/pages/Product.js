import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { mobile } from "../responsive";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import { addProduct } from "../redux/cartRedux";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createCart } from "../redux/apiCalls";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({
    padding: "10px",
    flexDirection: "column",
  })}
`;
const ImageContainer = styled.div`
  flex: 1;
`;
const Image = styled.img`
  height: 90vh;
  width: 100%;
  object-fit: cover;
  ${mobile({
    height: "40vh",
  })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({
    padding: "10px",
  })}
`;
const Title = styled.h1`
  font-weight: 200;
`;
const Description = styled.p`
  margin: 20px 0px;
`;
const Price = styled.div`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  display: flex;
  margin: 30px 0px;
  width: 50%;
  justify-content: space-between;
  ${mobile({
    width: "100%",
  })}
`;
const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-weight: 200;
  font-size: 20px;
`;
const FilterColor = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  cursor: pointer;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({
    width: "100%",
  })}
`;
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  cursor: pointer;
`;
const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;
const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: lightslategray;
  }
`;

const Product = () => {
  const location = useLocation(); //for getting pathname like /products/men
  const id = location.pathname.split("/")[2]; //spliting products and men
  //console.log("product id: ", id);

  const [product, setProduct] = useState({});
  const [productQuantity, setProductQuantity] = useState(1);
  // const [color, setColor] = useState("");
  //const [size, setSize] = useState("");
  const dispatch = useDispatch();
  const dbProducts = useSelector((state) => state.product.products);
  // console.log(dbProducts);
  const user = useSelector((state) => state.user.currentUser);
  const cart = useSelector((state) => state.cart.userCart);
  const userId = useSelector((state) => state.user.currentUser.otherInfo._id);
  // console.log("cart: ", cart);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get(`products/${id}`);
        //console.log(res.data);
        setProduct(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      productQuantity > 1 && setProductQuantity(productQuantity - 1);
    } else {
      setProductQuantity(productQuantity + 1);
    }
  };

  const handleColor = (color) => {
    //setColor(color);

    const selectedColor = product.color.filter((item) => item === color);

    product.color = selectedColor;
    //console.log(product);
  };

  const handleSize = (e) => {
    e.preventDefault();
    //size for small category is not working
    //console.log(e.target.value);
    //setSize(e.target.value);

    const selectedSize = product.size.filter((item) => item === e.target.value);
    product.size = selectedSize;
    //console.log(product);
  };

  const handleClick = () => {
    if (user) {
      product.productQuantity = productQuantity;
      //console.log("product: ", product);
      // dispatch(addProduct({ product, productQuantity }));
      const newCart = {
        userId,
        products: [
          {
            title: product.title,
            description: product.description,
            image: product.image,
            size: product.size[0],
            price: product.price,
            color: product.color[0],
            categories: product.categories,
            productId: product._id,
            quantity: product.productQuantity,
          },
        ],
      };
      console.log("cart: ", newCart);
      createCart(newCart, dispatch);
    }
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImageContainer>
          <Image src={product.image} />
        </ImageContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Description>{product.description}</Description>
          <Price>INR {product.price} </Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product.color &&
                product.color.map((c) => (
                  <FilterColor
                    color={c}
                    key={c}
                    onClick={() => handleColor(c)}
                  />
                ))}
              {/* key={id} bcoz color doesn't has id property */}

              {/* <FilterColor color="blue" />
              <FilterColor color="gray" /> */}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={handleSize}>
                {product.size &&
                  product.size.map((s) => (
                    <FilterSizeOption key={s}>{s} </FilterSizeOption>
                  ))}
                {/* <FilterSizeOption>M</FilterSizeOption>
                <FilterSizeOption>L</FilterSizeOption>
                <FilterSizeOption>XL</FilterSizeOption>
                <FilterSizeOption>XXL</FilterSizeOption> */}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <RemoveIcon onClick={() => handleQuantity("dec")} />
              <Amount>{productQuantity}</Amount>
              <AddIcon onClick={() => handleQuantity("inc")} />
            </AmountContainer>
            <Button onClick={() => handleClick()}>ADD TO CART</Button>

            {/* {user ? (
              <Link to={"/cart"}>
                <Button onClick={() => handleClick()}>ADD TO CART</Button>
              </Link>
            ) : (
              <Link to={"/login"}>
                <Button onClick={() => handleClick()}>ADD TO CART</Button>
              </Link>
            )} */}
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
