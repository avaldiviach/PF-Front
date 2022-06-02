import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";

//Componentes y funciones
import ModalCart from "../../Components/Modal/modalCart"
import RatingStars from "../../Components/Reviews/RatingStarsRead";
// import Reviews from "../../Components/Reviews/CreateReview";
import ListReviews from "../../Components/Reviews/ListReview";
import { getDetailSneaker, cleanDetail, addItem } from "../../Redux/Actions";
import s from "./detail.module.css";

export default function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const sneaker = useSelector((state) => state.detail);
  const backToHome = useSelector((state) => state.backToHome);
  const [selectSneaker, setSelectSneaker] = useState(false);
  const [alert, setAlert] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (backToHome) {
      navigate('/')
    }
  }, [])
  
  useEffect(() => {
    dispatch(getDetailSneaker(id));
    return () => {
      dispatch(cleanDetail());
    };
    
  }, [id]);

  function selectSize(e) {
    const { target: { value } } = e;
    const obj = { ...sneaker, sizes: sneaker.sizes[value] };
    setSelectSneaker({ ...obj });
  }
  
  function addToCart() {
    //verifica si se seleccionó una talla
    if (!selectSneaker) {
      setAlert({
        title: 'An option is missing',
        msg: 'Select a size to add to cart',
        goCart: false
      })
      return
    };
    //verifica si ya existe la zapatilla con esa talla en el carrito
    let exist = dispatch(addItem(selectSneaker));
    !exist
      ? setAlert({
        title: 'Done',
        msg: 'Item successfully added to cart',
        goCart: true
      })
      : setAlert({
        title: 'Warning',
        msg: 'Item is already in your cart',
        goCart: true
      })
  }

  return (
    <div>
      <div className={s.loading}>
        {
          alert && <ModalCart active={true} msg={alert.msg} title={alert.title} reset={setAlert} goCart={alert.goCart} />
        }
        {
          !sneaker.price ? (
            <img src="https://c.tenor.com/_tt3TLfzyYoAAAAC/s4gu-loding.gif" alt="img loading" />
          ) : (
            <div className={s.detail}>
              <section className={s.left} >
                <div className={s.btn_container}>
                <Link to="/" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                    <div className={s.btn}>
                      <button className={s.home}> {'<'} </button>
                      <p className={s.btn_title}>GO BACK</p>
                    </div>
                  </Link>
                </div>
                <img src={sneaker.image} alt={"img"} />
                
              </section>

              <section className={s.rigth}>
                <p className={s.brand}> {sneaker.brand}</p>
                <RatingStars rating={sneaker.rating} />
                
                <p className={s.price} >${sneaker.price}</p>
                <p className={s.details}>Details: {sneaker.description}</p>
                <p className={s.sizes_title}>Select Size (EUR)</p>
                <div className={s.sizes}>
                  <select className={s.selectSize} onChange={selectSize}>
                    <option value="" >Select Size</option>
                    {sneaker.sizes?.map(({ size, stock }, i) => stock && <option className={s.size} key={i} value={i} >{size}</option>)}
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
      <div className={`${s.detailr} ${s.listReviews} `}>
        <div className={s.containerReviews}>
          <ListReviews id={id} />
        </div>
      </div>
            
        
    </div>

  );
}