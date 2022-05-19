import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getDetailSneaker, cleanDetail, addItem } from "../../Redux/Actions";

import s from "./detail.module.css";

export default function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const sneaker = useSelector((state) => state.detail);
  const [selectSneaker, setSelectSneaker] = useState("");

  useEffect(() => {
    dispatch(getDetailSneaker(id));
    return () => {
      dispatch(cleanDetail());
    };
  }, [id]);

  function addToCart() {
    //verifica si se seleccionó una talla
    if (!selectSneaker) return alert('Select a size to add to cart');
    //verifica si ya existe la zapatilla con esa talla en el carrito
    let exist = dispatch(addItem(selectSneaker));
    !exist ? alert('Item successfully added to cart') : alert("Item is already in your cart");
  }

  function selectSize(e) {
    const { target: { value } } = e;
    const obj = { ...sneaker, sizes: sneaker.sizes[value] };
    setSelectSneaker({ ...obj });
  }

  return (
    <div>
      {
        !sneaker.price ? (
          <img src="https://c.tenor.com/_tt3TLfzyYoAAAAC/s4gu-loding.gif" alt={"img"} />
        ) : (
          <div className={s.detail}>
            <section className={s.left} >
              <img src={sneaker.image} alt={"img"} />

              <div className={s.btn_container}>
                <Link to="/" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                  <div className={s.btn}>
                    <button className={s.home}> {'<'} </button>
                    <p className={s.btn_title}>GO BACK</p>
                  </div>
                </Link>
              </div>

            </section>
            <section className={s.rigth}>
              <p className={s.brand}> {sneaker.brand}</p>
              <p className={s.price} >${sneaker.price}</p>
              <p className={s.details}>Details: {sneaker.description}</p>
              <p className={s.sizes_title}>Selec Size (EUR)</p>
              <div className={s.sizes}>
                <select onChange={selectSize}>
                  <option value="" >Select Size</option>
                  {sneaker.sizes?.map(({ size }, i) => <option className={s.size} key={i} value={i} >{size}</option>)}
                </select>
              </div>
              <p className={s.subtitle}>Material </p>
              <p className={s.cont}>{sneaker.material}</p>
              <p className={s.subtitle}>Model</p>
              <p className={s.cont}>{sneaker.model}</p>
              <button onClick={addToCart} className={s.addCart}>Add to Cart</button>
            </section>
          </div>
        )
      }
    </div>
  );
}
