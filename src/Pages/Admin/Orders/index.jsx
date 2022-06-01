import { useDispatch } from "react-redux";
import TableOrders from "./table";
import { getOrders } from "../../../Redux/Actions";
import { useEffect, useState } from "react";
import UpdateOrder from "./updateOrder";
import {useSelector}from 'react-redux'

const OrdersContent = () => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.getToken )

  const [showUpdate, setShowUpdate] = useState({
                                          show: false,
                                          order: {}
                                      });

  useEffect(() => {
    dispatch(getOrders(token))
  }, []);

  return (
    <div>
      <h1>Orders</h1>
      <TableOrders update={setShowUpdate}/>
      <UpdateOrder show={showUpdate.show} order={showUpdate.order} onHide={() => setShowUpdate(prev => ({...prev, show:false}))}/>
    </div>
  );
};

export default OrdersContent;
