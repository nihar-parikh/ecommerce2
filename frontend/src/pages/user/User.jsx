import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./user.css";
import app from "../../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useState } from "react";
import { updateUser } from "../../redux/apiCalls";

export default function User() {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.pathname.split("/")[2];

  const user = useSelector((state) => state.user.currentUser.otherInfo);
  // console.log("user: ", user, userId);

  // const user = users.find((item) => item._id === userId);
  // console.log("user: ", user);
  // console.log(products.filter((item) => item._id === productId));

  const [updatedUserInfo, setUpdatedUserInfo] = useState({});
  const [updatedAddress, setUpdatedAddress] = useState({
    SocName: "",
    Road: "",
    City: "",
    State: "",
  });
  const [updatedFile, setUpdatedFile] = useState(null);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    setUpdatedUserInfo({
      ...updatedUserInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddress = (e) => {
    e.preventDefault();
    setUpdatedAddress({ ...updatedAddress, [e.target.name]: e.target.value });
  };
  const handleFile = (e) => {
    // console.log(e.target.files);
    //e.target.files is an array of objects...we want only one file
    e.preventDefault();
    setUpdatedFile(e.target.files[0]);
  };
  // console.log(updatedFile);

  // console.log({ ...updatedUserInfo, updatedAddress: updatedAddress });

  const handleClick = (e) => {
    e.preventDefault();
    const updatedFileName = new Date().getTime() + updatedFile.name; //we are giving a unique name to file.name bcoz in future if uploaded file with same name it overwrites it ...so to avoid overwritting of file
    // console.log(fileName);
    const storage = getStorage(app);
    const storageRef = ref(storage, updatedFileName);

    const uploadTask = uploadBytesResumable(storageRef, updatedFile); //file and not fileName bcoz storageRef contains fileName as ref

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
          // console.log("updatedFile available at", downloadURL);
          const updatedUser = {
            ...updatedUserInfo,
            address: updatedAddress,
            image: downloadURL,
          };
          // console.log(updatedUser);
          updateUser(userId, updatedUser, dispatch);
          navigate("/login");
        });
      }
    );
  };

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        {/* <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link> */}
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img src={user?.image} alt="" className="userShowImg" />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user?.name}</span>
              <span className="userShowUserTitle">Software Engineer</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{user?.name}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">10.12.1999</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{user?.phoneNumber}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user?.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">
                {user?.address.City} | {user?.address.State}
              </span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  placeholder={user?.name}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder={user?.name}
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  placeholder={user?.email}
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="******"
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="number"
                  name="phoneNumber"
                  placeholder={user?.phoneNumber}
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Address</label>
                <input
                  type="text"
                  name="SocName"
                  placeholder={"SocName:  " + user?.address.SocName}
                  className="userUpdateInput"
                  onChange={handleAddress}
                />
                <input
                  type="text"
                  name="Road"
                  placeholder={"Road:  " + user?.address.Road}
                  className="userUpdateInput"
                  onChange={handleAddress}
                />{" "}
                <input
                  type="text"
                  name="City"
                  placeholder={"City:  " + user?.address.City}
                  className="userUpdateInput"
                  onChange={handleAddress}
                />{" "}
                <input
                  type="text"
                  name="State"
                  placeholder={"State:  " + user?.address.State}
                  className="userUpdateInput"
                  onChange={handleAddress}
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img className="userUpdateImg" src={user?.image} alt="" />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                  onChange={handleFile}
                />
              </div>
              <button className="userUpdateButton" onClick={handleClick}>
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
