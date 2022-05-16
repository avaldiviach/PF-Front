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
  // Se crea la paginación de x zapatillas por página
  const SNEAKERS_PER_PAGE = 6; // Constante para setear cantidad de zapatillas por página
  const [currentPage, setCurrentPage] = useState(1); // Estado para seleccionar página actual
  const [loading, setLoading] = useState(true); // Estado para esperar la carga de la página actual
  const lastSneaker = currentPage * SNEAKERS_PER_PAGE;
  const firstSneaker = lastSneaker - SNEAKERS_PER_PAGE;

  useEffect(() => {
    setCurrentPage(1)
  }, [filteredSneakers]);

  useEffect(() => {
    setLoading(true)

  }, []);

  useEffect(() => {
    filteredSneakers.length !== 0 && setLoading(false)
  }, [filteredSneakers]);

  // Se corta el array de todas las zapatillas con los dos índices inicial y final de la página,
  // para obtener las zapatillas que se mostrarán en la página actual
  let currentPageSneakers = filteredSneakers.length ? filteredSneakers.slice(firstSneaker, lastSneaker) : [];
  //---------------------------------------------------------------------------------------------------------------

  return (
    <div className={style.home}>

       {filteredSneakers.length ===0 && loading===false? <h2>Sneakers not found </h2>:
      
        loading===true 
          ? <h2>Loading..</h2>
          : <>
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
            </>
      }
    </div>
  );
}

export default Home;