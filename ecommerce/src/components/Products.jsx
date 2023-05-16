import styled from "styled-components";
import { popularProducts } from "../assets/data";
import Product from "./Product";
import axios from "axios";
import { useEffect, useState } from "react";
import { filledInputClasses } from "@mui/material";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  justify-content: space-between;
`;
const Products = ({ cat, filter, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  // const [sortProduct, setSortProduct] = useState("newest")

  useEffect(() => {
    const getProduct = async() => {
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:8800/api/products?category=${cat}`
            : `http://localhost:8800/api/products`
        );
        // console.log(res.data)
        setProducts(res.data)
      } catch (err) {
        console.log(err)
      }
    };
    getProduct();
  }, [cat]);

  useEffect(() =>{
    cat && setFilteredProducts(
      products.filter((item) =>
        Object.entries(filter).every(([key, value]) =>
          item[key].includes(value)
          )
        )
    );
  }, [products, cat, filter]);

  // sort {newest, asc and des}
  useEffect(() =>{
    if(sort === "newest"){
      setFilteredProducts(
        prev =>
        [...prev].sort((a, b) => a.createdAt - b.createAt)
      )
    }else if(sort === "asc"){
      setFilteredProducts(
        prev =>
        [...prev].sort((a, b) => a.price - b.price)
      )
    }else{
      setFilteredProducts(prev =>
        [...prev].sort((a, b) => b.price - a.price)
        )
    }
  }, [sort])

  // console.log(cat, filter, sort);
  return (
    <Container>
      {cat ? filteredProducts.map((item) => ( <Product item={item} key={item._id} /> )) : products.slice(0, 8).map((item) => (<Product item={item} key={item.id} />))}
    </Container>
  );
  

};

export default Products;
