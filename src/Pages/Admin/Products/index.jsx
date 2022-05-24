import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../../../Components/Cards";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getModels, getMaterials } from "../../../Redux/Actions";

export default function Products() {
  const sneakers = useSelector((state) => state.Sneakers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getModels());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getMaterials());
  }, [dispatch]);

  return (
    <div className="userPage">
      <h1>Products</h1>
      <Link to="/addProd">ADD MODEL</Link>
      <Link to="/addPro">ADD PRODUCT</Link>

      <Cards renderSneakers={sneakers} admin={true} />
    </div>
  );
}
