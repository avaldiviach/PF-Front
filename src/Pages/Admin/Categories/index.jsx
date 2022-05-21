import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TableCategories from "./table";
import { useDispatch } from "react-redux";
import { getCategories } from "../../../Redux/Actions";
import s from "./categories.module.css";
import CreateModal from "./CreateCategoryModal";

export default function CategoriesContent() {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    dispatch(getCategories());
    console.log('renderizando categoies')
  }, [dispatch]);

  return (
    <div className="categoriesPage">
      <div className={s.categories}>
        <h1>Categories</h1>
        <button className={s.btnAdd} onClick={() => setModalShow(true)}>ADD CATEGORY</button>
        <CreateModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
         <TableCategories/>
      </div>
     
    </div>
  );
}
