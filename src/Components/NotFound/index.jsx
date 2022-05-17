import React from "react";
import style from "./NotFound.module.css";
// import { Link } from 'react-router-dom';

const Notfound = () => {
  return (
    <div>
      <h1 className={style.error}>404 Error</h1>
      <h1 className={style.Notfound}>Page Not Found</h1>
    </div>
  );
};

export default Notfound;
