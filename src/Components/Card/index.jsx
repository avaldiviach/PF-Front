import React from "react";
import { useDispatch } from 'react-redux';
import { addItem } from "../../Redux/Actions/";
import style from './Card.module.css'
import { Link } from "react-router-dom"
import { AiFillPlusCircle } from "react-icons/ai";

function Card({ sneaker }) {

  const { model, price, image, brand, id } = sneaker;
  const dispatch = useDispatch();

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
      {/* <button onClick={() => dispatch(addItem(id))}><AiFillPlusCircle />Add to Cart</button> */}
    </div>
  );
}

export default Card;