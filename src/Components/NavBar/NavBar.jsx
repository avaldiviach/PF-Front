import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LogInButton } from "../../Components/LogIn";
import { LogOutButton } from "../../Components/LogOut";
import { Profile } from "../../Components/Profile";
import styles from "./NavBar.module.css";
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
        Henry's
        {/* <img src="https://i.imgur.com/Q9XcQ9I.png" alt="logo" /> */}
      </NavLink>
      <nav className={styles.navbar}>
<<<<<<< HEAD
        {/* el navlink se utiliza para saber si está activo o no */}
=======

        {/* el navlink se utiliza para saber si esta activo o no */}
>>>>>>> 4be80b6f68a7fd7fbff545a0bd3c15608440355a
        <ul className={styles.links__ul}>
          {/* Componente para searchBar */}

          {/* <NavLink
            className={styles.links__a}
            // className={({ isActive }) => {
            //     return isActive ? 'is-active' : '';
            // }}
            to='/create-user'
          >
            Sign Up
          </NavLink> */}

<<<<<<< HEAD
          {/* <NavLink className={styles.links__a} to='/user'>
            Crear Usuario
          </NavLink> */}
          {isAuthenticated ? (
            <>
              <Profile />
              <LogOutButton />
            </>
          ) : (
            <LogInButton />
          )}
=======
          <NavLink
            className={styles.links__a}
            // className={({ isActive }) => {
            //     return isActive ? 'is-active' : '';
            // }}
            to='#'
          >
            Sign In
          </NavLink>

          <NavLink
            className={styles.links__a}
            // className={({ isActive }) => {
            //     return isActive ? 'is-active' : '';
            // }}
            to='/cart'
          >
            Cart
          </NavLink>

>>>>>>> 4be80b6f68a7fd7fbff545a0bd3c15608440355a
          <SearchBar />
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
