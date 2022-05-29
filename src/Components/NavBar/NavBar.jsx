import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

// Componentes y funciones
import SearchBar from "../SearchBar";
import Cart from '../ShoppingCart/Cart'
import { getSneakers } from "../../Redux/Actions";

import styles from "./NavBar.module.css";
import logo from '../../Assets/Images/logo.svg';





/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'

const navigation = [
  { name: 'Cart', href: '#', current: true },
  { name: 'Admin', href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
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
                <div className="hidden md:block md:ml-6  items-center">
                  <div className="flex space-x-4 mt-2">
                    {navigation?.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-gray-900 text-lg text-white'
                            : 'text-gray-900 text-lg hover:bg-gray-700 hover:text-white', 'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}

                  </div>
                </div>
              </div>
{/* 640*560 */}

              {/* DERECHA ----> BOTON NOTIFICACIONES Y LOGIN */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
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

                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="bg-gray-800 flex ml-3 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-10 w-10 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-200' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-200' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-200' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Sign out
                          </a>
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
            <div className="px-2 pt-2 pb-3 space-y-1">
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
              {/* <div className={`hidden sm:block sm:ml-6`}> */}
                <SearchBar />
              {/* </div> */}
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
