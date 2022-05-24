import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import FormValidation from "./FormValidation";
import s from "./AddProduct.module.css";
import { createSneaker, getColors } from "../../../Redux/Actions";

const AddProduct = () => {
  const initialValues = {
    model: [],
    color: [],
    image: "",
    price: "",
  };

  const [input, setInput] = useState(initialValues);
  const dispatch = useDispatch();
  const modelsAll = useSelector((state) => state.getModels);
  const colors = useSelector((state) => state.getColors);

  useEffect(() => {
    dispatch(getColors());
  }, [dispatch]);

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
      input.model.length > 0 &&
      input.color.length > 0
    ) {
      e.preventDefault();
      dispatch(createSneaker(input));
      alert("The sneaker was succesfully Created!");

      setInput({
        model: [],
        color: [],
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
        {modelsAll?.map((el) => (
          <option name={el.nameModel} value={el.id} key={el.id}>
            {el.nameModel}
          </option>
        ))}
      </select>

      <label className={s.text}>Color:</label>
      <select>
        {colors.map((el) => (
          <option name={el.nameColor} value={el.id} key={el.id}>
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

      <button type="submit" onClick={(e) => handleSubmit(e)}>
        CREATE
      </button>
    </form>
  );
};

export default AddProduct;
