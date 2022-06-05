import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../../context/authContext";

import styles from './CreateReview.module.css';
import image from '../../Assets/Images/3.svg';
import RatingStars from './RatingStarsModify';
import { useDispatch, useSelector } from 'react-redux';
import { createReview } from '../../Redux/Actions';
export default function Reviews() {
  // const currentSneaker = useSelector(state => state.GET_DETAIL);
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onChange", });
  // const [error, setError] = useState('');
  const {id} = useParams()
  const user = useSelector(state => state.getUser);
  const token = useSelector(state => state.getToken )
 


  const navigate = useNavigate();

  //COSAS QUE FALTAN EN ESTE COMPONENTE 
  //SINO ESTOY LOGUEADO NO PUEDO CREAR
  // MODAL DE QUE FUE CREADA LA REVIEW

  const [rating, setRating] = useState();
  const [errorRating, setErrorRating] = useState(false);

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    if (!rating) {
      setErrorRating('Please rate the sneaker');
      return;
    } else {
      setErrorRating(null)
    }
    data.email = user.email;
    data.sneakerId = id;
    data.rating = rating;
    dispatch(createReview(data));
    alert("Review created with success");
    navigate(-1)
  }

  return (
    <section className={styles.main_createUser}>

      <div className={styles.container}>

        <div className={styles.form_container}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.formulario}>
            <fieldset className={styles.formulario__fieldset}>
              <legend className={styles.formulario__legend}><h3>Enter your review for this product</h3></legend>

              <RatingStars setRating={setRating} />
              {errorRating && <p className={styles.leyenda}>{errorRating}</p>}

              <div className={styles.formulario__contenedorCampos}>
                <div className={styles.formulario__contenedorCampos__campo}>
                  <input className={styles.formulario__campo__inputTexto} type="text" placeholder="Review Title..."
                    {...register("title", { required: true, maxLength: 100 })}
                  />
                  {errors.title?.type === "required" && <p className={styles.leyenda}>Title is required</p>}
                  {errors.title?.type === "maxLength" && <p className={styles.leyenda}>Title is too long</p>}
                </div>
                <div className={styles.formulario__contenedorCampos__campo}>
                  <textarea
                    className={styles.formulario__campo__inputTexto} rows="5" placeholder="Write your review here..."
                    {...register("review", { required: true, maxLength: 700 })}
                  />
                  {errors.review?.type === "required" && <p className={styles.leyenda}>Review is required</p>}
                  {errors.review?.type === "maxLength" && <p className={styles.leyenda}>Review is too long</p>}
                </div>

              </div>

              <div className={styles.contenedorBotones}>
                <button className={styles.contenedorBotones__boton}>Send</button>
              </div>
            </fieldset>
          </form>
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
