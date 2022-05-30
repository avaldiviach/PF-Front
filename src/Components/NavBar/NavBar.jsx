import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

// Componentes y funciones
import SearchBar from "../SearchBar";
import Cart from '../ShoppingCart/Cart'
import { getSneakers, logOutAndReset } from "../../Redux/Actions";

import styles from "./NavBar.module.css";
import logo from '../../Assets/Images/logo.svg';

const NavBar = () => {
  const dispatch = useDispatch();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const user = useSelector(state => state.getUser);
  const lsUser = JSON.parse(localStorage.getItem('user'));
  console.log(lsUser, "usr de local")
  //Para obtener solo el nombre del mail
  const name = lsUser?.email.split("@")[0];

  const handleLogout = async () => {
    await logout();
    dispatch(logOutAndReset());
    // Se borrra local storage y estado global cuando se hace el logout
    dispatch({ type: 'SET_CART', payload: { productData: [] } });
    localStorage.removeItem('productData');
    localStorage.removeItem('user')
    navigate("/")
  }

  return (
    <header className={styles.header}>
      <NavLink
        to="/"
        className={styles.logo}
        onClick={() => dispatch(getSneakers())}
      >
        <img src={logo} alt="logo" />
        {/* <img src="https://i.imgur.com/Q9XcQ9I.png" alt="logo" /> */}
      </NavLink>

      <nav className={styles.navbar}>
        {/* el navlink se utiliza para saber si está activo o no */}
        <ul className={styles.links__ul}>
          {/* Componente para searchBar */}
          <NavLink className={styles.links__a} to='/cart'>
            Cart 🛒
          </NavLink>

          {!lsUser
            ? (<>
              <NavLink className={styles.links__a} to='/registerfb'>
                Sign Up👆
              </NavLink>
              <NavLink
                className={styles.links__a}
                to='/loginfb'
              >
                Sign In✔
              </NavLink>
            </>)
            : (<> <span className={styles.welcome}>
              <span className={styles.emailName}>
                {name}
              </span>
            </span>
              <button onClick={handleLogout} className={styles.welcome}>Logout</button>
            </>)
          }
          <SearchBar />
        </ul>
      </nav>

    </header>
  );
};

export default NavBar;
