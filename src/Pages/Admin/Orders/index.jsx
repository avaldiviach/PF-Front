import { useDispatch } from "react-redux";
import TableOrders from "./table";
import { getOrders } from "../../../Redux/Actions";
import { useEffect, useState } from "react";
import UpdateOrder from "./updateOrder";
import { useSelector } from "react-redux";
import OrderDetail from "./OrderDetail/OrderDetail";

const OrdersContent = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.getToken);

  const [showUpdate, setShowUpdate] = useState({
    show: false,
    order: {},
  });

  const [showOrder, setShowOrder] = useState({
    show: false,
  });

  useEffect(() => {
    dispatch(getOrders(token));
  }, [dispatch]);

  return (
    <div>
      <h1>Orders</h1>
      <TableOrders update={setShowUpdate} detail={setShowOrder} />
      <UpdateOrder
        show={showUpdate.show}
        order={showUpdate.order}
        onHide={() => setShowUpdate((prev) => ({ ...prev, show: false }))}
      />
      <OrderDetail
        show={showOrder.show}
        onHide={() => setShowOrder({ show: false })}
      />
    </div>
  );
};

export default OrdersContent;
