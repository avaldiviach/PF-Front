import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";

export default function ModalAdmin({ msg, action, title, onHide, show }) {
  const handleSuccess = (e) => {
    e.preventDefault();
    action();
    onHide();
  };

  const handleOnHide = (e) => {
    e.preventDefault();
    onHide();
  };

  return (
    <Modal
      onHide={onHide}
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{msg}</Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleOnHide}>
          Cancel
        </Button>
        <Button variant="success" onClick={handleSuccess}>
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
