import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import Select from 'react-select'
import { getAllUsers, updateUser } from "../../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import s from '../Products/createModel/form.module.css'


const options = [
  { value: 'admin', label: 'Admin' },
  { value: 'client', label: 'Client' },
]


export default function UpdateUserModal({onHide, show, id}) {
    const dispatch = useDispatch();
  const token = useSelector(state => state.getToken )
    const [input, setInput] = useState({
            role: ''
        });


        const handleSelectChange = (value, meta) => {
          setInput({
            ...input,
            [meta.name]: value.value,
          });
        };

    const createClick = async (e) => {
        e.preventDefault();
        await dispatch(updateUser(id, input));
        setInput({
            role: ''
        });
        onHide();
        await dispatch(getAllUsers(token))
    };

    return (
        <Modal
        show={show}
        onHide={onHide}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Update User Client
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form.Group className={s.group}>
                    <Form.Label id="label">New role</Form.Label>
                    <Select name="role" options={options} onChange={(opt, meta) => handleSelectChange(opt, meta)}/>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={onHide}>
                    Cancel
                </Button>
                <Button variant="warning" onClick={createClick}>
                    Update
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
