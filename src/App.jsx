import "./App.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

//Componentes y funciones
import NavBar from "./Components/NavBar/NavBar";
import Home from "./Pages/Home";
import Detail from "./Pages/Detail";
import Cart from "./Components/ShoppingCart/Cart";
import Payment from "./Components/ShoppingCart/Payment";
import NotFound from "./Pages/Notfound/NotFound";
import Admin from "./Pages/Admin";
import LoginFB from "./Components/LoginFB/LoginFB";
import RegisterFB from "./Components/LoginFB/RegisterFB";
import RecoverPassword from "./Components/RecoverPassword/RecoverPassword";
import Reviews from "./Components/Reviews/CreateReview";
import Reviews2 from "./Components/Reviews/ListReview";
import { getSneakers, addWishListData } from "./Redux/Actions";
import Orders from "./Components/Orders";
import WishLists from "./Pages/WishLists";


function App() {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.productData);
  const wishlistData = useSelector((state) => state.wishlistData);
  const totalPrice = useSelector((state) => state.totalPrice);

  const token = useSelector(state => state.getToken);
  const user = useSelector(state => state.getUser);

  // useEffect para se ejecute cuando cambia carrito y mande el post al backend
  // de todos los productos del carrito
  useEffect(() => {
    dispatch(getSneakers(token));
    if (user && productData.length > 0) {
      const { email } = user;
      const data = {
        email,
        productData,
      };
      try {
        async function postCart() {
          return await axios.post(
            "https://node-api-sneakers.herokuapp.com/addcart",
            data
          );
        }
        postCart();
      } catch (error) {
        console.log(error);
      }
    }
  }, [user, totalPrice, token]);

  useEffect(() => {
    setTimeout(() => {if(wishlistData.length === 0) dispatch(addWishListData())}, 2000)
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (user) {
      const { email } = user;
      const id = wishlistData.map(e => e.id);
      try {
        async function postWishList() {
          const {data: payload} = await axios.post(
            //"https://node-api-sneakers.herokuapp.com/getwishlis",
            "http://localhost:3001/addwishlist",
            { email, id }
          );
          dispatch({ type: 'GET_WISHLIST_BD', payload});
        }
        postWishList();
      } catch (error) {
        console.log(error);
      }
    }
  }, [user]);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/registerfb" element={<RegisterFB />} />
        <Route path="/loginfb" element={<LoginFB />} />
        <Route path='/resetpass' element={<RecoverPassword />} />
        <Route path='/orders' element={<Orders />} />
        <Route path="/cart/*" element={<Cart />}>
          <Route path="payment" element={<Payment user={user} />} />
        </Route>
        <Route path="/wishlist" element={<WishLists />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/listreviews" element={<Reviews2 />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;