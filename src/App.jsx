import "./App.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "./context/authContext";

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

  // useEffect para cuando se desmonte componente enviar post de productData de productos en carrito a la base de datos
  useEffect(() => {
    if (isAuthenticated && productData.length > 0) {
      const { email } = user;
      // const product1 = productData[0];
      const data = {
        email, ...productData
      };
      fetch("http://localhost:3001/addsneakerscart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    }
    return () => {
      
      // eslint-disable-next-line
    };
  }, [isAuthenticated, productData]);



    // if (productData.cart.length > 0) {
    //   const data = {
    //     cart: productData.cart,
    //   };
    //   fetch("http://localhost:3001/addsneakerscart", {
    //     method: "POST", 
    //     body: JSON.stringify(data),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   })
    //     .then((res) => res.json())  
    //     .then((data) => console.log(data))
    //     .catch((err) => console.log(err));
    // }
    // eslint-disable-next-line
  // }, [productData]);

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
