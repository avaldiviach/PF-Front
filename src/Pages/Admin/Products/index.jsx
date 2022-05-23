import React from "react";
import { useSelector } from "react-redux";
import Cards from "../../../Components/Cards";
import { Link } from "react-router-dom";

export default function Products() {
  const sneakers = useSelector((state) => state.Sneakers);

  return (
    <div className="userPage">
      <h1>Products</h1>
      <Link to="/addProd">ADD PRODUCT</Link>
      <Cards renderSneakers={sneakers} admin={true} />
    </div>
  );
}
