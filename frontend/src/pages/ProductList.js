import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const Container = styled.div``;
const Title = styled.h1`
  margin: 20px;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({
    flexDirection: "column",
  })}
`;
const Filter = styled.div`
  margin: 20px;
  display: flex;
  align-items: center;
`;
const FilterText = styled.div`
  font-size: 20px;
  font-weight: 600;
`;

const Select = styled.select`
  height: 30px;
  width: 80px;
  margin-left: 10px;
`;
const Option = styled.option``;

const ProductList = () => {
  const location = useLocation(); //for getting pathname like /products/men
  //console.log(location.pathname);
  const category = location.pathname.split("/")[2]; //spliting products and men
  //console.log(category);

  const [filters, setFilters] = useState({});
  const [sorts, setSorts] = useState({});
  
  
  const handleFilters = (e) => {
    e.preventDefault();
    //console.log(e.target.value);
    const value = e.target.value;

    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };
  // console.log(filters);

  const handleSorts = (e) => {
    e.preventDefault();
    setSorts({ ...sorts, [e.target.name]: e.target.value });
    //alert("hello");
  };
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>{category.toUpperCase()}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name="color" onChange={handleFilters}>
            <Option defaultValue>Color</Option>
            <Option>Red</Option>
            <Option>Blue</Option>
            <Option>Green</Option>
            <Option>White</Option>
            <Option>Black</Option>
          </Select>
          <Select name="size" onChange={handleFilters}>
            <Option defaultValue>Size</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
            <Option>XXL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select name="sort" onChange={handleSorts}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="dsc">Price (dsc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products category={category} filters={filters} sorts={sorts} />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;
