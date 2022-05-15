import React from "react";
import style from './Card.module.css'
import { Link } from "react-router-dom"

function Card({ sneaker }) {
  
  const { model, price, image, brand, id } = sneaker;

  return (
    <div>
      <Link to={`/detail/${id}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>
        <div className={style.card}>
          <img
            src={image}
            alt=""
            className={style.img}
          />
          <div className={style.data_container}>
            <section className={style.data}>
              <p className={style.brand}>{brand}</p>
              <p className={style.name}>{model}</p>
            </section>
            <section className={style.price_section}>
              $<p className={style.price}>{price}</p>
            </section>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Card;