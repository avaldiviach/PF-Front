import { useDispatch } from "react-redux";
import TableOrders from "./table";
import { getOrders, getOrdersCompleted } from "../../../Redux/Actions";
import { useEffect, useState } from "react";
import UpdateOrder from "./updateOrder";
import s from "./Orders.module.css";

const OrdersContent = () => {
  const dispatch = useDispatch();

  const [showUpdate, setShowUpdate] = useState({
    show: false,
    order: {},
  });

  useEffect(() => {
    dispatch(getOrders());
  }, [getOrdersCompleted]);

  const handleCompleted = (e) => {
    e.preventDefault();
    dispatch(getOrdersCompleted(e.target.value));
  };

  return (
    <div>
      <h1>Orders</h1>
      <button className={s.btnFilter} onClick={handleCompleted}>
        COMPLETED
      </button>
      <button className={s.btnFilter}>CANCELLED</button>
      <button className={s.btnFilter}>IN PROGRESS</button>
      <button className={s.btnFilter}>PENDING</button>

      <TableOrders update={setShowUpdate} />
      <UpdateOrder
        show={showUpdate.show}
        order={showUpdate.order}
        onHide={() => setShowUpdate((prev) => ({ ...prev, show: false }))}
      />
    </div>
  );
};

export default OrdersContent;
