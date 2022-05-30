import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ImagenPrincipal.module.css";
import image from "../../Assets/Images/2.svg";
import { offerSneaker } from "../../Redux/Actions/index";
import { useDispatch } from "react-redux";

function ImagenPrincipal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOffer = async (e) => {
    e.preventDefault();
    await dispatch(offerSneaker(13));
    navigate("/cart");
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.item__left}>
          <h1>
            Nike <span>Air</span>
          </h1>
          <h2>Zoom</h2>
          <p>20% Discount</p>
          <button onClick={handleOffer}>Shop now</button>
        </div>
        <div className={styles.item__right}>
          <img src={image} alt="imagen" />
        </div>
      </div>
    </section>
  );
}

export default ImagenPrincipal;
