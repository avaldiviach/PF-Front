import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

//Componentes y funciones
import Cards from "../../Components/Cards";
import ImagenPrincipal from "../../Components/ImagenPrincipal";
import Filters from "../../Components/Filters";
import Pagination from "../../Components/Pagination";
import { getSneakers } from "../../Redux/Actions";
//import Carrousel from '../../Components/Carrousel';
import style from "./home.module.css";

const Home = () => {
  const filteredSneakers = useSelector((state) => state.SneakersCopy);

  // PAGINACIÓN ----------------------------------------------------------------------------------------------------
  // Se crea la paginación de x zapatillas por página
  const SNEAKERS_PER_PAGE = 6; // Constante para setear cantidad de zapatillas por página
  const [currentPage, setCurrentPage] = useState(1); // Estado para seleccionar página actual
  const [loading, setLoading] = useState(true); // Estado para esperar la carga de la página actual
  const lastSneaker = currentPage * SNEAKERS_PER_PAGE;
  const firstSneaker = lastSneaker - SNEAKERS_PER_PAGE;

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredSneakers]);

  useEffect(() => {
    setLoading(true);
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

  return (
    <div className={style.home}>
      {filteredSneakers.length === 0 && loading === false ? (
        <div>
          <h1 className={style.not4}>404</h1>
          <h2 className={style.not}>Sneakers not found </h2>
          <Link
            to="/"
            className={style.btn1}
            onClick={() => dispatch(getSneakers())}
          >
            GO BACK
          </Link>
        </div>
      ) : loading === true ? (
        <h2>Loading..</h2>
      ) : (
        <>
          <ImagenPrincipal />

          {/* Componente para filtros */}
          <Filters />

          {/* Componente para paginado */}
          <Pagination
            numberOfSneakers={filteredSneakers.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            SNEAKERS_PER_PAGE={SNEAKERS_PER_PAGE}
          />

          <Cards renderSneakers={currentPageSneakers} />
        </>
      )}
    </div>
  );
};

export default Home;
