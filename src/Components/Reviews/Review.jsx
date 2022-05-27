import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/authContext";

import styles from './Reviews.module.css';
import image from '../../Assets/Images/3.svg';
import RatingStars from "../../Components/Reviews/RatingStarsRead";

export default function Reviews() {
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onChange", });
  // const [error, setError] = useState('');
  const { signin, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
  }

  return (
    <section className={styles.main_createUser}>

      <div className={styles.container}>

        <div className={styles.form_container}>
          <div className={styles.formulario}>
            <fieldset className={styles.formulario__fieldset}>
              <legend className={styles.formulario__legend}><h3>Review about this product</h3></legend>

              <RatingStars />

              <div className={styles.formulario__contenedorCampos}>
                <div className={styles.formulario__contenedorCampos__campo}>
                  {/* titulo de la review */}
                  <h2 className={styles.formulario__campo__titulo}>Review Title</h2>
                </div>
                <div className={styles.formulario__contenedorCampos__campo}>
                  {/* descripcion de la review */}
                  <p className={styles.formulario__campo__titulo}>Review Description</p>
                </div>

              </div>
            </fieldset>
          </div>
        </div>

        <div className={styles.rightBox}>
          <div className={styles.position_relative}>
            {/* <h2 className={styles.rotate}>HENRYS</h2> */}
            <div className={styles.image_container}>
              <img src={image} alt="sneaker" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
