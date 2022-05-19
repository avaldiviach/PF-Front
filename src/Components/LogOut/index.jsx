import react from 'react';
import {useAuth0} from '@auth0/auth0-react';
import styles from '../NavBar/NavBar.module.css';

export const LogOutButton = () => {
    const {logout} = useAuth0();
    return <button className={styles.links__a} onClick={()=>logout({returnTo: window.location.origin})}>Log out💨</button>;


    };