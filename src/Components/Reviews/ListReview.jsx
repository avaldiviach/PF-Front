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

export default function ListReview({id}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const reviews = useSelector(state => state.getReviews);
  useEffect(() => {
    dispatch(getAllreviews(id));
  }, [])

  return (
    <>
      {
        reviews?.map((review) => {
          return (
            <>
              <Review key={id} review={review} />
            </>
          )
        })
      }
    </>
  );
}
