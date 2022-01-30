import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { useState, useEffect } from "react";
import { userRequest } from "../requestMethods";
import { deleteCart, getCart } from "../redux/apiCalls";

//This is a public or client side stripe key from stripe api
const KEY =
  "pk_test_51K3GAzSFO6dU8eOg8AmOZNDEGc5x2NeWUVKQHqhtdZahuzJSFp8Sl8yatlclQpjLFbowOEiwi6XNffMas4xt3F47002PBpDLuH";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 20px;
  ${mobile({
    padding: "10px",
  })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({
    display: "none",
  })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({
    flexDirection: "column",
  })}
`;
const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({
    flexDirection: "column",
  })}
`;

const ProductDetails = styled.div`
  flex: 2;
  display: flex;
`;
const Image = styled.img`
  width: 300px;
  ${mobile({
    width: "200px",
  })}
`;
const Details = styled.span`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const ProductName = styled.span``;
const ProductId = styled.span``;
const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;
const ProductSize = styled.span``;

const PriceDetails = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  ${mobile({
    margin: "10px",
  })}
`;
const ProductQuantity = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({
    margin: "15px",
  })}
`;
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({
    marginBottom: "10px",
  })}
`;

const Hr = styled.hr`
  margin: 15px 0px;
  /* background-color: "red";
  border: none;
  height: 1px; */
`;

const Summary = styled.div`
  flex: 1;
  border: 1px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;
const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;
const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;
const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  border: none;
  cursor: pointer;
`;

const Cart = () => {
  const userId = useSelector((state) => state.user.currentUser.otherInfo._id);
  // const addedProducts = useSelector((state) => state.cart.products);
  // const cartId = useSelector((state) => state.cart.userCart._id);
  const userCarts = useSelector((state) => state.cart.userCarts);
  const products = useSelector((state) => state.cart.userCart.products);
  const cartQuantity = useSelector((state) => state.cart.cartQuantity);
  // const productQuantity = useSelector((state) => state.cart.productQuantity);
  const total = useSelector((state) => state.cart.total);
  // console.log("products", products);

  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();

  const onToken = (token) => {
    console.log("Token: ", token);
    setStripeToken(token);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    getCart(userId, dispatch);
  }, [userId, dispatch]);

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id, //second parameter is body for backend service request
          amount: total * 100,
        });
        console.log("Response data: ", res.data);
        navigate("/success", { stripeData: res.data, products: products });
      } catch (error) {
        console.log(error);
      }
    };
    stripeToken && makeRequest(); //if stripeToken found from client side call makeRequest()
  }, [stripeToken, total, navigate, products]);

  const handleDelete = (cartId) => {
    // console.log(productId);
    deleteCart(cartId, dispatch);
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <Link to={"/"}>
            <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>
          <TopTexts>
            <TopText>Shopping Bag({cartQuantity})</TopText>
            <TopText>Your Wishlist(0)</TopText>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            {userCarts.map((userCart) => (
              <>
                <Product key={userCart.products[0]?._id}>
                  <ProductDetails key={userCart.products[0]?._id}>
                    <Image src={userCart.products[0]?.image} />
                    <Details>
                      <ProductName>
                        <b>Product:</b> {userCart.products[0]?.title}
                      </ProductName>
                      <ProductId>
                        <b>ID:</b> {userCart.products[0]?._id}
                      </ProductId>
                      <ProductColor color={userCart.products[0]?.color} />

                      <ProductSize>
                        <b>Size</b> {userCart.products[0]?.size}
                      </ProductSize>
                    </Details>
                  </ProductDetails>
                  <PriceDetails>
                    <ProductAmountContainer>
                      <AddIcon />
                      <ProductQuantity>
                        {userCart.products[0]?.quantity}
                      </ProductQuantity>
                      <RemoveIcon />
                    </ProductAmountContainer>
                    <ProductPrice>
                      INR{" "}
                      {userCart.products[0]?.price *
                        userCart.products[0]?.quantity}
                    </ProductPrice>
                    <TopButton
                      type="filled"
                      style={{ marginTop: "100px", backgroundColor: "teal" }}
                      onClick={() => handleDelete(userCart?._id)}
                    >
                      Remove From the Cart
                    </TopButton>
                  </PriceDetails>
                </Product>
                {/* <br /> */}
                <Hr />
              </>
            ))}

            {/* <Product>
              <ProductDetails>
                <Image src="https://wallpapercave.com/wp/vdV21Ey.jpg" />
                <Details>
                  <ProductName>
                    <b>Product:</b> Adidas Shoe
                  </ProductName>
                  <ProductId>
                    <b>ID:</b> 9876543210
                  </ProductId>
                  <ProductColor color="black" />

                  <ProductSize>
                    <b>ID:</b> 37
                  </ProductSize>
                </Details>
              </ProductDetails>
              <PriceDetails>
                <ProductAmountContainer>
                  <AddIcon />
                  <ProductAmount>2</ProductAmount>
                  <RemoveIcon />
                </ProductAmountContainer>
                <ProductPrice>INR 500</ProductPrice>
              </PriceDetails>
            </Product>
            <Hr />
            <Product>
              <ProductDetails>
                <Image src="https://wallpapercave.com/wp/vdV21Ey.jpg" />
                <Details>
                  <ProductName>
                    <b>Product:</b> Adidas Shoe
                  </ProductName>
                  <ProductId>
                    <b>ID:</b> 9876543210
                  </ProductId>
                  <ProductColor color="black" />

                  <ProductSize>
                    <b>ID:</b> 37
                  </ProductSize>
                </Details>
              </ProductDetails>
              <PriceDetails>
                <ProductAmountContainer>
                  <AddIcon />
                  <ProductAmount>2</ProductAmount>
                  <RemoveIcon />
                </ProductAmountContainer>
                <ProductPrice>INR 500</ProductPrice>
              </PriceDetails>
            </Product> */}
            {/* </Info> */}
          </Info>

          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>

              <SummaryItemPrice>INR {total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>INR 100</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>INR 100</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>

              <SummaryItemPrice>INR {total}</SummaryItemPrice>
            </SummaryItem>
            {stripeToken ? (
              <span>Processing. Please wait...</span> //if stripeToken found render this small msg
            ) : (
              <StripeCheckout
                name="Krishna Shop"
                image="https://i.pinimg.com/474x/12/03/fa/1203fa85e4a629940b2d426d1437d1c9.jpg"
                billingAddress
                shippingAddress
                description={`Your total is INR ${total}`}
                amount={total * 100}
                token={onToken}
                stripeKey={KEY}
              >
                <Button>CHECKOUT NOW</Button>
              </StripeCheckout>
            )}
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;

// {products.map((product) => (
//   <>
//   <Product key={product._id}>
//     <ProductDetails key={product._id}>
//       <Image src={product.image} />
//       <Details>
//         <ProductName>
//           <b>Product:</b> {product.title}
//         </ProductName>
//         <ProductId>
//           <b>ID:</b> {product._id}
//         </ProductId>
//         <ProductColor color={product.color} />

//         <ProductSize>
//           <b>Size</b> {product.size}
//         </ProductSize>
//       </Details>
//     </ProductDetails>
//     <PriceDetails>
//       <ProductAmountContainer>
//         <AddIcon />
//         <ProductQuantity>{product.quantity}</ProductQuantity>
//         <RemoveIcon />
//       </ProductAmountContainer>
//       <ProductPrice>
//         INR {product.price * product.quantity}
//       </ProductPrice>
//       <TopButton
//         type="filled"
//         style={{ marginTop: "100px", backgroundColor: "teal" }}
//         onClick={() => handleDelete(product._id)}
//       >
//         Remove From the Cart
//       </TopButton>
//     </PriceDetails>
//   </Product>
//   {/* <br /> */}
//   <Hr />
// </>
// ))}
