import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/authContext";

import styles from './Reviews.module.css';
import image from '../../Assets/Images/3.svg';
import RatingStarsRead from "../../Components/Reviews/RatingStarsRead";

export default function Review({ review }) {
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onChange", });
  // const [error, setError] = useState('');
  const { signin, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  return (
    <div className={styles.form_container}>
        <fieldset className={styles.formulario__fieldset}>
          <RatingStarsRead rating={review.rating} />
          <div className={styles.formulario__contenedorCampos}>
            <div className={styles.formulario__contenedorCampos__campo}>
              {/* titulo de la review */}
              <h2 className={styles.formulario__campo__titulo}>{review.title}</h2>
            </div>
            <div className={styles.formulario__contenedorCampos__campo}>
              {/* descripcion de la review */}
              <p className={styles.formulario__campo__titulo}>{review.review}</p>
            </div>
          </div>
        </fieldset>
  
    </div>
  );
}
