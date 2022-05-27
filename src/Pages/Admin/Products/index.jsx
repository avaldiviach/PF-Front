import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../../Components/Cards";
import { useEffect, useState } from "react";
import {
  getModels,
  getMaterials,
  getSizes,
  getColors,
  getCategories,
  getBrands,
  getSneakers,
} from "../../../Redux/Actions";
import CreateModel from "./createModel/CreateModel";
import CreateSneaker from "./createModel/CreateSneaker";
import UpdateSneaker from "./createModel/UpdateSneaker";
import s from "../Categories/categories.module.css";
import ModalAdmin from "../ModalAdmin/ModalAdmin";

export default function Products() {
  const sneakers = useSelector((state) => state.Sneakers);
  const dispatch = useDispatch();

  const [showModalSneaker, setshowModalSneaker] = useState(false);
  const [showModalModel, setshowModalModel] = useState(false);
  const [modalUpdate, setModalUpdate] = useState({
    show: false,
    price: "",
    sizes: [],
    id: "",
    name: "",
  });

  const [modalDeleteProd, setModalDeleteProd] = useState({
    show: false,
    msg: "",
    title: "",
    action: "",
  });

  useEffect(() => {
    async function load() {
      await dispatch(getModels());
      await dispatch(getMaterials());
      await dispatch(getSizes());
      await dispatch(getColors());
      await dispatch(getCategories());
      await dispatch(getBrands());
    }
    load();
  }, [showModalModel, showModalSneaker, modalUpdate]);

  return (
    <section className="userPage">
      <h1>Products</h1>
      <button className={s.btnAdd} onClick={() => setshowModalSneaker(true)}>
        ADD PRODUCT
      </button>
      <CreateSneaker
        show={showModalSneaker}
        onHide={() => setshowModalSneaker(false)}
        model={() => setshowModalModel(true)}
      />

      <button className={s.btnAdd} onClick={() => setshowModalModel(true)}>
        ADD MODEL
      </button>
      <CreateModel
        show={showModalModel}
        onHide={() => setshowModalModel(false)}
      />

      <Card
        renderSneakers={sneakers}
        admin={true}
        setState={setModalUpdate}
        showModalDelete={() =>
          setModalDeleteProd({ ...modalDeleteProd, show: true })
        }
        setModalDeleteProd={setModalDeleteProd}
        state={modalDeleteProd}
      />
      <UpdateSneaker
        show={modalUpdate.show}
        onHide={() => setModalUpdate({ ...modalUpdate, show: false })}
        sneaker={modalUpdate}
      />

      <ModalAdmin
        show={modalDeleteProd.show}
        onHide={() => setModalDeleteProd({ ...modalDeleteProd, show: false })}
        action={modalDeleteProd.action}
        msg={modalDeleteProd.msg}
        title={modalDeleteProd.title}
      />
    </section>
  );
}
