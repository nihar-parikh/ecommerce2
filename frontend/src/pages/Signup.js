import styled from "styled-components";
import { signUpUser } from "../redux/apiCalls";
import { mobile } from "../responsive";
import app from "../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useState } from "react";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: url("https://wallpaperaccess.com/full/2483954.jpg") center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 40%;
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
  flex-wrap: wrap;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;
const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;
const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: black;
  color: white;
  cursor: pointer;
  margin-top: 10px;
`;

const Signup = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({});
  const [address, setAddress] = useState({
    SocName: "",
    Road: "",
    City: "",
    State: "",
  });
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  // console.log(userInfo);

  const handleAddress = (e) => {
    e.preventDefault();
    setAddress({ ...address, [e.target.name]: e.target.value });
  };
  // console.log(address);

  const handleFile = (e) => {
    // console.log(e.target.files);
    //e.target.files is an array of objects...we want only one file
    e.preventDefault();
    setFile(e.target.files[0]);
  };
  // console.log(file);

  const handleClick = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name; //we are giving a unique name to file.name bcoz in future if uploaded file with same name it overwrites it ...so to avoid overwritting of file
    // console.log(fileName);
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file); //file and not fileName bcoz storageRef contains fileName as ref

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log("error: ", error);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          // console.log({
          //   ...productInfo,
          //   categories,
          //   color,
          //   size,
          //   image: downloadURL,
          // });
          const user = {
            ...userInfo,
            address: address,
            image: downloadURL,
          };
          console.log(user);
          signUpUser(user, dispatch);
          navigate("/");
        });
      }
    );
  };

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input
            type="text"
            name="name"
            placeholder="name"
            onChange={handleChange}
          />
          {/* <Input placeholder="last name" /> */}
          <Input
            type="text"
            name="username"
            placeholder="username"
            onChange={handleChange}
          />
          <Input
            type="email"
            name="email"
            placeholder="email"
            onChange={handleChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="password"
            onChange={handleChange}
          />
          {/* <Input placeholder="confirm password" /> */}
          <Input
            type="number"
            name="phoneNumber"
            placeholder="phone number"
            onChange={handleChange}
          />
          <Input
            type="text"
            name="SocName"
            placeholder="SocName"
            onChange={handleAddress}
          />
          <Input
            type="text"
            name="Road"
            placeholder="Road"
            onChange={handleAddress}
          />
          <Input
            type="text"
            name="City"
            placeholder="City"
            onChange={handleAddress}
          />
          <Input
            type="text"
            name="State"
            placeholder="Sate"
            onChange={handleAddress}
          />
        </Form>
        <div className="newUserGender" style={{ marginTop: "10px" }}>
          <input
            type="radio"
            name="gender"
            id="male"
            value="male"
            onChange={handleChange}
          />
          <label for="male" style={{ padding: "5px" }}>
            Male
          </label>
          <input
            type="radio"
            name="gender"
            id="female"
            value="female"
            onChange={handleChange}
          />
          <label for="female" style={{ padding: "5px" }}>
            Female
          </label>
          <input
            type="radio"
            name="gender"
            id="other"
            value="other"
            onChange={handleChange}
          />
          <label for="other" style={{ padding: "5px" }}>
            Other
          </label>
        </div>
        <div
          className="newUserItem"
          style={{
            margin: "10px 0px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <label style={{ fontWeight: "450" }}>Image : </label>
          <input type="file" id="file" onChange={handleFile} />
        </div>
        <Agreement>
          By creating an account, I accept the terms and conditions in
          accordance with the <b>PRIVACY POLICY</b>
        </Agreement>
        <Button onClick={handleClick}>CREATE</Button>
      </Wrapper>
    </Container>
  );
};

export default Signup;
