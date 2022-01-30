import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { productData } from "../../dummyData";
import { Publish } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import { userRequest } from "../../requestMethods";
import app from "../../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { updateProducts } from "../../redux/apiCalls";

export default function Product() {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];

  const [productStats, setProductStats] = useState([]);

  const products = useSelector((state) => state.product.products);
  // console.log("products: ", products, productId);

  const product = products.find((item) => item._id === productId);
  // console.log("product: ", product);
  // console.log(products.filter((item) => item._id === productId));

  const Months = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getProductStats = async () => {
      try {
        const res = await userRequest.get(
          `/orders/income/6194ffccd6fdfb0d7791619d?pid=${productId}`
        );
        const list = res.data.sort((a, b) => {
          return a._id - b._id;
        });
        list.map((item) =>
          setProductStats((prev) => [
            ...prev,
            {
              name: Months[item._id - 1],
              Sales: item.total, //key=Sales ...line 77
            },
          ])
        );
      } catch (error) {
        console.log(error);
      }
    };
    getProductStats();
  }, [productId, Months]);

  const [updatedProductInfo, setUpdatedProductInfo] = useState({});
  const [updatedCategories, setUpdatedCategories] = useState([]);
  const [updatedSize, setUpdatedSize] = useState([]);
  const [updatedColor, setUpdatedColor] = useState([]);
  const [updatedFile, setUpdatedFile] = useState(null);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    setUpdatedProductInfo({
      ...updatedProductInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategories = (e) => {
    e.preventDefault();
    setUpdatedCategories(e.target.value.split(","));
  };
  const handleSize = (e) => {
    e.preventDefault();
    setUpdatedSize(e.target.value.split(","));
  };
  const handleColor = (e) => {
    e.preventDefault();
    setUpdatedColor(e.target.value.split(","));
  };

  const handleFile = (e) => {
    // console.log(e.target.files);
    //e.target.files is an array of objects...we want only one file
    e.preventDefault();
    setUpdatedFile(e.target.files[0]);
  };
  // console.log(updatedFile);

  // console.log(updatedProductInfo, updatedCategories, updatedSize, updatedColor);

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
          const updatedProduct = {
            ...updatedProductInfo,
            updatedCategories,
            updatedColor,
            updatedSize,
            image: downloadURL,
          };
          // console.log(updatedProduct);
          updateProducts(productId, updatedProduct, dispatch);
        });
      }
    );
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart
            data={productStats}
            dataKey="Sales" //key=Sales ...line 54
            title="Sales Performance"
          />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product.image} alt="img" className="productInfoImg" />

            <span className="productName">{product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{product._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">sales:</span>
              <span className="productInfoValue">5123</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">active:</span>
              <span className="productInfoValue">yes</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">in stock:</span>
              <span className="productInfoValue">{product.inStock}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Product Name</label>
            <input
              type="text"
              name="title"
              placeholder={product.title}
              onChange={handleChange}
            />
            <label>Product Description</label>
            <input
              type="text"
              name="description"
              placeholder={product.description}
              onChange={handleChange}
            />

            <label>Categories</label>
            <input
              type="text"
              name="categories"
              placeholder={product.categories}
              onChange={handleCategories}
            />

            <label>Size</label>
            <input
              type="text"
              name="size"
              placeholder={product.size}
              onChange={handleSize}
            />

            <label>Color</label>
            <input
              type="text"
              name="color"
              placeholder={product.color}
              onChange={handleColor}
            />

            <label>Product Price</label>
            <input
              type="number"
              name="price"
              placeholder={product.price}
              onChange={handleChange}
            />

            <label>In Stock</label>
            <select name="inStock" id="idStock">
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            <label>Active</label>
            <select name="active" id="active">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={product.image} alt="img" className="productUploadImg" />

              <label for="file">
                <Publish />
              </label>
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                onChange={handleFile}
              />
            </div>
            <button className="productButton" onClick={handleClick}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
