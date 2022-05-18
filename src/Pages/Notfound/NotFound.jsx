import style from "./notFound.module.css";
import { Link, useLocation } from "react-router-dom";

const notFound = () => {
  let location = useLocation();
  return (
    <div className={style.container}>
      <div className="row">
        <div className="col-md-12">
          <div className={style.error_template}>
            <h1 className={style.text}>Oops!</h1>
            <h2 className={style.text}>404 Not Found</h2>
            <div className={style.error_details}>
              Sorry, an error has occured, the page <p style={{color: "#FB5014", display: 'inline'}}>{location.pathname}</p> not found!
            </div>
            <div className={style.error_actions}>
              <Link className={style.btn} to="/">
                <button className={style.btn}>
                  Take Me Home
                </button>
              </Link>
              {/* <Link to="/" className="btn btn-primary btn-lg">
                <span className="glyphicon glyphicon-home"></span>
                Take Me Home{" "}
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default notFound;
