import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { getSneakers, updateSneaker } from "../../../Redux/Actions";
import { useDispatch } from "react-redux";
import s from './createModel/form.module.css'
import { createDiscount } from "../../../Redux/Actions";

export default function AddDiscount({onHide, show, id}) {
    const dispatch = useDispatch();
    const [input, setInput] = useState({
            discount: '',
            hours: '',
            days: ''
        });


    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    };

    const createClick = async (e) => {
        e.preventDefault();
        await dispatch(createDiscount(id, input));
        setInput({
            discount: '',
            hours: '',
            days: ''
        });
        onHide();
        await dispatch(getSneakers());
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
                    Add discount
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form.Group className={s.group}>
                    <Form.Label id="label">Percentage</Form.Label>
                    <Form.Control
                        name="discount"
                        type="number"
                        defaultValue={0}
                        max={99}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group className={s.group}>
                    <Form.Label id="label">hours</Form.Label>
                    <Form.Control
                        name="hours"
                        type="number"
                        defaultValue={0}
                        max={23}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group className={s.group}>
                    <Form.Label id="label">Days</Form.Label>
                    <Form.Control
                        name="days"
                        type="number"
                        defaultValue={0}
                        max={31}
                        onChange={handleInputChange}
                    />
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
