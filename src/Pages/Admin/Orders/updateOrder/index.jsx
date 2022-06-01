import {useState, useEffect} from 'react';
import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { updateOrder, getOrders } from '../../../../Redux/Actions';
import { useDispatch, useSelector } from 'react-redux';
import s from './updateOrder.module.css'

import Slider from '@mui/material/Slider';

const marks = [
    {
        value: 0,
        label: 'Canceled'
    },
    {
        value: 30,
        label: 'Pending'
    },
    {
        value: 60,
        label: 'In Progress'
    },
    {
        value: 100,
        label: 'Completed'
    }
];

function setValue(value) {
    switch (value) {
        case 0:return 'Canceled'
        case 30:return 'Pending'
        case 60:return 'In Progress'
        case 100:return 'Completed'
    }
}
function seletStyle(state) {
    switch (state) {
        case 'Canceled': return s.cancel
        
        case 'Pending': return s.pending
        
        case 'In Progress': return s.in
        case 'Completed': return s.complete
    }
}

function defaultValue(state) {
    switch (state) {
        case 'Canceled': return 0
        
        case 'Pending': return 30
        
        case 'In Progress': return 60
        case 'Completed': return 100
    }
}

export default function UpdateOrder({ onHide, show, order }) {
    const dispatch = useDispatch()
    const [state, setstate] = useState(order.state);
    const token = useSelector(state => state.getToken )
    

    
    const createClick = async (e) => {
        e.preventDefault()
        console.log(order.id, state)
        await dispatch(updateOrder(order.id, state, token))
        await dispatch(getOrders(token))
        onHide()

    }
    const handleBar = (e, v,) => {
        e.preventDefault()
        const value = setValue(v)
        setstate(value)
    }

    function valueLabelFormat(value) {
        return marks.findIndex((mark) => mark.value === value) + 1;
    }
    
    
    return (
        <Modal
            onHide={() => {onHide(); setstate('')}}
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Update Order
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <h3>Information</h3>
                    <p><b>User:</b> {order.nameUser}</p>
                    <p><b>email:</b> {order.email}</p>
                    <p><b>Total:</b> {order.total}</p>
                </div>
                <Form.Label id='label'>State Order</Form.Label>
                <div className={s.barContainer}>
                    <Slider
                        aria-label="Restricted values"
                        defaultValue={defaultValue(order.state)}
                        valueLabelFormat={valueLabelFormat}
                        step={null}
                        marks={marks}
                        onChangeCommitted={handleBar}
                        className={seletStyle(state)}
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='danger' onClick={() => {onHide(); setstate('')}}>Close</Button>
                <Button variant='info' onClick={createClick}>Update</Button>
            </Modal.Footer>
        </Modal>
    );
}