import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/authContext";
import { useDispatch } from 'react-redux';
import styles from './RegisterFB.module.css';
import image from '../../Assets/Images/3.svg';
import { createUser } from '../../Redux/Actions';


export default function CreateUser() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm({ mode: "onChange", });
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const userGog = await signup(data.email, data.password);
      dispatch(createUser({id:userGog.user.uid, name:data.fullName, email:userGog.user.email}))
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <section className={styles.main_createUser}>

      <div className={styles.container}>

        <div className={styles.form_container}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.formulario}>
            <fieldset className={styles.formulario__fieldset}>
              <legend className={styles.formulario__legend}><h1>Create Account</h1></legend>
              <div className={styles.formulario__contenedorCampos}>
                <div className={styles.formulario__contenedorCampos__campo}>
                  <input type="text" className={styles.formulario__campo__inputTexto} placeholder="Full Name"
                    {...register("fullName", {
                      required: true, maxLength: 100, pattern: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]{5,150}$/
                    })
                    }
                  />
                  {errors.fullName?.type === "required" && <p className={styles.leyenda}>Full Name is required</p>}
                  {errors.fullName?.type === "maxLength" && <p className={styles.leyenda}>Full Name must be less than 100 characters</p>}
                  {errors.fullName?.type === "pattern" && <p className={styles.leyenda}>Full Name must be alphabetic and must contain at least 5 characters</p>}
                </div>

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
                </div>

                <div className={styles.formulario__contenedorCampos__campo}>
                  <input type="password" className={styles.formulario__campo__inputTexto} placeholder="Confirm Password"
                    {...register("confirmPassword", {
                      required: true, maxLength: 20,
                      validate: (val) => {
                        if (watch('password') != val) {
                          return "Your passwords do not match";
                        }
                      },
                      // Contraseña debe de tener al menos un numero, una letra en minuscula, una mayuscula y un caracter especial.
                      // No pueden aparecer espacios en blanco. de 8 a 20 caracteres.
                      // pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*@#$%^&+=])(?=\S+$).{8,20}$/
                    })
                    }
                  />
                  <p className={styles.leyenda}>{errors.confirmPassword?.message}</p>
                  {errors.confirmPassword?.type === "required" && <p className={styles.leyenda}>Confirm Password is required</p>}
                  {errors.confirmPassword?.type === "pattern" && <p className={styles.leyenda}>Password must have at least one number, one lowercase and one uppercase letter, one special character and no spaces</p>}
                  {errors.confirmPassword?.type === "maxLength" && <p className={styles.leyenda}>Password must be between 8 and 20 characters</p>}
                </div>
              </div>

              <span className={styles.leyenda}>{error}</span>
              <div className={styles.contenedorBotones}>
                <button type="submit" className={styles.contenedorBotones__boton}>SIGN UP</button>
              </div>
              <div className={styles.account}>
                <label className={styles.label_account}>Already have an account?
                  <Link to="/loginfb" className={styles.label_account_href}>
                    <span>
                      Log in
                    </span>
                  </Link>
                </label>
              </div>
            </fieldset>
          </form>
        </div>

        <div className={styles.rightBox}>
          <div className={styles.position_relative}>
            <div className={styles.image_container}>
              <img src={image} alt="logo" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}