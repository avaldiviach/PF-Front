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
import logo from '../../Assets/Images/logo.svg';
import defaultUser from '../../Assets/Images/defaultUser2.png';

/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'


export default function Example() {
  const dispatch = useDispatch();
  const {logout, loading } = useAuth();
  const navigate = useNavigate();
  const [image, setImage] = React.useState(defaultUser);
  const user = useSelector(state => state.getUser);
  const lsUser = JSON.parse(localStorage.getItem('user'));
  console.log(lsUser, "usr de local")
  //Para obtener solo el nombre del mail
  const name = lsUser?.email.split("@")[0];
  useEffect(() => {
    // if (!user) {
    //   setImage(defaultUser);
    // }
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

  console.log(user);

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

                {/* OPCIONES DE MENU */}
                <div className="hidden md:block md:ml-6 items-center">
                  <div className={`flex space-x-4 mt-2 ${styles.containerEnlaces}`}>
                    {navigation?.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        // href={item.href}
                        className={classNames(
                          item.current
                            ? `bg-gray-900 text-lg text-white ${styles.enlaces}`
                            : `text-gray-900 text-lg hover:bg-gray-700 hover:text-white ${styles.enlaces}`, 'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* DERECHA ----> BOTON NOTIFICACIONES Y LOGIN */}
              <div className={`absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:pr-0 ${styles.containerSearchProfile}`}>
                {/* BOTON DE NOTIFICACIONES */}
                {/* <button
                  type="button"
                  className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button> */}
                <div className={`hidden md:block sm:ml-6`}>
                  <SearchBar />
                </div>
                <Menu as="div" className={`ml-10 relative ${styles.admin}`}>
                  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="2em" width="1.60em" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="2" d="M8,11 C10.7614237,11 13,8.76142375 13,6 C13,3.23857625 10.7614237,1 8,1 C5.23857625,1 3,3.23857625 3,6 C3,8.76142375 5.23857625,11 8,11 Z M13.0233822,13.0234994 C11.7718684,11.7594056 10.0125018,11 8,11 C4,11 1,14 1,18 L1,23 L8,23 M10,19.5 C10,20.88 11.12,22 12.5,22 C13.881,22 15,20.88 15,19.5 C15,18.119 13.881,17 12.5,17 C11.12,17 10,18.119 10,19.5 L10,19.5 Z M23,15 L20,12 L14,18 M17.5,14.5 L20.5,17.5 L17.5,14.5 Z"></path></svg>
                </Menu>
                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="bg-white-800 flex ml-3 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open user menu</span>
                      {
                        !user
                          ? (<img
                            className="h-10 w-10 rounded-full"
                            // src={user.photoURL || defaultUser}
                            src={defaultUser}
                            alt="profile image"
                          />)
                          : user?.photoURL
                            ? (<img
                              className="h-10 w-10 rounded-full"
                              // src={user.photoURL || defaultUser}
                              src={image}
                              alt="profile image"
                            />)
                            : <p className="h-10 w-10 rounded-full">{image}</p>
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
                            <span className={styles.greeting}>Hello</span> {name}
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
            <div className="px-2 pt-2 pb-3 space-y-1 flex items-center justify-center ml-5">
              {navigation?.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-900 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              <div className={`flex items-center justify-end pr-6 ${styles.searchBar}`}>
                <SearchBar />
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
















// import React, { useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { useAuth } from "../../context/authContext";
// import { useNavigate } from "react-router-dom";

// // Componentes y funciones
// import SearchBar from "../SearchBar";
// import Cart from '../ShoppingCart/Cart'
// import { getSneakers } from "../../Redux/Actions";

// import styles from "./NavBar.module.css";
// import logo from '../../Assets/Images/logo.svg';

// const NavBar = () => {
//   const dispatch = useDispatch();
//   const { user, logout, loading } = useAuth();
//   const navigate = useNavigate();
//   //Para obtener solo el nombre del mail
//   const name = user?.email.split("@")[0];

//   const handleLogout = async () => {
//     await logout();
//     // Se borrra local storage y estado global cuando se hace el logout
//     dispatch({ type: 'SET_CART', payload: { productData: [] } });
//     localStorage.removeItem('productData')
//     navigate("/")
//   }

//   return (
//     <header className={styles.header}>
//       <NavLink
//         to="/"
//         className={styles.logo}
//         onClick={() => dispatch(getSneakers())}
//       >
//         <img src={logo} alt="logo" />
//         {/* <img src="https://i.imgur.com/Q9XcQ9I.png" alt="logo" /> */}
//       </NavLink>

//       <nav className={styles.navbar}>
//         {/* el navlink se utiliza para saber si está activo o no */}
//         <ul className={styles.links__ul}>
//           {/* Componente para searchBar */}
//           <NavLink className={styles.links__a} to='/cart'>
//             Cart 🛒
//           </NavLink>

//           {!user
//             ? (<>
//               <NavLink className={styles.links__a} to='/registerfb'>
//                 Sign Up👆
//               </NavLink>
//               <NavLink
//                 className={styles.links__a}
//                 to='/loginfb'
//               >
//                 Sign In✔
//               </NavLink>
//             </>)
//             : (<> <span className={styles.welcome}>
//               <span className={styles.emailName}>
//                 {name}
//               </span>
//             </span>
//               <button onClick={handleLogout} className={styles.welcome}>Logout</button>
//             </>)
//           }
//           <SearchBar />
//         </ul>
//       </nav>

//     </header>
//   );
// };

// export default NavBar;
