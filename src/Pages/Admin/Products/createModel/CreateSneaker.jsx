import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { createSneaker, getColors, getSneakers } from "../../../../Redux/Actions";
import { useDispatch } from 'react-redux';
import SelectColors from './select/Colors';
import SelectModels from './select/Models';


export default function CreateSneaker(props) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getColors())
    }, [dispatch]);

    const [input, setInput] = useState({
        model: "",
        color: "",
        image: "",
        price: "",
    })

    const handleInputChange = (e)=> {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleSelectChange = (value, meta)=> {
        setInput({
            ...input,
            [meta.name]: value
        })
    }

    const createClick =async (e) => {
        e.preventDefault()
        if (input.model && input.color && input.image && input.price) {
            await dispatch(createSneaker(input))
            alert("The sneaker was succesfully Created!");
            setInput({
                model: "",
                color: "",
                image: "",
                price: "",
            });

            props.onHide()
            await dispatch(getSneakers());
        }else{
            alert("You must complete every field!");
        }
    }



    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Create Product
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Label id='label'>Model</Form.Label>
                    <SelectModels handleSelectChange={handleSelectChange}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label id='label'>Color</Form.Label>
                    <SelectColors handleSelectChange={handleSelectChange}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label id='label'>Image</Form.Label>
                    <Form.Control name='image' type="text" placeholder="Enter image link" onChange={handleInputChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label id='label'>Price</Form.Label>
                    <Form.Control name='price' type="text" placeholder="Enter price" onChange={handleInputChange} />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='danger' onClick={props.onHide}>Cancel</Button>
                <Button variant='success' onClick={createClick}>Create</Button>
            </Modal.Footer>
        </Modal>
    );
}