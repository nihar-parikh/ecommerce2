import styled from "styled-components";
import CategoryItems from "./CategoryItems";
import { categories } from "../data";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({
    padding: "0px",
    flexDirection: "column",
  })}
`;

const Categories = () => {
  return (
    <Container>
      {categories.map((item) => (
        <CategoryItems
          key={item.id}
          image={item.image}
          title={item.title}
          category={item.category}
        />
      ))}
    </Container>
  );
};

export default Categories;
