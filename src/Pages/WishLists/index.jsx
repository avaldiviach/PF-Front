import { useSelector } from "react-redux";
import WishList from "./WishList";
import style from './WishLists.module.css';

function WishLists() {
  const productWishList = useSelector(state => state.wishlistData);
  return (
    <div className={style.page}>
      <h1>My Wishlist</h1>
      <div className={style.cards}>
        {
          (productWishList.length || productWishList?.some(({ wishlisted }) => wishlisted === true))
            ? productWishList?.filter(data => data.wishlisted).map(data => <WishList key={data.id} data={data} />)
            : (<h2>Add products to your wishlist</h2>)
        }
      </div>
    </div>
  )
}

export default WishLists;