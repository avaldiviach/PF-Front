import React, { useEffect, useState } from "react";
import TableUsers from "./table";
import { useDispatch,useSelector } from "react-redux";
import { getAllUsers, getSneakers } from "../../../Redux/Actions";
import ModalAdmin from "../ModalAdmin/ModalAdmin";
import UpdateUserModal from "./UpdateUserModal";


export default function UserContent() {
  const dispatch = useDispatch();
  const token = useSelector(state => state.getToken )

  const [modalDeleteUser, setModalDeleteUser] = useState({
    show: false,
    msg: "",
    title: "",
    action: "",
  });

  const [updateModal, setUpdateModal] = useState({
    show: false,
    id: ''
  });

  useEffect(() => {
    dispatch(getAllUsers(token));
  }, [dispatch]);

  return (
    <div className="userPage">
      <h1>Users</h1>
      <TableUsers
        showModalDelete={() =>
          setModalDeleteUser({ ...modalDeleteUser, show: true })
        }
        setModalDeleteUser={setModalDeleteUser}
        update={setUpdateModal}
        state={modalDeleteUser}
      />
      <UpdateUserModal 
        show={updateModal.show}
        onHide={() => setUpdateModal({...updateModal, show:false})}
        id={updateModal.id}
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
