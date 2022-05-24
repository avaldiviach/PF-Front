import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  getBrands,
  getSizes,
} from "../../../Redux/Actions/index";
import FormValidation from "./FormValidation";
import s from "./AddProduct.module.css";

const AddModel = () => {
  const initialValues = {
    brand: [],
    material: [],
    categories: [],
    sizes: [],
    name: "",
    description: "",
  };
  const [input, setInput] = useState(initialValues);
  const brand = useSelector((state) => state.getBrands);
  const material = useSelector((state) => state.getMaterials);
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
      brand: [...new Set([...input.brand, e.target.value])],
    });
    setError(
      FormValidation({
        ...input,
        brand: [...input.brand, e.target.value],
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
      material: [...new Set([...input.material, e.target.value])],
    });
    console.log(input.material, "input");
    setError(
      FormValidation({
        ...input,
        material: [...input.material, e.target.value],
      })
    );
  };

  const deleteSelectCategory = (item) => {
    setInput({
      ...input,
      categories: input.categories.filter((el) => el !== item),
    });
  };

  const deleteSelectMaterial = (item) => {
    setInput({
      ...input,
      material: input.material.filter((el) => el !== item),
    });
  };

  const deleteSelectBrand = (item) => {
    setInput({
      ...input,
      brand: input.brand.filter((el) => el !== item),
    });
  };

  return (
    <form className={s.containerr}>
      <label className={s.text}>BRAND:</label>
      <select name="brand" value={input.brand} onChange={handleSelectBrands}>
        {brand.map((el) => (
          <option name={el.nameBrand} value={el.id} key={el.id}>
            {el.nameBrand}
          </option>
        ))}
      </select>

      {input.brand.length > 0
        ? input.brand?.map((item) => {
            let brnd = brand.find((el) => el.id == item);
            return (
              <div key={brnd.id}>
                <div>{brnd.nameBrand}</div>
                <button onClick={deleteSelectBrand}>X</button>
              </div>
            );
          })
        : ""}

      <label className={s.text}>MATERIALS:</label>
      <select
        name="material"
        value={input.material}
        onChange={handleSelectMaterials}
      >
        {material.map((el) => (
          <option name={el.nameMaterial} value={el.id} key={el.id}>
            {el.nameMaterial}
          </option>
        ))}
      </select>

      {input.material.length > 0
        ? input.material?.map((item) => {
            let materi = material.find((el) => el.id == item);
            return (
              <div key={materi.id}>
                <div>{materi.nameMaterial}</div>
                <button onClick={deleteSelectMaterial}>X</button>
              </div>
            );
          })
        : ""}
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
      {input.sizes.length > 0
        ? input.sizes?.map((item) => {
            let size = sizes.find((el) => el.id == item);
            return (
              <div key={size.id}>
                <div>{size.numberSize}</div>
                <button>X</button>
              </div>
            );
          })
        : ""}
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
      {input.categories.length > 0
        ? input.categories?.map((item) => {
            let catego = categories.find((el) => el.id == item);
            return (
              <div key={catego.id}>
                <div>{catego.nameCategory}</div>
                <button onClick={() => deleteSelectCategory(item)}>X</button>
              </div>
            );
          })
        : ""}
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
