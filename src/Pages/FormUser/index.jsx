import React from 'react';
import { useForm } from 'react-hook-form';

export default function App() {
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onChange", });
  const onSubmit = data => console.log(data);

  return (
    <div>
      <h1>Create Account</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input type="text"
            placeholder="Full Name"
            {...register("FullName", {
              required: true,
              maxLength: 100,
              pattern: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]{5,150}$/
            })
            }
          />
          {errors.FullName?.type === "required" && <p>Full Name is required</p>}
          {errors.FullName?.type === "maxLength" && <p>Full Name must be less than 100 characters</p>}
          {errors.FullName?.type === "pattern" && <p>Full Name must be alphabetic and must contain at least 5 characters</p>}
        </div>

        <input
          type="text"
          placeholder="Email"
          {...register("Email", {
            required: true,
            maxLength: 100,
            pattern: /^\S+@\S+$/i
          })
          }
        />
        {errors.Email?.type === "required" && <p>Email is required</p>}
        {errors.Email?.type === "pattern" && <p>Email is invalid</p>}
        {errors.Email?.type === "maxLength" && <p>Email is too long</p>}

        <input type="password"
          placeholder="Password"
          {...register("Password", {
            required: true,
            maxLength: 20,
            // Contraseña debe de tener al menos un numero, una letra en minuscula, una mayuscula y un caracter especial.
            // No pueden aparecer espacios en blanco. de 8 a 20 caracteres.
            pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*@#$%^&+=])(?=\S+$).{8,20}$/
          })
          }
        />
        {errors.Password?.type === "required" && <p>Password is required</p>}
        {errors.Password?.type === "pattern" && <p>Password must have at least one number, one lowercase and one uppercase letter, one special character and no spaces</p>}
        {errors.Password?.type === "maxLength" && <p>Password must be between 8 and 20 characters</p>}

        <div>
          <input
            type="checkbox"
            placeholder="termsAndConditions"
            {...register("termsAndConditions", {
              required: true
            })
            }
          />
          <label>I agree with Terms and Privacy</label>
          {errors.termsAndConditions?.type === "required" && <p>You must accept the terms and privacy</p>}
        </div>

        <button type="submit">Submit</button>
      </form>
      <button onClick={() => console.log(errors)}>
        Sign Un with Google
      </button>
    </div>
  );
}