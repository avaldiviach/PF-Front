import { Link, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetailSneaker } from "../../Redux/Actions";

export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const sneaker = useSelector(state => state.detail);

  useEffect(() => {
    dispatch(getDetailSneaker(id))
  }, [dispatch, id])

  return (
    <div >
      {
        !sneaker.price
          ? (<img src="https://c.tenor.com/_tt3TLfzyYoAAAAC/s4gu-loding.gif" alt={'img'} />)
          : (
            <div>
              <img src={sneaker.grid_picture_url} alt={'img'} />
              <div>
                <h3 >{sneaker.brand_name}</h3>
                <h6>Price: {sneaker.price}</h6>
                <h6>Details: {sneaker.details}</h6>
                <h6>Sizes: {sneaker.sizes?.map(({ size }, i) => <p key={i}>{size} </p>)}</h6>
                <h6>Model: {sneaker.name}</h6>
                <div>
                  <Link to="/">
                    GO BACK
                  </Link>
                  <button>
                    Add to Cart
                  </button>
                </div>

              </div>
            </div>
          )
      }
    </div>
  );
}
