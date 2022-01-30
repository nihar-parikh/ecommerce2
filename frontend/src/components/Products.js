import styled from "styled-components";
import ProductItems from "./ProductItems";
// import { products } from "../data";
import { mobile } from "../responsive";
import { useState, useEffect } from "react";
import axios from "axios";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  flex-wrap: wrap;
  ${mobile({
    padding: "0px",
  })}
`;
const Products = ({ category, filters, sorts }) => {
  console.log("category: ", category);
  console.log("filters: ", filters);
  console.log("sorts: ", sorts);

  const [popularProducts, setPopularProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          category
            ? `http://localhost:8000/api/products?categories=${category}`
            : "http://localhost:8000/api/products"
        );
        //console.log(res.data);
        setPopularProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [category]);

  useEffect(() => {
    category &&
      setFilteredProducts(
        popularProducts.filter((popularProduct) =>
          Object.entries(filters).every(([key, value]) =>
            popularProduct[key].includes(value)
          )
        )
      );
  }, [category, popularProducts, filters]);

  useEffect(() => {
    //alert(sorts.sort); //sorts is an object so sorts.sort === ""

    if (sorts === undefined) {
      console.log("sorts: ", sorts);
    } else if (sorts.sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sorts.sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sorts]);

  console.log("popularProducts: ", popularProducts);

  return (
    <Container>
      {category
        ? filteredProducts.map((item) => (
            <ProductItems key={item._id} item={item} />
          ))
        : popularProducts
            .slice(0, 8)
            .map((item) => <ProductItems key={item._id} item={item} />)}
    </Container>
  );
};

export default Products;

/* <ProductItems key={item.id} image={item.image} /> */

/* <ProductItems key={item.id} image={item.image} /> */
