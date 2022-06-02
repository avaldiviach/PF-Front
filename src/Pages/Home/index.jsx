import React, { useState, useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
//Componentes y funciones
import Cards from "../../Components/Cards";
import Carousel from "../../Components/Carousel";
import Filters from "../../Components/Filters";
import Pagination from "../../Components/Pagination";
import ModalSearch from "../../Components/Modal/";

//import Carrousel from '../../Components/Carrousel';
import style from "./home.module.css";
import {toast, Toaster } from "react-hot-toast";
import CountdownTimer from "../../Components/Counter/CountdownTimer";
import { getDiscounts } from "../../Redux/Actions";
toast('¡Tu email no está verificado!',
        {
            icon: '✉️',
            style: {
            borderRadius: '10px',
            background: '#FB5014',
            color: '#fff',
            },
    });  

const Home = () => {  
  const dispatch = useDispatch()
  const filteredSneakers = useSelector((state) => state.SneakersCopy);
  const searchResponse = useSelector((state) => state.searchSneakers);
  const user = useSelector(state => state.getUser);  
  const [any, forceUpdate] = useReducer(num => num + 1, 0);
  // PAGINACIÓN ----------------------------------------------------------------------------------------------------
  // Se crea la paginación de x zapatillas por página
  const SNEAKERS_PER_PAGE = 8; // Constante para setear cantidad de zapatillas por página
  const [currentPage, setCurrentPage] = useState(1); // Estado para seleccionar página actual
  const [loading, setLoading] = useState(true); // Estado para esperar la carga de la página actual
  const lastSneaker = currentPage * SNEAKERS_PER_PAGE;
  const firstSneaker = lastSneaker - SNEAKERS_PER_PAGE;
  
  // const {token} = useAuth();
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredSneakers]);

  useEffect(() => {
    setLoading(true);
    dispatch(getDiscounts())
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    filteredSneakers.length !== 0 && setLoading(false);
  }, [filteredSneakers]);


  // Se corta el array de todas las zapatillas con los dos índices inicial y final de la página,
  // para obtener las zapatillas que se mostrarán en la página actual
  let currentPageSneakers = filteredSneakers.length
    ? filteredSneakers.slice(firstSneaker, lastSneaker)
    : [];
  //---------------------------------------------------------------------------------------------------------------
// const [verify, setVerify] = useState(false);
//   useEffect(()=>{  
//   const timeout = setTimeout(() => {
//    if(!user?.emailVerified){
//       setVerify(true);
//    } 
//    return ()=>clearTimeout(timeout);
//   }, 3000);
// },[user])

  return (       
    <div className={style.home}>
       
       {true && <Toaster position={"bottom-right"}
       toastOptions={{
         duration: 10000
       }}/>}    
      {loading === true
        ? (<img src="https://c.tenor.com/_tt3TLfzyYoAAAAC/s4gu-loding.gif" alt="img loading"/>)
        : (<>
          <Carousel />
          {/* Componente para filtros */}
          <Filters />

          {/* Componente para paginado */}
          {
            filteredSneakers.length > 1 && <Pagination
              numberOfSneakers={filteredSneakers.length}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              SNEAKERS_PER_PAGE={SNEAKERS_PER_PAGE}
            />

          }
          {filteredSneakers.length < 1 && <ModalSearch active={true} msg={searchResponse} />}
          <Cards renderSneakers={currentPageSneakers} admin={false} />
        </>
        )}       
    </div>    
  );
};

export default Home;
