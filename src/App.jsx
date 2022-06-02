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
import { getRole,getSneakers, addWishListData, getWishListDB } from "./Redux/Actions";
import Orders from "./Components/Orders";
import WishLists from "./Pages/WishLists";


function App() {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.productData);
  const wishlistData = useSelector((state) => state.wishlistData);
  const totalPrice = useSelector((state) => state.totalPrice);

  const token = useSelector(state => state.getToken);
  const user = useSelector(state => state.getUser);
  const role = useSelector(state => state.getRole);
  const url = 'https://node-api-sneakers.herokuapp.com'

  console.log(role, "rol rutas")
   console.log(token)
  const verifyRole = (role) =>{
    return role === "admin" ? true: false;
  }

  // useEffect para se ejecute cuando cambia carrito y mande el post al backend
  // de todos los productos del carrito
  useEffect(() => {

    dispatch(getSneakers()); 
    console.log(role)
    if (user && productData.length > 0) {
      const { email } = user;
      const data = {
        email,
        productData,
      };
      console.log(data, "data de nico")
      try {
        async function postCart(token) {
          return await axios.post(
            `${url}/addcart`,
            data,{
              headers: { authorization: `Bearer ${token}`}
            }
          );
        }
        postCart(token);
      } catch (error) {
        console.log(error);
      }
    }
  }, [user, totalPrice, token]);

  useEffect(() => {
    if(user) dispatch(getWishListDB());
    setTimeout(() => {if(wishlistData?.length === 0) dispatch(addWishListData())}, 2000)
    // eslint-disable-next-line
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
        <Route path="/reviews/:id" element={<Reviews />} />
        <Route path="/wishlist" element={<WishLists />} />
        <Route path="/listreviews" element={<Reviews2 />} />
        {/* {verifyRole(role)?<Route path="/admin" element={<Admin />} /> : <Route path="/*" element={<NotFound />} />} */}

        {true ? <Route path="/admin" element={<Admin />} /> : <Route path="/*" element={<NotFound />} />}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;