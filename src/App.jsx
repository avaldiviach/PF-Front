import "./App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

//Componentes y funciones
import NavBar from "./Components/NavBar/NavBar";
import Home from './Pages/Home';
import Detail from "./Pages/Detail";
import FormUser from './Pages/FormUser/index.jsx'
import { getSneakers } from './Redux/Actions';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSneakers());
    // eslint-disable-next-line
  }, [])

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path='/create-user' element={<FormUser />} />
      </Routes>
    </div>
  );
}

export default App;