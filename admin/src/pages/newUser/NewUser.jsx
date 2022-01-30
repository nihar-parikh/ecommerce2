import { useState } from "react";
import app from "../../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useDispatch } from "react-redux";
import "./newUser.css";
import { addUser } from "../../redux/apiCalls";

export default function NewUser() {
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
          // console.log(user);
          addUser(user, dispatch);
        });
      }
    );
  };

  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Image</label>
          <input type="file" id="file" onChange={handleFile} />
        </div>
        {/* <div className="newUserItem">
          <label>Username</label>
          <input type="text" placeholder="john" />
        </div> */}
        <div className="newUserItem">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="John Smith"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="john@gmail.com"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Phone</label>
          <input
            type="number"
            name="phoneNumber"
            placeholder="+1 123 456 78"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label name="address">Address</label>

          <input
            type="text"
            name="SocName"
            placeholder="SocName"
            onChange={handleAddress}
          />
          <br />
          <input
            type="text"
            name="Road"
            placeholder="Road"
            onChange={handleAddress}
          />
          <br />
          <input
            type="text"
            name="City"
            placeholder="City"
            onChange={handleAddress}
          />
          <br />
          <input
            type="text"
            name="State"
            placeholder="State"
            onChange={handleAddress}
          />
        </div>
        <div className="newUserItem">
          <label>Gender</label>
          <div className="newUserGender">
            <input
              type="radio"
              name="gender"
              id="male"
              value="male"
              onChange={handleChange}
            />
            <label for="male">Male</label>
            <input
              type="radio"
              name="gender"
              id="female"
              value="female"
              onChange={handleChange}
            />
            <label for="female">Female</label>
            <input
              type="radio"
              name="gender"
              id="other"
              value="other"
              onChange={handleChange}
            />
            <label for="other">Other</label>
          </div>
        </div>
        {/* <div className="newUserItem">
          <label>Active</label>
          <select className="newUserSelect" name="active" id="active">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div> */}
        <button className="newUserButton" onClick={handleClick}>
          Create
        </button>
      </form>
    </div>
  );
}
