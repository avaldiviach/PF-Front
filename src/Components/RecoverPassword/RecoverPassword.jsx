import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../../context/authContext";

const RecoverPassword =()=>{
    const {resetPassword} = useAuth();
    const [email,setEmail] = useState('');
    const navigate = useNavigate();
    const handleEmail = (e)=>{
        setEmail(e.target.value);
    }
    const handleResetPassword = async(e) =>{
        e.preventDefault();
        await resetPassword(email);        
        alert('Revisa tu correo');
        navigate('/loginfb')
    }
    return(
        <form>
            <label>Email:</label>
            <input type="email" onChange={handleEmail}/>
            <button onClick={handleResetPassword}>send</button>
        </form>
        
    );
}

export default RecoverPassword;