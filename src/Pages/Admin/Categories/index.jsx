import React, { useEffect } from "react";
import TableCategories from "./table";
import { useDispatch } from "react-redux";
import { getCategories } from "../../../Redux/Actions";
import s from "./categories.module.css";

export default function CategoriesContent() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div className="categoriesPage">
      <div className={s.categories}>
        <h1>Categories</h1>
        <button>ADD CATEGORY</button>
      </div>
      <TableCategories />
    </div>
  );
}
