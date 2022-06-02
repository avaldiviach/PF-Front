import { createContext, useContext, useEffect, useState } from "react";
import {createUserWithEmailAndPassword,getIdToken, GoogleAuthProvider,sendPasswordResetEmail, signInWithPopup,signInWithEmailAndPassword, onAuthStateChanged, signOut, sendEmailVerification} from "firebase/auth"
import auth from "../firebase-config";
import { useDispatch } from "react-redux";
import { getRole, getToken, getUser } from "../Redux/Actions";

export const authContext = createContext();
export const useAuth = ()=>{
    const context = useContext(authContext);
    return context;
}
export function AuthProvider({children}){
    
    const dispatch = useDispatch();
    
    const signup = async(email, password)=>
        await createUserWithEmailAndPassword(auth, email,password);
       

    const signin = async(email, password)=>
        await signInWithEmailAndPassword(auth, email,password);
       
    const logout = () => signOut(auth);

    const loginWithGoogle =()=>{
        const googleProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleProvider);
    }

    const resetPassword = (email) =>
        sendPasswordResetEmail(auth, email);
    
    const verifyEmail = (currUSer) =>
        sendEmailVerification(currUSer);

    onAuthStateChanged(auth, async (currentUser)=>{
        if(currentUser){
            await dispatch(getUser(currentUser));             
            dispatch(getToken(await currentUser.getIdToken())); 
            dispatch(getRole(currentUser.uid, currentUser.accessToken));
            localStorage.setItem("user",JSON.stringify({name: currentUser.displayName, email: currentUser.email}));                    
        }      
        // setLoading(false);
    })

    return(
        <authContext.Provider value={{signup,signin, logout, loginWithGoogle, resetPassword, verifyEmail}}> {children}</authContext.Provider>
    );
}
