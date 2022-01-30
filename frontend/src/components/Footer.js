import styled from "styled-components";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import MailIcon from "@mui/icons-material/Mail";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  ${mobile({
    flexDirection: "column",
  })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
const Logo = styled.h1``;
const Description = styled.p`
  margin: 20px 0px;
`;
const SocialContainer = styled.div`
  display: flex;
`;
const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #${(props) => props.color};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

const Center = styled.div`
  flex: 1px;
  padding: 20px;
  ${mobile({
    display: "none",
  })}
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  /* list contain its own margin and padding */
  /* so   margin: 0 and padding: 0 */
  margin: 0;
  padding: 0;
  /* for deleting bullets */
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1px;
  padding: 20px;
`;

const Contact = styled.div`
  display: flex;
`;
const ContactIcon = styled.div`
  margin-right: 10px;
`;

// const Title = styled.h3``; can't use title again it is defined already
const ContactItem = styled.p`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
  width: 300px;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>eShop</Logo>
        <Description>
          Enim officia ad ad tempor labore id quis veniam est. Et duis anim ea
          excepteur nulla laboris reprehenderit proident. Cillum proident amet
          consectetur irure.
        </Description>
        <SocialContainer>
          <SocialIcon color="3B5999">
            <FacebookIcon />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <InstagramIcon />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <TwitterIcon />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Man Fashion</ListItem>
          <ListItem>Woman Fashion</ListItem>
          <ListItem>Accessories</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <Contact>
          <ContactIcon>
            <LocationOnIcon />
          </ContactIcon>
          <ContactItem>58 Seven Waves, Vadodara. Gujarat 392514</ContactItem>
        </Contact>
        <Contact>
          <ContactIcon>
            <PhoneIcon />
          </ContactIcon>
          <ContactItem>9898184062</ContactItem>
        </Contact>
        <Contact>
          <ContactIcon>
            <MailIcon />
          </ContactIcon>
          <ContactItem>eShop@gmail.com</ContactItem>
        </Contact>
        <Payment src="https://www.citypng.com/public/uploads/preview/-11597193844xtj2mnv37b.png" />
      </Right>
    </Container>
  );
};

export default Footer;
