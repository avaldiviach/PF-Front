import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

// Componentes y funciones
import SearchBar from "../SearchBar";
import { getSneakers, getUserOrders, logOutAndReset } from "../../Redux/Actions";

import styles from "./NavBar.module.css";
// import { GrUserAdmin } from "react-icons/gr";
import { GrCart } from "react-icons/gr";
import logo from '../../Assets/Images/logo.svg';
import defaultUser from '../../Assets/Images/defaultUser2.png';

/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'

export default function Example() {
  const dispatch = useDispatch();
  const { logout, loading } = useAuth();
  const navigate = useNavigate();
  const [image, setImage] = React.useState(defaultUser);
  const user = useSelector(state => state.getUser);
  const lsUser = JSON.parse(localStorage.getItem('user'));
  //Para obtener solo el nombre del mail
  const name = lsUser?.email.split("@")[0];
  // const name = lsUser?.name.split(" ")[0];
  useEffect(() => {
    if (user) {
      dispatch(getUserOrders(user.email))
      if (!user.photoURL) {
        const firstLetter = user.email.charAt(0).toUpperCase();
        setImage(firstLetter);
      } else {
        setImage(user.photoURL);
      }
    } else {
      setImage(defaultUser);
    }
  }, [user])

  //Enlaces de la pagina
  const navigation = [
    { name: 'Cart', href: '/cart', current: false },
    // { name: 'Admin', href: '#', current: false },
  ]

  function classNames(...classes) {
    // console.log(classes[classes.length - 1])
    // if (Array.isArray(classes[classes.length - 1])) {
    //   setActive([{ name: 'Cart', href: '/cart', current: true }]) 
    // }
    return classes.filter(Boolean).join(' ')
  }

  // const [active, setActive] = React.useState(navigation)

  const handleLogout = async () => {
    await logout();
    // Se borrra local storage y estado global cuando se hace el logout
    await dispatch(logOutAndReset())
    await dispatch({ type: 'SET_CART', payload: { productData: [] } });
    localStorage.removeItem('productData')
    navigate("/")
  }

  const goOrders = async () => {
    console.log(user.email)
  }

  return (

    <Disclosure as="nav" className="bg-white-800">
      {({ open }) => (
        <>
          <div className="max-w-screen-2xl mx-auto px-2 sm:px-6 lg:px-8">
            {/* <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8"> */}
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              <div className="flex-1 flex items-center justify-center sm:items-stretch md:justify-between">
                {/* LOGOOOOOO */}
                <div className="flex-shrink-0 flex items-center">
                  {/* logo en movil */}
                  <NavLink
                    to="/"
                    onClick={() => dispatch(getSneakers())}
                  >
                    <img src={logo} className="block md:hidden h-10 w-auto" alt="logo" />
                    {/* <img src={logo} className="block sm:hidden h-10 w-auto" alt="logo" /> */}
                  </NavLink>
                  {/* logo en grande */}
                  <NavLink
                    to="/"
                    onClick={() => dispatch(getSneakers())}
                  >
                    <img src={logo} className="hidden md:block h-14 w-auto" alt="logo" />
                  </NavLink>
                </div>

                {/* BOTON DEL CARRITO */}
                {/* <div className="hidden md:block md:ml-6 items-center"> */}
                <Link
                  to="/cart"
                >
                  <Menu as="div" className={`ml-10 relative ${styles.admin} ${styles.cart}`}>
                    {/* <GrCart/> */}
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="3.5 0 24 24" height="2em" width="1.60em" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" strokeWidth="2" d="M5,5 L22,5 L20,14 L7,14 L4,2 L0,2 M7,14 L8,18 L21,18 M19,23 C18.4475,23 18,22.5525 18,22 C18,21.4475 18.4475,21 19,21 C19.5525,21 20,21.4475 20,22 C20,22.5525 19.5525,23 19,23 Z M9,23 C8.4475,23 8,22.5525 8,22 C8,21.4475 8.4475,21 9,21 C9.5525,21 10,21.4475 10,22 C10,22.5525 9.5525,23 9,23 Z"></path></svg>
                  </Menu>
                </Link>
                {/* </div> */}
              </div>

              {/* DERECHA ----> BOTON de USUARIO */}
              <div className={`absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:pr-0 ${styles.containerSearchProfile}`}>
                <div className={`hidden md:block sm:ml-6`}>
                  <SearchBar />
                </div>

                {/* BOTON DE ADMIN */}


                <Link
                  to="/admin"
                >
                  <Menu as="div" className={`ml-10 relative ${styles.admin} `}>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="2em" width="1.60em" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" strokeWidth="2" d="M8,11 C10.7614237,11 13,8.76142375 13,6 C13,3.23857625 10.7614237,1 8,1 C5.23857625,1 3,3.23857625 3,6 C3,8.76142375 5.23857625,11 8,11 Z M13.0233822,13.0234994 C11.7718684,11.7594056 10.0125018,11 8,11 C4,11 1,14 1,18 L1,23 L8,23 M10,19.5 C10,20.88 11.12,22 12.5,22 C13.881,22 15,20.88 15,19.5 C15,18.119 13.881,17 12.5,17 C11.12,17 10,18.119 10,19.5 L10,19.5 Z M23,15 L20,12 L14,18 M17.5,14.5 L20.5,17.5 L17.5,14.5 Z"></path></svg>
                  </Menu>
                </Link>

                {/* Profile dropdown */}
                <Menu as="div" className="ml-1 relative">
                  <div>
                    <Menu.Button className="bg-white-800 flex ml-3 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open user menu</span>
                      {
                        !user
                          ? (<img
                            className="h-10 w-10 rounded-full"
                            src={defaultUser}
                            alt="profile image"
                          />)
                          : user?.photoURL
                            ? (<img
                              className="h-10 w-10 rounded-full"
                              src={image || defaultUser}
                              alt="profile image"
                            />)
                            : <p className={`h-10 w-10 rounded-full ${styles.letterName}`}>
                              <p>{image}</p>
                            </p>
                      }
                    </Menu.Button>
                  </div>
                  {/* MENU DESPLEGABLE DE USER */}
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >

                    <Menu.Items className={`origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none ${styles.zindex}`}>
                      <Menu.Item>
                        {user
                          ? (<span className={styles.emailName}>
                            {name}
                          </span>)
                          : <></>
                        }
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          (!user
                            ? (<Link
                              to='/loginfb'
                              // href="/loginfb"
                              className={classNames(active ? 'bg-gray-200' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Sign In✔
                            </Link>)
                            : (
                              <div
                                className={classNames(active ? `bg-gray-200 ${styles.signOut}` : '', `block px-4 py-2 text-sm text-gray-700 ${styles.signOut}`)}
                                onClick={handleLogout}
                              >
                                Sign Out
                              </div>)
                          )
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          (<Link
                            // href="/registerfb"
                            to='/registerfb'
                            className={classNames(active ? 'bg-gray-200' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Sign Up👆
                          </Link>)
                        )}
                      </Menu.Item>
                      <Menu.Item>
                      {({ active }) => (
                          ( <Link
                            // href="/registerfb"
                            to='/orders'
                            className={classNames(active ? 'bg-gray-200' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            onClick={goOrders}
                          >
                            My Orders
                          </Link>)
                        )}
                      </Menu.Item>
                    </Menu.Items>

                  </Transition>
                </Menu>

              </div>
            </div>
          </div>

          {/* OPCIONES DE MENU EN MOVIL */}
          <Disclosure.Panel className="md:hidden">
            <div className={`flex items-center justify-end pr-6 ${styles.searchBar}`}>
              <SearchBar />

            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}











