import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import FormValidation from "./FormValidation";
import s from "./AddProduct.module.css";
import { createSneaker } from "../../../Redux/Actions";

const AddProduct = () => {
  const initialValues = {
    modelId: [],
    colorId: [],
    image: "",
    price: "",
  };

  const [input, setInput] = useState(initialValues);
  const models = useSelector((state) => state.getModels);
  console.log(models);

  useEffect(() => {
    getModels();
  });

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(FormValidation({ ...input, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    if (
      input.image &&
      input.price &&
      input.modelId.length > 0 &&
      input.colorId.length > 0
    ) {
      e.preventDefault();
      dispatch(createSneaker(input));
      alert("The sneaker was succesfully Created!");

      setInput({
        modelId: [],
        colorId: [],
        image: "",
        price: "",
      });

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
      <select>
        {models.map((el) => (
          <option name={el.nameModel} value={el.id} key={el.id}>
            {el.nameModel}
          </option>
        ))}
      </select>

      <label className={s.text}>Color:</label>
      <select>
        {models.map((el) => (
          <option name={el.nameModel} value={el.id} key={el.id}>
            {el.nameModel}
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

      <button type="submit" onClick={(e) => handleSubmit(e)}>
        CREATE
      </button>
    </form>
  );
};

export default AddProduct;
