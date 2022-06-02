import React, { useReducer, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addWishlist,
  getTotalPrice,
} from "../../Redux/Actions";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import style from './WishList.module.css';

function WishList({ data }) {
  const dispatch = useDispatch();
  const [toDelete, setToDelete] = useState(false)
  const { id, name, model, brand, categories, description, image, size, wishlisted } = data;
  //const { discountPrice } = useSelector(state => state.Sneakers.find(sneaker => sneaker.id === id));
  const user = useSelector(state => state.getUser);

  // para forzar el reenderizado de los componentes cuando se agrega un producto
  const [any, forceUpdate] = useReducer(num => num + 1, 0);

  // agregar a la lista de deseos
  const wishlistHandler = () => {
    dispatch(addWishlist(id));
    forceUpdate();
  }
  return (
    <>
      <div className={style.card}>
        <span className={style.heart} title={wishlisted ? `it's already on your wishlist` : `add it to your wishlist`} onClick={wishlistHandler}>
          {
            wishlisted ? <FaHeart color='red' /> : <FaRegHeart />
          }
        </span>
        {/* {
              discountPrice > 0
              && <div className={style.discount}>$ {discountPrice}. {`(discount Price)`}</div>
            } */}
        <Link to={`/detail/${id}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>
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
          </div>
        </Link>
      </div>

    </>

  )
}

export default WishList;