import { useSelector } from "react-redux";

const AddProduct = () => {
  const models = useSelector((state) => state.getModels);
  console.log(models);

  return (
    <form>
      <h1>Create Sneaker</h1>

      <label>Model:</label>
      <select>
        {models.map((el) => (
          <option name={el.nameModel} value={el.id} key={el.id}>
            {el.nameModel}
          </option>
        ))}
      </select>
    </form>
  );
};

export default AddProduct;
