import { Link } from "react-router-dom";

function Notfound() {
  return (
    <div className="NotFound">
      <h2>404</h2>
      <h1>Page not found</h1>
      <Link to='/' >Regresar al home</Link>
    </div>
  );
}

export default Notfound;