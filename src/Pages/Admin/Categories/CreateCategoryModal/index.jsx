import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { createCategory, getCategories } from '../../../../Redux/Actions';
import { useDispatch,useSelector } from 'react-redux';

export default function CreateModalCate(props) {
    const dispatch = useDispatch()
    const token = useSelector(state => state.getToken )

    const createClick =async (e) => {
        e.preventDefault()
        const input = document.querySelector('#inputCategoryName')
            if (input.value !== '') {
            await dispatch(createCategory(input.value, token))
            
            props.onHide()
            await dispatch(getCategories());

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
                    Create Category
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <Form.Label id='label'>Category Name</Form.Label>
                    <Form.Control id='inputCategoryName' type="text" placeholder="Enter category name" />
            </Modal.Body>
            <Modal.Footer>
                <Button variant='danger' onClick={props.onHide}>Close</Button>
                <Button variant='success' onClick={createClick}>Create</Button>
            </Modal.Footer>
        </Modal>
    );
}
