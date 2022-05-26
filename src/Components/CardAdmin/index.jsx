import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteSneaker, getSneakers } from "../../Redux/Actions";
import style from "./Card.module.css";
import Switch from '@mui/material/Switch';
import { FormControlLabel } from "@mui/material";

function Card({ sneaker }) {
  const { model, price, image, brand, id, deleted } = sneaker;
  const dispatch = useDispatch();

  const handleDeleteSneaker = async (e) => {
    e.preventDefault();
    await dispatch(deleteSneaker(e.target.value));
    await dispatch(getSneakers()) 
    alert("sneaker has been deleted", id);
  };

  const updateSneaker = () => {
    e.preventDefault();
  };
  return (
    <div>
      <div className={style.card}>
        <div className={style.btn_container}>
          <FormControlLabel
            value="top"
            control={<Switch checked={!deleted} color="success" value={id} onChange={(e) => alert(e.target.checked)} onClick={handleDeleteSneaker}/>}
            label="Status"
            labelPlacement="start"
          />
          <button className={style.update} onClick={updateSneaker}>
            ✎
          </button>
        </div>
        <Link
          to={`/detail/${id}`}
          style={{ color: "inherit", textDecoration: "inherit" }}
        >
          <img src={image} alt="" className={style.img} />
          <div className={style.data_container}>
            <section className={style.data}>
              <p className={style.brand}>{brand}</p>
              <p className={style.name}>{model}</p>
              <p>{`Delete:${deleted}`}</p>
            </section>
            <section className={style.price_section}>
              $<p className={style.price}>{price}</p>
            </section>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Card;
