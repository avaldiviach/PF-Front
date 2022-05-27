import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { useAuth } from "../../context/authContext";
import styles from './RegisterFB.module.css';
import image from '../../Assets/Images/3.svg';


export default function CreateUser() {
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onChange", });
  const [error, setError] = useState('');
  const { signin, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { user } = useAuth();

    //mandamos usuario al back y traemos los productos de ese usuario en carrito
    // useEffect(() => {
    //   if (user) {
    //     const { email } = user;
  
    //     try {
    //       async function fetchData() {
    //         // return await axios.post('http://localhost:3001/getCart', sendUser);
    //         const response = await axios.post('http://localhost:3001/getCart', email);
    //         dispatch({ type: 'SET_CART', payload: response.data });
    //       }
    //       fetchData()
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }
    // }, [user]);
  
  //mandamos usuario al back y traemos los productos de ese usuario en carrito
  // const getUserCart = async () => {
  //   if (user) {
  //     const { email } = user;

  //     try {
  //       async function fetchData() {
  //         // return await axios.post('http://localhost:3001/getCart', sendUser);
  //         const response = await axios.post('http://localhost:3001/getCart', {email});
  //         dispatch({ type: 'GET_CART_BD', payload: response.data });
  //       }
  //       fetchData()
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // }

  const onSubmit = async (data) => {
    try {
      await signin(data.email, data.password);//Nos retorna datos del usuario que se logueó
      // getUserCart();
      // navigate("/");
      navigate(-1);
    } catch (error) {
      setError(error.message);  
      //error.code; para validar los tipos de errores...
      //https://firebase.google.com/docs/auth/admin/errors
    }
  }

  const handleGoogleSignin = async () => {
    await loginWithGoogle();
    // getUserCart();
    // navigate("/");
    navigate(-1);
  }

  return (
    <section className={styles.main_createUser}>

      <div className={styles.container}>

        <div className={styles.form_container}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.formulario}>
            <fieldset className={styles.formulario__fieldset}>
              <legend className={styles.formulario__legend}><h1>Enter your User</h1></legend>
              <div className={styles.formulario__contenedorCampos}>

                <div className={styles.formulario__contenedorCampos__campo}>
                  <input
                    className={styles.formulario__campo__inputTexto} type="text" placeholder="Email"
                    {...register("email", { required: true, maxLength: 100, pattern: /^\S+@\S+$/i })
                    }
                  />
                  {errors.email?.type === "required" && <p className={styles.leyenda}>Email is required</p>}
                  {errors.email?.type === "pattern" && <p className={styles.leyenda}>Email is invalid</p>}
                  {errors.email?.type === "maxLength" && <p className={styles.leyenda}>Email is too long</p>}
                </div>

                <div className={styles.formulario__contenedorCampos__campo}>
                  <input type="password" className={styles.formulario__campo__inputTexto} placeholder="Password"
                    {...register("password", {
                      required: true, maxLength: 20,
                      // Contraseña debe de tener al menos un numero, una letra en minuscula, una mayuscula y un caracter especial.
                      // No pueden aparecer espacios en blanco. de 8 a 20 caracteres.
                      // pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*@#$%^&+=])(?=\S+$).{8,20}$/
                    })
                    }
                  />
                  {errors.password?.type === "required" && <p className={styles.leyenda}>Password is required</p>}
                  {errors.password?.type === "pattern" && <p className={styles.leyenda}>Password must have at least one number, one lowercase and one uppercase letter, one special character and no spaces</p>}
                  {errors.password?.type === "maxLength" && <p className={styles.leyenda}>Password must be between 8 and 20 characters</p>}
                  <span className={styles.leyenda}>{error}</span>
                </div>

              </div>

              <div className={styles.contenedorBotones}>
                <button type="submit" className={styles.contenedorBotones__boton}>Log In</button>
                <Link to="/resetpass">Forgot password?</Link>
                <button onClick={handleGoogleSignin} className={styles.contenedorBotones__boton}>Log In with Google</button>
                <Link to="/registerfb">Register</Link>
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
