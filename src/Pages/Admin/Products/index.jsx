import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../../../Components/Cards";
import { useEffect, useState } from "react";
import { getModels, getMaterials } from "../../../Redux/Actions";
import CreateModel from "./createModel/CreateModel";
import CreateSneaker from "./createModel/CreateSneaker";
import s from "../Categories/categories.module.css";

export default function Products() {
  const sneakers = useSelector((state) => state.Sneakers);
  const dispatch = useDispatch();

  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    dispatch(getModels());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getMaterials());
  }, [dispatch]);

  return (
    <div className="userPage">
      <h1>Products</h1>
      <button className={s.btnAdd} onClick={() => setModalShow(true)}>
        ADD PRODUCT
      </button>
      <CreateSneaker show={modalShow} onHide={() => setModalShow(false)} />

      <button className={s.btnAdd} onClick={() => setModalShow(true)}>
        ADD MODEL
      </button>
      <CreateModel show={modalShow} onHide={() => setModalShow(false)} />

      <Cards renderSneakers={sneakers} admin={true} />
    </div>
  );
}
