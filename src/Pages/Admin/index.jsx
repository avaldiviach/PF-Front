import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import SideBar from "./sideBar";
import s from "./Admin.module.css";
import UserContent from "./Users";
import {
  getAllUsers,
  getCategories,
  getSneakers,
  getMaterials,
  getBrands,
} from "../../Redux/Actions";
import Products from "./Products";
import CategoriesContent from "./Categories";

export default function Admin() {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");

  useEffect(() => {
    dispatch(getSneakers());
  }, []);

  useEffect(() => {
    dispatch(getAllUsers());
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
                return <h1>muy pronto orders</h1>;
              case "categories":
                return <CategoriesContent />;
            }
          })()}
      </div>
    </div>
  );
}
