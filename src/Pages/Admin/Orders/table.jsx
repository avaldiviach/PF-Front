import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "../../../Redux/Actions";
import s from "./Orders.module.css";

const TableOrders = () => {
  const orders = useSelector((state) => state.getOrders);
  const orderById = useSelector((state) => state.orderById);
  const dispatch = useDispatch();
  console.log(orders);

  // const ordById = (e) => {
  //   e.preventDefault();
  //   dispatch(getOrderById(e.target.value));
  // };

  return (
    <Table hover className={s.table}>
      <thead className={s.thead}>
        <tr>
          <th>id</th>
          <th>UserName</th>
          <th>State</th>
          <th>Date</th>
          <th>Update</th>
          <th>Order Detail</th>
        </tr>
      </thead>
      <tbody className={s.tbody}>
        {orders.length > 0 &&
          orders.map((ord) => (
            <tr key={ord.id}>
              <td>{ord.id}</td>
              <td>{ord.nameUser}</td>
              <td>{ord.state}</td>
              <td>{ord.date}</td>
              <td>
                <button value={ord.id} className={s.update}>
                  ✎
                </button>
                <button value={ord.id}>👁</button>
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default TableOrders;
