import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser } from "../../Redux/Actions";
import style from "./Card.module.css";

function Card({ sneaker }) {
  const { model, price, image, brand, id } = sneaker;
  const dispatch = useDispatch();

  const deleteSneaker = (e) => {
    e.preventDefault();
    dispatch(deleteUser(e.target.value));
    alert("sneaker has been deleted", id);
  };

  const updateSneaker = () => {
    e.preventDefault();
  };

  return (
    <div>
      <div className={style.card}>
        <div className={style.btn_container}>
          <button className={style.delete} onClick={deleteSneaker}>
            ✖︎
          </button>
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
