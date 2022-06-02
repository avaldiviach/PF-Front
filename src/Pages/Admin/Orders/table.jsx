import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import s from "./Orders.module.css";
import { useState } from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import { getOrderById } from "../../../Redux/Actions";

const radios = [
  { name: "All", value: "all" },
  { name: "Pending", value: "Pending" },
  { name: "In Progress", value: "InProgress" },
  { name: "Completed", value: "Completed" },
  { name: "Cancelled", value: "Cancelled" },
];

const TableOrders = ({ update, detail }) => {
  const AllOrders = useSelector((state) => state.getOrders);
  const dispatch = useDispatch();
  const [state, setstate] = useState("all");
  const token = useSelector((state) => state.getToken);

  let orders;

  if (state === "Pending") {
    orders = AllOrders.filter((el) => el.state === "Pending");
  } else if (state === "InProgress") {
    orders = AllOrders.filter((el) => el.state === "In Progress");
  } else if (state === "Completed") {
    orders = AllOrders.filter((el) => el.state === "Completed");
  } else if (state === "Cancelled") {
    orders = AllOrders.filter((el) => el.state === "Cancelled");
  } else {
    orders = AllOrders;
  }

  const updateOrder = async (e) => {
    e.preventDefault();
    update({ order: orders[e.target.value], show: true });
  };

  const handleDetail = async (e) => {
    e.preventDefault();
    await dispatch(getOrderById(e.target.value, token));
    detail({ show: true });
  };

  return (
    <>
      <div className={s.btn}>
        <ButtonGroup className="mb-2">
          {radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              id={`radio-${idx}`}
              type="radio"
              variant="secondary"
              name="radio"
              value={radio.value}
              checked={state === radio.value}
              onChange={(e) => setstate(e.currentTarget.value)}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </div>

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
                  <button value={ord.id} onClick={handleDetail}>
                    👁
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default TableOrders;
