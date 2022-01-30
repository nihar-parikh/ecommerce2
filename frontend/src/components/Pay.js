import styled from "styled-components";
import StripeCheckout from "react-stripe-checkout";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//This is a public or client side stripe key from stripe api
const KEY =
  "pk_test_51K3GAzSFO6dU8eOg8AmOZNDEGc5x2NeWUVKQHqhtdZahuzJSFp8Sl8yatlclQpjLFbowOEiwi6XNffMas4xt3F47002PBpDLuH";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Button = styled.button`
  height: 50px;
  width: 200px;
  background-color: black;
  color: white;
  border: none;
  font-size: 24px;
  border-radius: 10px;
  cursor: pointer;
`;

const Pay = () => {
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();

  const onToken = (token) => {
    console.log("Token: ", token);
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post(
          "http://localhost:8000/api/checkout/payment",
          {
            tokenId: stripeToken.id, //second parameter is body for backend service request
            amount: 100000,
          }
        );
        console.log("Response data: ", res.data);
        navigate("/success");
      } catch (error) {
        console.log(error);
      }
    };
    stripeToken && makeRequest(); //if stripeToken found from client side call makeRequest()
  });

  return (
    <Container>
      {stripeToken ? (
        <span>Processing. Please wait...</span> //if stripeToken found render this small msg
      ) : (
        <StripeCheckout
          name="Krishna Shop"
          image="https://i.pinimg.com/474x/12/03/fa/1203fa85e4a629940b2d426d1437d1c9.jpg"
          billingAddress
          shippingAddress
          description="Your total is INR 1000"
          amount={100000}
          token={onToken}
          stripeKey={KEY}
        >
          <Button>Pay Now</Button>
        </StripeCheckout>
      )}
    </Container>
  );
};

export default Pay;
