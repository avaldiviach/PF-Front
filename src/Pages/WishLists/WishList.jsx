import { useReducer } from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  addWishlist,
} from "../../Redux/Actions";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import style from './WishList.module.css';

function WishList({ data }) {
  const dispatch = useDispatch();
  const { id, model, brand, image, discountPrice, wishlisted } = data;

  // para forzar el reenderizado de los componentes cuando se agrega un producto
  const [any, forceUpdate] = useReducer(num => num + 1, 0);

  // agregar a la lista de deseos
  const wishlistHandler = () => {
    dispatch(addWishlist(id));
    forceUpdate();
  }

  return (
    <>
      {
        wishlisted && (<div className={style.card}>
          <span className={style.heart} title={wishlisted ? `it's already on your wishlist` : `add it to your wishlist`} onClick={wishlistHandler}>
            {
              wishlisted ? <FaHeart color='red' /> : <FaRegHeart />
            }
          </span>
          {
            discountPrice > 0
            && <div className={style.discount}>$ {discountPrice}. {`(discount Price)`}</div>
          }
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
        </div>)
      }
    </>
  )
}

export default WishList;