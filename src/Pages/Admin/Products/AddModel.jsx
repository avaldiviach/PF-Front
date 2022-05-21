import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  getBrands,
  getMaterials,
  getSizes,
} from "../../../Redux/Actions/index";
import FormValidation from "./FormValidation";
import s from "./AddProduct.module.css";

const AddModel = () => {
  const initialValues = {
    brands: [],
    materials: [],
    categories: [],
    sizes: [],
    name: "",
    description: "",
  };
  const [input, setInput] = useState(initialValues);
  const brands = useSelector((state) => state.getBrands);
  const materials = useSelector((state) => state.getMaterials);
  const categories = useSelector((state) => state.categories);
  const sizes = useSelector((state) => state.getSizes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getMaterials());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getSizes());
  }, [dispatch]);

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(FormValidation({ ...input, [e.target.name]: e.target.value }));
  };

  const handleSelectBrands = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      brands: [...new Set([...input.brands, e.target.value])],
    });
    setError(
      FormValidation({
        ...input,
        brands: [...input.brands, e.target.value],
      })
    );
  };

  const handleSelectCategories = (e) => {
    e.preventDefault();
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

  const handleSelectMaterials = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      materials: [...new Set([...input.materials, e.target.value])],
    });
    setError(
      FormValidation({
        ...input,
        materials: [...input.materials, e.target.value],
      })
    );
  };

  return (
    <form className={s.containerr}>
      <label className={s.text}>BRAND:</label>
      <select name="brands" value={input.brands} onChange={handleSelectBrands}>
        {brands.map((el) => (
          <option name={el.nameBrand} value={el.id} key={el.id}>
            {el.nameBrand}
          </option>
        ))}
      </select>

      <label className={s.text}>MATERIALS:</label>
      <select
        name="materials"
        value={input.materials}
        onChange={handleSelectMaterials}
      >
        {materials.map((el) => (
          <option name={el.nameMaterial} value={el.id} key={el.id}>
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
      <select name="sizes" value={input.sizes}>
        {sizes.map((el) => (
          <option name={el.numberSize} value={el.id} key={el.id}>
            {el.numberSize}
          </option>
        ))}
      </select>

      <label className={s.text}>CATEGORIES:</label>
      <select
        name="categories"
        value={input.categories}
        onChange={handleSelectCategories}
      >
        {categories.map((el) => (
          <option name={el.nameCategory} value={el.id} key={el.id}>
            {el.nameCategory}
          </option>
        ))}
      </select>

      <label className={s.text}>DESCRIPTION:</label>
      <input
        className={s.input}
        name="description"
        value={input.description}
        onChange={handleInputChange}
      />
      <button>CREATE</button>
    </form>
  );
};

export default AddModel;
