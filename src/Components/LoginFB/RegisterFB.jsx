import { useState } from "react";
import {useNavigate} from "react-router-dom"
import {useAuth} from "../../context/authContext";
import style from '../LoginFB/RegisterFB.module.css';

const RegisterFB = () =>{


    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const {signup} = useAuth();
    const navigate = useNavigate();

    const handleChangeName = (e)=>{
        setName(e.target.value);
    }
    const handleChangeEmail = (e)=>{
        setEmail(e.target.value);
    }
    const handleChangePass = (e)=>{
        setPass(e.target.value);
    }
    const handleSubmit =async(e)=>{
        e.preventDefault();
        try {
           await signup(email, pass);
            navigate("/")
        } catch (error) {
            setError(error.message);
            //error.code; para validar los tipos de errores...
            //https://firebase.google.com/docs/auth/admin/errors
        }        
    }
    return(
        <div className={style.container}>
        <div className={style.form}>
        <form>     
            <input type="text" placeholder="Nombre" onChange={(e)=>handleChangeName(e)} />    
            <input type="text" placeholder="Email"  onChange={(e)=>handleChangeEmail(e)}/>        
            <span>{error}</span>
            <input type="password" placeholder="Password" onChange={(e)=>handleChangePass(e)}/>
            <button onClick={(e)=>handleSubmit(e)}>Registrar</button>
        </form>
        </div> 
        </div>  
        )
    }
    
    export default RegisterFB;