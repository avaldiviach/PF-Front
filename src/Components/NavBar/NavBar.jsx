import React from 'react'
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import styles from './NavBar.module.css'

// Componentes y funciones
import SearchBar from '../SearchBar'
import { getSneakers } from '../../Redux/Actions';

const NavBar = () => {
  const dispatch = useDispatch();

  return (
    <header className={styles.header}>
      <NavLink to="/" className={styles.logo} onClick={() => dispatch(getSneakers())}>
        Henry's
        {/* <img src="https://i.imgur.com/Q9XcQ9I.png" alt="logo" /> */}
      </NavLink>
      <nav className={styles.navbar}>

        {/* el navlink se utiliza para saber si esta activo o no */}
        <ul className={styles.links__ul}>
          {/* Componente para searchBar */}

          <NavLink
            className={styles.links__a}
            // className={({ isActive }) => {
            //     return isActive ? 'is-active' : '';
            // }}
            to='/create-user'
          >
            Sign Up
          </NavLink>

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

          <SearchBar />
        </ul>
      </nav>
    </header>
  )
}

export default NavBar;