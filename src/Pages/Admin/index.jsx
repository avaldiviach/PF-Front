import React, { useState, useEffect } from "react";
import { useDispatch ,useSelector} from "react-redux";
import SideBar from "./sideBar";
import s from "./Admin.module.css";
import UserContent from "./Users";
import {
  getAllUsers,
  getCategories,
  getSneakers,
  getMaterials,
  getBrands,
  getOrders,
  getOrdersFiltered,
} from "../../Redux/Actions";
import Products from "./Products";
import CategoriesContent from "./Categories";
import OrdersContent from "./Orders";
import DealsContent from "./Deals";


export default function Admin() {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const token = useSelector(state => state.getToken )

  useEffect(() => {
    dispatch(getSneakers());
  }, []);

  useEffect(() => {
    dispatch(getAllUsers(token));
  }, []);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getMaterials());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  useEffect(() => {
    dispatch(getOrdersFiltered());
  });

  return (
    <div className={s.admin_page}>
      <SideBar setContent={setContent} />
      <div className={s.content}>
        {content &&
          (() => {
            switch (content) {
              case "users":
                return <UserContent />;
              case "products":
                return <Products />;
              case "orders":
                return <OrdersContent />;
              case "categories":
                return <CategoriesContent />;
              case "deals":
                return <DealsContent />;
            }
          })()}
      </div>
    </div>
  );
}
