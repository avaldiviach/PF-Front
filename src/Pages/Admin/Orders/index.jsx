import { useDispatch, useSelector } from "react-redux";
import TableOrders from "./table";
import { getOrders, getOrdersFiltered } from "../../../Redux/Actions";
import { useEffect, useState } from "react";
import UpdateOrder from "./updateOrder";
import { useSelector } from "react-redux";

const OrdersContent = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.getToken);

  const [showUpdate, setShowUpdate] = useState({
    show: false,
    order: {},
  });

  const handleFilter = async (e) => {
    e.preventDefault();
    await dispatch(getOrdersFiltered(e.target.value));
  };

  useEffect(() => {
    dispatch(getOrders(token));
  }, []);

  return (
    <div>
      <h1>Orders</h1>

      <select onChange={handleFilter}>
        <option value="all">All</option>
        <option value="Pending">Pending</option>
        <option value="InProgress">In Progress</option>
        <option value="Cancelled">Cancelled</option>
        <option value="Completed">Completed</option>
      </select>

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
