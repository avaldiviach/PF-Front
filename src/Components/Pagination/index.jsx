import React from "react";


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
    <nav>
      {/* Botón anterior */}
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}>
        {/* className={currentPage === 1 ? styles.disabled : styles.previous_and_next_button} */}
        Previous
      </button>
      {/* Botones de las páginas */}

      {
        pageNumbers?.map((number) => {
          return (
            <button
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
        disabled={currentPage === numberOfPages}>
        Next
        {/* // className={currentPage === numberOfPages ? styles.disabled : styles.previous_and_next_button}> */}
      </button>
    </nav>
  );
}

export default Paginado;