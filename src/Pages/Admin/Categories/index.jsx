import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TableCategories from "./table";
import { useDispatch } from "react-redux";
import { getCategories } from "../../../Redux/Actions";
import s from "./categories.module.css";
import CreateModalCate from "./CreateCategoryModal";
import ModalAdmin from "../ModalAdmin/ModalAdmin";

export default function CategoriesContent() {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [modalDelete, setModalDelete] = useState({
    show: false,
    msg: "",
    title: "",
    action: "",
  });

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div className="categoriesPage">
      <div className={s.categories}>
        <h1>Categories</h1>
        <button className={s.btnAdd} onClick={() => setModalShow(true)}>
          ADD CATEGORY
        </button>
        <CreateModalCate show={modalShow} onHide={() => setModalShow(false)} />
        <TableCategories
          showModalDelete={() => setModalDelete({ ...modalDelete, show: true })}
          setModalDelete={setModalDelete}
          state={modalDelete}
        />
        <ModalAdmin
          show={modalDelete.show}
          onHide={() => setModalDelete({ ...modalDelete, show: false })}
          action={modalDelete.action}
          msg={modalDelete.msg}
          title={modalDelete.title}
        />
      </div>
    </div>
  );
}
