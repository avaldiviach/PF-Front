import React from "react";
import { Link } from 'react-router-dom';

function Notfound() {
  return (
    <div className="NotFound">
      <h2>404</h2>
      <h1>Page Not Found</h1>
      <Link to='/' >Go to Home</Link>
    </div>
  );
}

export default Notfound;