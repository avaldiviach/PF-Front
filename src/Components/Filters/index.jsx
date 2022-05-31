import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  filterByBrand,
  filterByCategory,
  OrderingByPrice,
} from "../../Redux/Actions/index";

import s from "./filters.module.css";

const Filters = () => {
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  // const url = 'https://node-api-sneakers.herokuapp.com'
  const url = "http://localhost:3001";

  const peticion = async () => {
    let resp1 = await fetch(`${url}/brands`);
    let brands = await resp1.json();
    let resp2 = await fetch(`${url}/categories`);
    let categories = await resp2.json();
    setBrands(brands);
    setCategories(categories);
  };

  useEffect(() => {
    peticion();
    // eslint-disable-next-line
  }, []);

  const handleCategory = (e) => {
    e.preventDefault();
    dispatch(filterByCategory(e.target.value));
  };

  const handleBrand = (e) => {
    e.preventDefault();
    dispatch(filterByBrand(e.target.value));
  };

  const handleOrderingPrice = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    dispatch(OrderingByPrice(e.target.value));
  };

  return (
    <div className={s.filters}>
      <select onChange={handleCategory} name="categoryFilters">
        <option value="">All categories</option>
        {categories.length &&
          categories?.map(({ nameCategory }, id) => (
            <option key={id} value={nameCategory.toLowerCase()}>
              {nameCategory}
            </option>
          ))}
      </select>

      <select onChange={handleBrand}>
        <option value="">All brands</option>
        {brands.length &&
          brands?.map(({ nameBrand }, id) => (
            <option key={id} value={nameBrand}>
              {nameBrand}
            </option>
          ))}
      </select>

      <select onChange={handleOrderingPrice}>
        <option value="">Prices</option>
        <option value="asc">Low to Higher</option>
        <option value="desc">Higher to Low </option>
      </select>
    </div>
  );
};

export default Filters;
