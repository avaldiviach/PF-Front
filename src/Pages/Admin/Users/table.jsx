import React, { useState } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import s from "./users.module.css";
import Switch from "@mui/material/Switch";
import { FormControlLabel } from "@mui/material";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import { deleteUser, getAllUsers } from "../../../Redux/Actions";


const radios = [
  { name: 'All', value: 'all' },
  { name: 'Enabled', value: 'enabled' },
  { name: 'Disabled', value: 'disabled' },
];

export default function TableUsers({ showModalDelete, setModalDeleteUser, update }) {
  const usersAll = useSelector((state) => state.users);

  const [state, setstate] = useState('all');


  let users;
  if (state === 'enabled') {
    users = usersAll.filter(u => u.deleted === false)
  } else if (state === 'disabled') {
    users = usersAll.filter(u => u.deleted === true)
  } else {
    users = usersAll
  }

  const dispatch = useDispatch();

  const deleteOneUser = (e) => {
    e.preventDefault();
    showModalDelete();
    setModalDeleteUser({
      show: true,
      msg: `Are you sure do you want to change the user ${e.target.value} state?`,
      title: `Change state user`,
      action: async () => {
        await dispatch(deleteUser(e.target.value));
        await dispatch(getAllUsers());
      },
    });
  };

  const updateRole = e => {
    e.preventDefault()
    update({
      show: true,
      id: e.target.value
    })
  }

  return (
    <>
      <div className={s.btn}>
        <ButtonGroup className="mb-2">
          {radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              id={`radio-${idx}`}
              type="radio"
              variant="secondary"
              name="radio"
              value={radio.value}
              checked={state === radio.value}
              onChange={(e) => setstate(e.currentTarget.value)}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </div>

      <Table hover className={s.table}>
        <thead className={s.thead}>
          <tr>
            <th>id</th>
            <th>Rol</th>
            <th>Name</th>
            <th>Email</th>
            <th>Update</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody className={s.tbody}>
          {users.length > 0 &&
            users.map(
              (user) =>
              (
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
                      <button value={user.id} className={s.update} onClick={updateRole}>
                        ✎
                      </button>
                    </Link>
                  </td>
                  <td>
                    <FormControlLabel
                      value="top"
                      control={
                        <Switch
                          checked={!user.deleted}
                          color="info"
                          value={user.id}
                          onChange={(e) => alert(e.target.checked)}
                          onClick={deleteOneUser}
                        />
                      }
                      labelPlacement="start"
                    />
                  </td>
                </tr>
              )
            )}
        </tbody>
      </Table>
    </>

  );
}
