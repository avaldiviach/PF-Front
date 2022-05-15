import React from "react";
import s from './paginado.module.css'

function Paginado({ numberOfSneakers, currentPage, setCurrentPage, SNEAKERS_PER_PAGE }) {

  const pageNumbers = [];
  // Se calcula el número de páginas que se mostrarán
  const numberOfPages = Math.ceil(numberOfSneakers / SNEAKERS_PER_PAGE);

  // Se crea un array con los números de página
  for (let i = 1; i <= numberOfPages; i++) {
    pageNumbers.push(i);
  }

  // Para setear el estado en la página que sea presionada
  const paginated = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <nav className={s.container}>
      {/* Botón anterior */}
      <button
        onClick={handlePreviousPage}
        className={currentPage === 1 ? s.disabled : s.previous_and_next_button}
        disabled={currentPage === 1}>

        Prev
      </button>
      {/* Botones de las páginas */}

      {
        pageNumbers?.map((number) => {
          return (
            <button
              className={s.pag}
              onClick={() => paginated(number)}
              key={number}
              disabled={currentPage === number}
            >
              {number}
            </button>
          );
        })
      }

      {/* Botón siguiente */}
      <button
        onClick={handleNextPage}
        className={currentPage === numberOfPages ? s.disabled : s.previous_and_next_button}
        disabled={currentPage === numberOfPages}>
        Next
      </button>
    </nav>
  );
}

export default Paginado;