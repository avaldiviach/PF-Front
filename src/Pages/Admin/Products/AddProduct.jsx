import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import FormValidationProduct from "./FormValidationProduct";
import s from "./AddProduct.module.css";
import { createSneaker, getColors, getSneakers } from "../../../Redux/Actions";
import { useNavigate } from "react-router-dom";
import SelectColors from "./createModel/select/Colors";

const AddProduct = () => {
  const initialValues = {
    model: "",
    color: "",
    image: "",
    price: "",
  };

  const [input, setInput] = useState(initialValues);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const modelsAll = useSelector((state) => state.getModels);
  const colors = useSelector((state) => state.getColors);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getColors());
  }, [dispatch]);

  const handleInputChange = (e) => {
    console.log(e.target.value);
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(
      FormValidationProduct({ ...input, [e.target.name]: e.target.value })
    );
  };

  const handleSubmit = (e) => {
    console.log(input);
    if (input.image && input.price && input.model && input.color) {
      e.preventDefault();
      dispatch(createSneaker(input));
      alert("The sneaker was succesfully Created!");

      setInput({
        model: "",
        color: "",
        image: "",
        price: "",
      });

      dispatch(getSneakers());
      navigate("/");
    } else {
      e.preventDefault();
      alert("You must complete every field!");
    }
  };

  return (
    <form className={s.containerr}>
      <h1>Create Sneaker</h1>

      <label className={s.text}> Model:</label>
      <select name="model" value={input.model} onChange={handleInputChange}>
        {modelsAll?.map((el) => (
          <option name={el.nameModel} value={el.nameModel} key={el.id}>
            {el.nameModel}
          </option>
        ))}
      </select>

      <label className={s.text}>Color:</label>
      <select name="color" value={input.color} onChange={handleInputChange}>
        {colors.map((el) => (
          <option name={el.nameColor} value={el.nameColor} key={el.id}>
            {el.nameColor}
          </option>
        ))}
      </select>

      <label className={s.text}>Image:</label>
      <input
        className={s.input}
        name="image"
        value={input.image}
        onChange={handleInputChange}
      />

      <label className={s.text}>Price:</label>
      <input
        className={s.input}
        name="price"
        value={input.price}
        onChange={handleInputChange}
      />

      <SelectColors/>

      <button type="submit" onClick={(e) => handleSubmit(e)}>
        CREATE
      </button>
    </form>
  );
};

export default AddProduct;
