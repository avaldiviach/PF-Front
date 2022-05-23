import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import styles from "./NavBar.module.css";
import Cart from '../ShoppingCart/Cart'
import logo from '../../Assets/Images/logo.svg';
import { useAuth0 } from "@auth0/auth0-react";


// Componentes y funciones
import SearchBar from "../SearchBar";
import { getSneakers } from "../../Redux/Actions";

const NavBar = () => {
  const dispatch = useDispatch();
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const name = user?.email.split("@")[0];

  const handleLogout = async () => {
    await logout();
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

          {!user
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
