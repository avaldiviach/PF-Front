import React from "react";
/* import style from './Card.module.css' */
import { Link } from "react-router-dom"

function Card({ sneaker }) {
  const { name, price, grid_picture_url, brand_name, id } = sneaker;

  return (
    <div>
      <Link to={`/detail/${id}`}>
        <h2>{name}</h2>
        <img
          src={grid_picture_url}
          alt=""
          className="imageCard"
          height="200px"
          width="350px"
        />
      </Link>
      <h3>{brand_name}</h3>
      <h3>{price}</h3>
    </div>
  );
}

export default Card;