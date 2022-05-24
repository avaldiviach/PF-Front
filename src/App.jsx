import "./App.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "./context/authContext";
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
import { getSneakers } from "./Redux/Actions";
// import AddProduct from "./Pages/Admin/Products/AddProduct";

function App() {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.productData);
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    dispatch(getSneakers());
    // eslint-disable-next-line
  }, []);

  // useEffect para se ejecute cuando cambia carrito y mande el post al backend
  useEffect(() => {
    if (user && productData.length > 0) {
      const { email } = user;
      const data = {
        email,
        productData
      };
      async function fetchear() {
        return await axios.post("http://localhost:3001/addsneakerscart", data);
      }
      fetchear()
    }
  }, [user, productData]);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        {/* <Route path="/create-user" element={<FormUser />} /> */}
        <Route path="/cart" element={<Cart />} />
        {/* <Route path="/addProd" element={<AddProduct />} /> */}
        <Route path="/registerfb" element={<RegisterFB />} />
        <Route path="/loginfb" element={<LoginFB />} />
        <Route path='/resetpass' element={<RecoverPassword />} />
        <Route path="/cart/*" element={<Cart />}>
          <Route path="payment" element={<Payment />} />
        </Route>
        <Route path="/admin" element={<Admin />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
