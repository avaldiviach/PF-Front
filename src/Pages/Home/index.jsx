import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

//Componentes y funciones
import Cards from '../../Components/Cards'
import ImagenPrincipal from '../../Components/ImagenPrincipal';
import Filters from '../../Components/Filters';
import Pagination from '../../Components/Pagination';
//import Carrousel from '../../Components/Carrousel';
import style from './home.module.css'

const Home = () => {
  const filteredSneakers = useSelector(state => state.Sneakers);

  // PAGINACIÓN ----------------------------------------------------------------------------------------------------
  // Se crea la paginación de x zapatillas por pagina
  const SNEAKERS_PER_PAGE = 6; // Constante para setear cantidad de zapatillas por página
  const [currentPage, setCurrentPage] = useState(1); // Estado para seleccionar pagina actual
  const lastSneaker = currentPage * SNEAKERS_PER_PAGE;
  const firstSneaker = lastSneaker - SNEAKERS_PER_PAGE;

  useEffect(() => {
    setCurrentPage(1)
  }, [filteredSneakers]);
  // Se corta el array de todas las zapatillas con los dos indices inicial y final de la página, para obtener las zapatillas 
  // que se mostraran en la página actual
  let currentPageSneakers = filteredSneakers.length ? filteredSneakers.slice(firstSneaker, lastSneaker) : [];
  //---------------------------------------------------------------------------------------------------------------

  return (
    <div className={style.home}>
      <ImagenPrincipal />

      {/* Componente para filtros */}
      <Filters />

      {/* Componente para paginado */}
      <Pagination numberOfSneakers={filteredSneakers.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        SNEAKERS_PER_PAGE={SNEAKERS_PER_PAGE}
      />

      <Cards renderSneakers={currentPageSneakers} />
    </div>
  );
}

export default Home;