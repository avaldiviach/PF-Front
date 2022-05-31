import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { getSneakers, updateSneaker } from "../../../../Redux/Actions";
import { useDispatch } from "react-redux";
import SelectSizes from "./select/Sizes";
import s from './form.module.css'

export default function UpdateSneaker({onHide, show, sneaker}) {
    const dispatch = useDispatch();
    const [input, setInput] = useState({
            price: [],
            sizes: []
        });

    useEffect(() => {
        setInput(
            {
                ...input,
                price: sneaker.price
            }
        )
    }, []);

    const [error, setError] = useState("");

    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    };

    const handleSelectMultiChange = (value, meta) => {
        setInput({
            ...input,
            [meta.name]: value,
        });
    };

    const createClick = async (e) => {
        e.preventDefault();
        await dispatch(updateSneaker(sneaker.id, input));
        setInput({
            price: '',
            sizes: [],
        });
        onHide();
        await dispatch(getSneakers());
        
    };

    return (
        <Modal
        show={show}
        onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Update Model
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form.Group className={s.group}>
                    <Form.Label id="label">Price</Form.Label>
                    <Form.Control
                        name="price"
                        type="number"
                        defaultValue={sneaker.price}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                {error.material && <p className={s.error}>{error.material}</p>}

                <Form.Group className={s.group}>
                    <Form.Label id="label">Sizes</Form.Label>
                    <SelectSizes sizesSneaker={sneaker.sizes} handleSelectMultiChange={handleSelectMultiChange} />
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
