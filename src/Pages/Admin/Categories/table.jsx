import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory, getCategories } from "../../../Redux/Actions";
import s from "./categories.module.css";

const TableCategories = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);

  const deleteCat = (e) => {
    e.preventDefault();
    dispatch(deleteCategory(e.target.value));
    alert(`the category ${e.target.value} will be deleted`);
    dispatch(getCategories());
  };


  return (
    <Table bordered striped hover className={s.table}>
      <thead className={s.thead}>
        <tr>
          <th>id</th>
          <th>Name</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody className={s.tbody}>
        {categories.length > 0 &&
          categories.map((cat) => (
            <tr key={cat.id}>
              <td>{cat.id}</td>
              <td>{cat.nameCategory}</td>
              <td>
                <button
                  value={cat.id}
                  onClick={(e) => deleteCat(e)}
                  className={s.delete}
                >
                  ✖︎
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default TableCategories;
