import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getSneakers } from "../../../Redux/Actions";
import Cards from "../../../Components/Cards";
import { Link } from "react-router-dom";

export default function Products() {
  const dispatch = useDispatch();

  const sneakers = useSelector((state) => state.Sneakers);

  return (
    <div className="userPage">
      <h1>Products</h1>
      <Link to="/addProd">ADD PRODUCT</Link>
      <Cards renderSneakers={sneakers} admin={true} />
    </div>
  );
}
