import { createContext, useContext, useEffect, useState } from "react";
import {createUserWithEmailAndPassword,getIdToken, GoogleAuthProvider,sendPasswordResetEmail, signInWithPopup,signInWithEmailAndPassword, onAuthStateChanged, signOut} from "firebase/auth"
import auth from "../firebase-config";
import { useDispatch } from "react-redux";
import { getRole, getToken, getUser } from "../Redux/Actions";

export const authContext = createContext();
export const useAuth = ()=>{
    const context = useContext(authContext);
    return context;
}
export function AuthProvider({children}){
    const [user, setUser] = useState(null);
    // const [loading, setLoading] = useState(true);
    // const [token, setToken] = useState(null);
    const dispatch = useDispatch();
    const signup = (email, password)=>
        createUserWithEmailAndPassword(auth, email,password); 
    const signin = async(email, password)=>{
        const userCredential = await signInWithEmailAndPassword(auth, email,password);
        //userCredencial nos da datos del usuario que se ha logueado, correo, imagen, UID etc.
    }
    const logout = () => signOut(auth);

    const loginWithGoogle =()=>{
        const googleProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleProvider);
    }

    const resetPassword = (email) =>
        sendPasswordResetEmail(auth, email);
    

    onAuthStateChanged(auth, async (currentUser)=>{
        if(currentUser){
            dispatch(getUser(currentUser));             
            dispatch(getToken(await currentUser.getIdToken())); 
            dispatch(getRole(currentUser.uid));
            localStorage.setItem("user",JSON.stringify({name: currentUser.displayName, email: currentUser.email}));                    
        }      
        console.log(currentUser,"authcontext")    
        // setLoading(false);
    })
  
    return(
        <authContext.Provider value={{signup,signin, logout, loginWithGoogle, resetPassword}}> {children}</authContext.Provider>
    );
}