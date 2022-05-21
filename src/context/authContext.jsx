import { createContext, useContext, useEffect, useState } from "react";
import {createUserWithEmailAndPassword, GoogleAuthProvider,sendPasswordResetEmail, signInWithPopup,signInWithEmailAndPassword, onAuthStateChanged, signOut} from "firebase/auth"
import auth from "../firebase-config";

export const authContext = createContext();
export const useAuth = ()=>{
    const context = useContext(authContext);
    return context;
}
export function AuthProvider({children}){
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const signup = (email, password)=>
        createUserWithEmailAndPassword(auth, email,password); 
    const signin = async(email, password)=>{
        const userCredential = await signInWithEmailAndPassword(auth, email,password);
        //userCredencial nos da datos del usuario que se ha logueado, correo, imagen, UID etc.
        console.log(userCredential);
    }
    const logout = () => signOut(auth);

    const loginWithGoogle =()=>{
        const googleProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleProvider);
    }

    const resetPassword = (email) =>
        sendPasswordResetEmail(auth, email);
    

    useEffect(()=>{
        onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser);
            setLoading(false);
        })
    },[])
    return(
        <authContext.Provider value={{signup,signin, user, logout, loading, loginWithGoogle, resetPassword}}> {children}</authContext.Provider>
    );
}