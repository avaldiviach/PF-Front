import { useDispatch } from "react-redux";
import TableOrders from "./table";
import { getOrders } from "../../../Redux/Actions";
import { useEffect } from "react";

const OrdersContent = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getOrders())
  }, []);

  return (
    <div>
      <h1>Orders</h1>
      <TableOrders />
    </div>
  );
};

export default OrdersContent;
