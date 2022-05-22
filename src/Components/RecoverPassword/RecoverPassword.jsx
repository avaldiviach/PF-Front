import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import styles from './RecoverPassword.module.css';

const RecoverPassword = () => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const handleEmail = (e) => {
    setEmail(e.target.value);
  }
  const handleResetPassword = async (e) => {
    e.preventDefault();
    await resetPassword(email);
    alert('Revisa tu correo');
    navigate('/loginfb')
  }
  return (
    <section className={styles.main_createUser}>
      <div className={styles.form_container}>
        <legend className={styles.formulario__legend}><h1>Reset Password</h1></legend>
      
        <form className={styles.formulario}>
          <fieldset className={styles.formulario__fieldset}>
            <div className={styles.formulario__contenedorCampos}>
              <div className={styles.formulario__contenedorCampos__campo}>
                <input type="email" onChange={handleEmail} className={styles.formulario__campo__inputTexto} placeholder="Ingrese su correo" />
              </div>
            </div>
      
            <div className={styles.contenedorBotones}>
              <button onClick={handleResetPassword} className={styles.contenedorBotones__boton}>Send</button>
            </div>
          </fieldset>
        </form>
      </div>
    </section>

  );
}

export default RecoverPassword;