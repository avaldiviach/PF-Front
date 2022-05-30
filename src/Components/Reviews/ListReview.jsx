import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/authContext";
import { useSelector, useDispatch } from "react-redux"

// Componentes y funciones
import RatingStarsRead from "../../Components/Reviews/RatingStarsRead";
import Review from './Review';
import { getAllreviews } from '../../Redux/Actions';

import image from '../../Assets/Images/3.svg';
import styles from './Reviews.module.css';

export default function ListReview() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const reviews = useSelector(state => state.getReviews);
  useEffect(() => {
    dispatch(getAllreviews(1));
  }, [])

  return (
    <>
      {
        reviews?.map(review => {
          return (
            <>
              <Review key={review.id} review={review} />
            </>

          )
        })
      }
      <div className={styles.rightBox}>
        <div className={styles.position_relative}>
          {/* <h2 className={styles.rotate}>HENRYS</h2> */}
          <div className={styles.image_container}>
            <img src={image} alt="sneaker" />
          </div>
        </div>
      </div>
    </>
  );
}
