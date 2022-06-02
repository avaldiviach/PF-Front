import { useEffect } from "react";
import { useSelector } from "react-redux";
import WishList from "./WishList";
import style from './WishLists.module.css';

function WishLists() {

  const productWishList = useSelector(state => state.wishlistData);
  const render = productWishList.filter(e => e.wishlisted);
  const render2 = render.filter(d => d.wishlisted === true)
  return (
    <>
      <div className={style.page}>
        <h1>My Wishlist</h1>
      </div>
      {
        render.length > 0
          ? (
            <div className={style.cards}>
              {
                render2?.map(data => <WishList key={data.id} data={data} />)

              }
            </div>
          )
          : (<div className={style.msg}><h3>Add products to your wishlist</h3></div>)
      }
    </>
  )
}

export default WishLists;