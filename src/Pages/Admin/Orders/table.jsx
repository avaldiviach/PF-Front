import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersFiltered } from "../../../Redux/Actions";
import s from "./Orders.module.css";

const TableOrders = ({ update }) => {
  const orders = useSelector((state) => state.getOrdersCopy);
  const dispatch = useDispatch();

  // const ordById = (e) => {
  //   e.preventDefault();
  //   dispatch(getOrderById(e.target.value));
  // };

  const [loading, setLoading] = useState(false);

  const updateOrder = async (e) => {
    e.preventDefault();
    update({ order: orders[e.target.value], show: true });
  };

  useEffect(() => {
    dispatch(getOrdersFiltered());
  });

  return (
    <Table hover className={s.table}>
      <thead className={s.thead}>
        {orders.length === 0 && loading === false ? (
          <div></div>
        ) : loading === true ? (
          <tr>
            <th>id</th>
            <th>UserName</th>
            <th>State</th>
            <th>Date</th>
            <th>Update</th>
            <th>Order Detail</th>
          </tr>
        ) : (
          <></>
        )}
      </thead>
      <tbody className={s.tbody}>
        {orders.length > 0 ? (
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
          ))
        ) : (
          <div>
            <p className={s.not}>Orders were not found</p>
          </div>
        )}
      </tbody>
    </Table>
  );
};

export default TableOrders;
