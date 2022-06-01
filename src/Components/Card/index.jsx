import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom"
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { addWishlist } from '../../Redux/Actions';
import style from './Card.module.css'

function Card({ sneaker }) {

  const { model, price, image, brand, id, discountPrice } = sneaker;
  const [any, forceUpdate] = useReducer(num => num + 1, 0);
  const dispatch = useDispatch();
  const wishlistData = useSelector(state => state.wishlistData);
  const heart = wishlistData.find(sneaker => sneaker.id === id)?.wishlisted;
  const [wishlisted, setWishlisted] = useState(heart);

  // agregar a la lista de deseos
  const wishlistHandler = () => {
    //setWishlisted(!wishlisted);
    dispatch(addWishlist(id))
    forceUpdate();
  }

  useEffect(() => {
    console.log('cambió');
    if(heart !== wishlisted) setWishlisted(!wishlisted);
  }, [heart])

  return (
    <div>
      {
        console.log(wishlisted)
      }
      <span key={id} title={wishlisted ? `it's already on your wishlist ${id}` : `add it to your wishlist`} onClick={wishlistHandler}>
        {
          wishlisted === true ? <span key={id}><FaHeart color='red' /></span> : <span key={id}><FaRegHeart /></span>
          //<span key={id}><FaHeart color={wishlisted ? 'red' : ''} /></span>
        }
      </span>
      <Link to={`/detail/${id}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>
      <div className={style.card}>
          {
            discountPrice > 0
            && <div className={style.discount}>$ {discountPrice}. {`(discount Price)`}</div>
          }
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