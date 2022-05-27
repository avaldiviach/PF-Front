import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/authContext";

import styles from './Reviews.module.css';
import image from '../../Assets/Images/3.svg';
import RatingStars from "../../Components/Reviews/RatingStarsRead";
import {useSelector, useDispatch} from "react-redux"
import { getAllreviews } from '../../Redux/Actions';
export default function Reviews() {
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onChange", });
  // const [error, setError] = useState('');
  const { signin, loginWithGoogle } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reviews = useSelector(state => state.getReviews);
 useEffect(()=>{
   dispatch(getAllreviews(1));
 },[])

  return (
    <section className={styles.main_createUser}>
      {
        reviews?.map(review =>{
          return(
          <React.Fragment key={review.id}>
          <RatingStars />
            <div >
              <h1>{review.title}</h1>
              <p>{review.review}</p>
            </div>
          </React.Fragment>            
          )
        })
      }
    </section>
  );
}
