import React, { useEffect, useState } from "react";
import TableUsers from "./table";
import { useDispatch } from "react-redux";
import { getAllUsers, getSneakers } from "../../../Redux/Actions";
import ModalAdmin from "../ModalAdmin/ModalAdmin";

export default function UserContent() {
  const dispatch = useDispatch();

  const [modalDeleteUser, setModalDeleteUser] = useState({
    show: false,
    msg: "",
    title: "",
    action: "",
  });

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div className="userPage">
      <h1>Users</h1>
      <TableUsers
        showModalDelete={() =>
          setModalDeleteUser({ ...modalDeleteUser, show: true })
        }
        setModalDeleteUser={setModalDeleteUser}
        state={modalDeleteUser}
      />
      <ModalAdmin
        show={modalDeleteUser.show}
        onHide={() => setModalDeleteUser({ ...modalDeleteUser, show: false })}
        action={modalDeleteUser.action}
        msg={modalDeleteUser.msg}
        title={modalDeleteUser.title}
      />
    </div>
  );
}
