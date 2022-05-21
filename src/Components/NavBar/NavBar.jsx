import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LogInButton } from "../../Components/LogIn";
import { LogOutButton } from "../../Components/LogOut";
import { Profile } from "../../Components/Profile";

import styles from "./NavBar.module.css";
import logo from '../../Assets/Images/logo.svg';
import { useAuth0 } from "@auth0/auth0-react";

// Componentes y funciones
import SearchBar from "../SearchBar";
import { getSneakers } from "../../Redux/Actions";

const NavBar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user, isLoading } = useAuth0();

  return (
    <header className={styles.header}>
      <NavLink
        to="/"
        className={styles.logo}
        onClick={() => dispatch(getSneakers())}
      >
        <img src={logo} alt="logo" />
      </NavLink>
      <nav className={styles.navbar}>
        {/* el navlink se utiliza para saber si está activo o no */}
        <ul className={styles.links__ul}>
          {/* Componente para searchBar */}


          <NavLink className={styles.links__a} to='/cart'>
            cart 🛒
          </NavLink>

          {isAuthenticated ? (
            <>
              <Profile />
              <LogOutButton />
            </>
          ) : (
            <LogInButton className={styles.links__a} />
          )}
          
          <NavLink
            className={styles.links__a}
            // className={({ isActive }) => {
              //     return isActive ? 'is-active' : '';
            // }}
            to='/create-user'
          >
            Sign Up✔
          </NavLink>
          
            <SearchBar />
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
