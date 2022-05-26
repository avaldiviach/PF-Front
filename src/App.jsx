import "./App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

//Componentes y funciones
import NavBar from "./Components/NavBar/NavBar";
import Home from "./Pages/Home";
import Detail from "./Pages/Detail";

import Cart from "./Components/ShoppingCart/Cart";
import Payment from "./Components/ShoppingCart/Payment";
import NotFound from "./Pages/Notfound/NotFound";
import { getSneakers } from "./Redux/Actions";
import Admin from "./Pages/Admin";
import AddProduct from "./Pages/Admin/Products/AddProduct";
import AddModel from "./Pages/Admin/Products/AddModel";
import LoginFB from "./Components/LoginFB/LoginFB";
import RegisterFB from "./Components/LoginFB/RegisterFB";
import RecoverPassword from "./Components/RecoverPassword/RecoverPassword";
import Reviews from "./Components/Reviews";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSneakers());
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        {/* <Route path="/create-user" element={<FormUser />} /> */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/addPro" element={<AddProduct />} />
        <Route path="/addProd" element={<AddModel />} />
        <Route path="/registerfb" element={<RegisterFB />} />
        <Route path="/loginfb" element={<LoginFB />} />
        <Route path='/resetpass' element={<RecoverPassword />} />
        <Route path="/cart/*" element={<Cart />}>
          <Route path="payment" element={<Payment />} />
        </Route>
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
