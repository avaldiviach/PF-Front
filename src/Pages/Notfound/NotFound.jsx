import style from "./notFound.module.css";
import { Link } from "react-router-dom";

const notFound = () => {
  return (
    <div className={style.container}>
      <div className="row">
        <div className="col-md-12">
          <div className={style.error_template}>
            <h1 className={style.text}>Oops!</h1>
            <h2 className={style.text}>404 Not Found</h2>
            <div className={style.error_details}>
              Sorry, an error has occured, Requested page not found!
            </div>
            <div className={style.error_actions}>
              <Link className={style.btn} to="/">
                {" "}
                Take Me Home
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
