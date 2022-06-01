import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom"
import style from './Card.module.css'
import { FaHeart, FaRegHeart } from "react-icons/fa";


// CORAZON
// <span title={wishlisted ? `it's already on your wishlist` : `add it to your wishlist`} >
//           {
//             wishlisted ? <FaHeart color='red' /> : <FaRegHeart />
//           }
//         </span>


function handleClick() {
  alert('Esto es una prueba')
  dispatch({type:'BACK_TO_HOME', payload:true})
}

function Card({ sneaker }) {
  const dispatch = useDispatch();
  
  const { model, price, image, brand, id, discountPrice } = sneaker;

  return (
    <div>
      <Link to={`/detail/${id}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>
        <div className={style.card}>
          {
            discountPrice > 0
            && <div className={style.discount}>$ {discountPrice}. {`(discount Price)`}</div>
          }
          <div className={style.heart} onClick={handleClick}>
            <span >
              <FaRegHeart />
              {/* para renderizar el corazon rojo */}
              {/* <FaHeart color='red' /> */}
            </span>
          </div>
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