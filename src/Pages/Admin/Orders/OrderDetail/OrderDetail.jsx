import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";

const OrderDetail = ({ onHide, show }) => {
  
  const order = useSelector((state) => state.orderById);

  return (
    <Modal
      onHide={onHide}
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Order Detail
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <h3>Information</h3>
          <p>
            <b>Date:</b> {order.date}
          </p>
          <p>
            <b>User:</b> {order.nameUser}
          </p>
          <p>
            <b>email:</b> {order.email}
          </p>
          <p>
            <b>Address:</b> {order.address}
          </p>
          <p>
            <b>State:</b> {order.state}
          </p>
          <p>
            <b>Total:</b> {order.total}
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderDetail;
