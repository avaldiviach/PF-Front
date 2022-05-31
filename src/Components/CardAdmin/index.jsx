import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { createDiscount, deleteSneaker, getSneakers } from "../../Redux/Actions";
import style from "./Card.module.css";
import Switch from "@mui/material/Switch";
import { FormControlLabel } from "@mui/material";

function Card({ showModalDelete, setModalDeleteProd, sneaker, setState, discount,
  showDiscount }) {
  const { model, price, image, brand, id, deleted, sizes, discountPrice } = sneaker;
  const dispatch = useDispatch();

  const handleDeleteSneaker = (e) => {
    e.preventDefault();
    showModalDelete();
    if (!deleted) {
      setModalDeleteProd({
        show: true,
        msg: `Are you sure do you want to delete the sneaker ${e.target.value}?`,
        title: `Delete sneaker`,
        action: async () => {
          await dispatch(deleteSneaker(e.target.value));
          await dispatch(getSneakers());
        },
      });
    } else {
      setModalDeleteProd({
        show: true,
        msg: `Are you sure do you want to add the sneaker ${e.target.value}?`,
        title: `Add sneaker`,
        action: async () => {
          await dispatch(deleteSneaker(e.target.value));
          await dispatch(getSneakers());
        },
      });
    }
  };

  const addDiscount = (e) => {
    e.preventDefault()
    discount({
      show: true,
      id: sneaker.id
    })
  }

  const updateSneaker = (e) => {
    e.preventDefault();
    setState({
      price: price,
      sizes: sizes,
      show: true,
      id: id,
      name: model,
    });
  };
  return (
      <div className={style.card}>
        <div className={style.btn_container}>
          <FormControlLabel
            value="top"
            control={
              <Switch
                checked={!deleted}
                color="success"
                value={id}
                onChange={(e) => alert(e.target.checked)}
                onClick={(e) => handleDeleteSneaker(e)}
              />
            }
            label="Status"
            labelPlacement="start"
          />
          <button className={style.delete} onClick={addDiscount}>
            🔥
          </button>

          <button className={style.update} onClick={updateSneaker}>
            ✎
          </button>
        </div>
        
          <Link
            to={`/detail/${id}`}
            style={{ color: "inherit", textDecoration: "inherit" }}
          ><div className={style.container}>
            <img src={image} alt="" className={style.img} />
            <div className={style.data_container}>
              <section className={style.data}>
                <p className={style.brand}>{brand}</p>
                <p className={style.name}>{model}</p>
              </section>
              <section className={style.price_section}>
                $<p className={style.price}>{price}</p>
              </section>
              
            </div></div>
          </Link>
          {
                  discountPrice > 0
                  && <p className={style.discount}>$ {discountPrice}. {`(discont Price)`}</p>
                }
      </div>
      
  );
}

export default Card;
