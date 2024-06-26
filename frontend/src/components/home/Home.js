import React, {useContext, useState, useEffect} from 'react'
import Banner from "../banner/Banner";
import Cards from "../cards/Cards";
import Popular from "../popular/Popular";
import axios from 'axios';
import AppContext from "../../services/AppContext";

const Home = () => {
  const [state, setState] = useContext(AppContext);
  const [fruits, setFruits] = useState([]);
  const [vegetables, setVegetables] = useState([]);

  const fetchProducts = () => {
    axios.get("http://localhost:5000/api/products").then(res=> {
      let products = res.data;
      for (let product of products) {
        product.quantity = 0;
      }
      categorizeProducts(products);
      setState({...state, products});
    }).catch(error=>{
      console.error(error);
    })
  }

  const categorizeProducts = (products) => {
    const tempFruits=[], tempVegetables=[];
    for (let product of products) {
      if (product.type === "fruits" && product.popular === 1) {
        tempFruits.push(product)
      }

      if (product.type === "vegetables" && product.popular === 1) {
        tempVegetables.push(product)
      }
    }
    setFruits(tempFruits);
    setVegetables(tempVegetables); 
  }

  useEffect(()=> {
    if (state.products.length === 0) {
      fetchProducts();
    } else {
      categorizeProducts(state.products);
    }
  }, []);
  
  return (
    <>
      <Banner/>
      <Cards/>
      <Popular title={"Popular Fruits"} items={fruits}/>
      <Popular title={"Popular Vegetables"} items={vegetables}/>
    </>
  )
}

export default Home