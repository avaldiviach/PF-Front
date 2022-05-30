import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import s from "./Orders.module.css";

const TableOrders = ({update}) => {
  const orders = useSelector((state) => state.getOrders);
  const dispatch = useDispatch();

  console.log(orders);
  // const ordById = (e) => {
  //   e.preventDefault();
  //   dispatch(getOrderById(e.target.value));
  // };

  const updateOrder = async (e) => {
    e.preventDefault()
    update({order: orders[e.target.value], show:true})
  }

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
          orders.map((ord, i) => (
            <tr key={ord.id}>
              <td>{ord.id}</td>
              <td>{ord.nameUser}</td>
              <td>{ord.state}</td>
              <td>{ord.date}</td>
              <td>
                <button value={i} className={s.update} onClick={updateOrder}>
                  ✎
                </button>
              </td>
              <td>

              <button value={ord.id}>👁</button>
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default TableOrders;
