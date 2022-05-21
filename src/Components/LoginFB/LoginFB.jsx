import { useState } from "react";
import {useNavigate} from "react-router-dom"
import { Link } from "react-router-dom";
import {useAuth} from "../../context/authContext";
import style from '../LoginFB/LoginFB.module.css';


const LoginFB = () =>{

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState('');
    const {signin,loginWithGoogle} = useAuth();
    const navigate = useNavigate();
   
    const handleChangeEmail = (e)=>{
        setEmail(e.target.value);
    }
    const handleChangePass = (e)=>{
        setPass(e.target.value);
    }
    const handleSubmit =async(e)=>{
        e.preventDefault();
        try {
           await signin(email, pass);//Nos retorna datos del usuario que se logueó
            navigate("/");
        } catch (error) {
            setError(error.message);
            //error.code; para validar los tipos de errores...
            //https://firebase.google.com/docs/auth/admin/errors
        }        
    }
    const handleGoogleSignin= async() =>{
        await loginWithGoogle();
        navigate("/");
    }
    return(
        <div className={style.form} >
        <form >     
            <input type="text" placeholder="Email"  onChange={(e)=>handleChangeEmail(e)}/>        
            <span>{error}</span>
            <input type="password" placeholder="Password" onChange={(e)=>handleChangePass(e)}/>
            <button onClick={(e)=>handleSubmit(e)}>Login</button>
            <Link to="/resetpass">Forgot password?</Link>
        </form>   
        <button onClick={handleGoogleSignin}>Singin with Google</button>
        <Link to="/registerfb">Register</Link>
        </div>
        )
    }
    
    export default LoginFB;