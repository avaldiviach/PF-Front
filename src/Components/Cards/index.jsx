import Card from "../Card";
import CardAdmin from "../CardAdmin";

import style from "./Cards.module.css";

function Cards({
  renderSneakers,
  admin,
  setState,
  showModalDelete,
  setModalDeleteProd,
}) {
  return (
    <div className={style.cards}>
      {renderSneakers.length > 0 ? (
        admin === true ? (
          renderSneakers?.map((sneaker, i) => (
            <CardAdmin
              key={i}
              sneaker={sneaker}
              setState={setState}
              showModalDelete={showModalDelete}
              setModalDeleteProd={setModalDeleteProd}
            />
          ))
        ) : (
          renderSneakers?.map(
            (sneaker, i) =>
              sneaker.deleted || <Card key={i} sneaker={sneaker} />
          )
        )
      ) : (
        <h1>No cards</h1>
      )}
    </div>
  );
}

export default Cards;
