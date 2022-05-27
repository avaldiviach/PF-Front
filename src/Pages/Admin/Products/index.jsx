import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../../../Components/Cards";
import { useEffect, useState } from "react";
import { getModels, getMaterials, getSizes, getColors, getCategories, getBrands, getSneakers } from "../../../Redux/Actions";
import CreateModel from "./createModel/CreateModel";
import CreateSneaker from "./createModel/CreateSneaker";
import UpdateSneaker from "./createModel/UpdateSneaker";
import s from "../Categories/categories.module.css";

export default function Products() {
  const sneakers = useSelector((state) => state.Sneakers);
  const dispatch = useDispatch();

  const [showModalSneaker, setshowModalSneaker] = useState(false);
  const [showModalModel, setshowModalModel] = useState(false);
  const [modalUpdate, setModalUpdate] = useState({
    show: false,
    price: '',
    sizes: [],
    id: '',
    name: ''
  });




  useEffect(() => {
    async function load(){
      await dispatch(getModels());
      await dispatch(getMaterials());
      await dispatch(getSizes());
      await dispatch(getColors());
      await dispatch(getCategories());
      await dispatch(getBrands());

    }
    load()
    console.log(modalUpdate)
  }, [showModalModel, showModalSneaker, modalUpdate]);


  return (
    <section className="userPage">
      <h1>Products</h1>
      <button className={s.btnAdd} onClick={() => setshowModalSneaker(true)}>
        ADD PRODUCT
      </button>
      <CreateSneaker show={showModalSneaker} onHide={() => setshowModalSneaker(false)} model={() => setshowModalModel(true)} />

      <button className={s.btnAdd} onClick={() => setshowModalModel(true)}>
        ADD MODEL
      </button>
      <CreateModel show={showModalModel} onHide={() => setshowModalModel(false)} />

      <Cards renderSneakers={sneakers} admin={true} setState={setModalUpdate}/>
      <UpdateSneaker show={modalUpdate.show} onHide={() => setModalUpdate({...modalUpdate, show: false})} sneaker={modalUpdate} />
    </section>
  );
}
