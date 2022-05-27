import React from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import s from "./users.module.css";
import { deleteUser, getAllUsers } from "../../../Redux/Actions";

export default function TableUsers() {
  const users = useSelector((state) => state.users);

  const dispatch = useDispatch();

  const deleteOneUser = (e) => {
    e.preventDefault();
    dispatch(deleteUser(e.target.value));
    alert(`the user ${e.target.value} will be deleted`);
    dispatch(getAllUsers());
  };

  return (
    <Table bordered striped hover className={s.table}>
      <thead className={s.thead}>
        <tr>
          <th>id</th>
          <th>Rol</th>
          <th>Name</th>
          <th>Email</th>
          <th>Update</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody className={s.tbody}>
        {users.length > 0 &&
          users.map((user) => (
            !user.deleted &&
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.typeUser}</td>
              <td>{user.nameUser}</td>
              <td>{user.email}</td>
              <td>
                <Link
                  to={`/userDetail/${user.id}`}
                  style={{ color: "inherit", textDecoration: "inherit" }}
                >
                  <button value={user.id} className={s.update}>
                    ✎
                  </button>
                </Link>
              </td>
              <td>
                <button
                  value={user.id}
                  onClick={(e) => deleteOneUser(e)}
                  className={s.delete}
                >
                  ✖︎
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
}
