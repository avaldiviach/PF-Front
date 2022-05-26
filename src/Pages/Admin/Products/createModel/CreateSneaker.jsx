import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { createSneaker, getSneakers } from "../../../../Redux/Actions";
import { useDispatch } from "react-redux";
import SelectColors from "./select/Colors";
import SelectModels from "./select/Models";
import FormValidationProduct from "../FormValidationProduct";

export default function CreateSneaker({ onHide, show, model }) {
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    model: "",
    color: "",
    image: "",
    price: "",
  });

  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(
      FormValidationProduct({ ...input, [e.target.name]: e.target.value })
    );
  };

  const handleSelectChange = (value, meta) => {
    setInput({
      ...input,
      [meta.name]: value.value,
    });
  };

  const createClick = async (e) => {
    e.preventDefault();
    if (input.model && input.color && input.image && input.price) {
      await dispatch(createSneaker(input));
      alert("The sneaker was succesfully Created!");
      setInput({
        model: "",
        color: "",
        image: "",
        price: "",
      });

      onHide();
      await dispatch(getSneakers());
    } else {
      alert("You must complete every field!");
    }
  };

  const goCreateModel = () => {
    onHide();
    model();
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
        <Modal.Title id="contained-modal-title-vcenter">
          Create Product
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label id="label">Model</Form.Label>
          <SelectModels handleSelectChange={handleSelectChange} />
          <p style={{ display: "inline" }}>
            If you dont see your model go to create model
          </p>
          <p
            style={{ display: "inline", color: "#17b4cc", cursor: "pointer" }}
            onClick={goCreateModel}
          >
            {" "}
            Click here
          </p>
        </Form.Group>
        <Form.Group>
          <Form.Label id="label">Color</Form.Label>
          <SelectColors handleSelectChange={handleSelectChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label id="label">Image</Form.Label>
          <Form.Control
            name="image"
            type="text"
            placeholder="Enter image link"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label id="label">Price</Form.Label>
          <Form.Control
            name="price"
            type="text"
            placeholder="Enter price"
            onChange={handleInputChange}
          />
          {error.price && <p>{error.price}</p>}
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="success" onClick={createClick}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
