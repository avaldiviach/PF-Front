import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  getBrands,
  getSizes,
  createModel,
} from "../../../Redux/Actions/index";
import FormValidation from "./FormValidation";
import s from "./AddProduct.module.css";

const AddModel = () => {
  const initialValues = {
    brand: "",
    material: "",
    categories: [],
    sizes: [],
    name: "",
    description: "",
  };
  const [input, setInput] = useState(initialValues);
  const [error, setError] = useState("");
  const brand = useSelector((state) => state.getBrands);
  const material = useSelector((state) => state.getMaterials);
  const categories = useSelector((state) => state.categories);
  const sizes = useSelector((state) => state.getSizes);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getSizes());
  }, [dispatch]);

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value, "aquiiii");
    setError(FormValidation({ ...input, [e.target.name]: e.target.value }));
  };

  const handleSelectSizes = (e) => {
    e.preventDefault();
    console.log(e.target.value, "sizes");
    setInput({
      ...input,
      sizes: [...new Set([...input.sizes, { size: e.target.value, stock: 5 }])],
    });
    setError(
      FormValidation({
        ...input,
        sizes: [...input.sizes, e.target.value],
      })
    );
  };

  const handleSelectCategories = (e) => {
    e.preventDefault();
    console.log(e.target.value, "catego");
    setInput({
      ...input,
      categories: [...new Set([...input.categories, e.target.value])],
    });
    setError(
      FormValidation({
        ...input,
        categories: [...input.categories, e.target.value],
      })
    );
  };

  const deleteSelectCategory = (item) => {
    setInput({
      ...input,
      categories: input.categories.filter((el) => el !== item),
    });
  };

  const handleSubmit = (e) => {
    if (
      input.name &&
      input.description &&
      input.material &&
      input.brand &&
      input.categories.length > 0
    ) {
      e.preventDefault();
      dispatch(createModel(input));
      alert("The model was succesfully Created!");

      setInput({
        brand: "",
        categories: [],
        sizes: [],
        material: "",
        name: "",
        description: "",
      });

      navigate("/");
    } else {
      e.preventDefault();
      alert("You must complete every field!");
    }
  };

  return (
    <form className={s.containerr}>
      <label className={s.text}>BRAND:</label>
      <select name="brand" value={input.brand} onChange={handleInputChange}>
        {brand.map((el) => (
          <option name={el.nameBrand} value={el.nameBrand} key={el.id}>
            {el.nameBrand}
          </option>
        ))}
      </select>

      <label className={s.text}>MATERIALS:</label>
      <select
        name="material"
        value={input.material}
        onChange={handleInputChange}
      >
        {material.map((el) => (
          <option name={el.nameMaterial} value={el.nameMaterial} key={el.id}>
            {el.nameMaterial}
          </option>
        ))}
      </select>

      <label className={s.text}>NAME:</label>
      <input
        className={s.input}
        name="name"
        value={input.name}
        onChange={handleInputChange}
      />
      <label className={s.text}>SIZE:</label>
      <select name="sizes" value={input.sizes} onChange={handleSelectSizes}>
        {sizes.map((el) => (
          <option name={el.numberSize} value={el.numberSize} key={el.id}>
            {el.numberSize}
          </option>
        ))}
      </select>
      {/* {input.sizes.length > 0
        ? input.sizes?.map((item) => {
            let size = sizes.find((el) => el.numberSize == item);
            return (
              <div key={size.id}>
                <div>{size.numberSize}</div>
                <button>X</button>
              </div>
            );
          })
        : ""} */}
      <label className={s.text}>CATEGORIES:</label>
      <select
        name="categories"
        value={input.categories}
        onChange={handleSelectCategories}
      >
        {categories.map((el) => (
          <option name={el.nameCategory} value={el.nameCategory} key={el.id}>
            {el.nameCategory}
          </option>
        ))}
      </select>
      {/* {input.categories.length > 0
        ? input.categories?.map((item) => {
            let catego = categories.find((el) => el.id == item);
            return (
              <div key={catego.id}>
                <div>{catego.nameCategory}</div>
                <button onClick={() => deleteSelectCategory(item)}>X</button>
              </div>
            );
          })
        : ""} */}
      <label className={s.text}>DESCRIPTION:</label>
      <input
        className={s.input}
        name="description"
        value={input.description}
        onChange={handleInputChange}
      />
      <button onClick={handleSubmit}>CREATE</button>
    </form>
  );
};

export default AddModel;
