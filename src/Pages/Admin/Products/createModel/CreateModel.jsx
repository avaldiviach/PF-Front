import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { getSneakers, getSizes, createModel } from "../../../../Redux/Actions";
import { useDispatch } from "react-redux";
import SelectCategories from "./select/Categories";

export default function CreateModel(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSizes());
  }, [dispatch]);

  const [input, setInput] = useState({
    brand: "",
    material: "",
    categories: [],
    sizes: [],
    name: "",
    description: "",
  });

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (value, meta) => {
    setInput({
      ...input,
      [meta.name]: value.value,
    });
  };

  const createClick = async (e) => {
    e.preventDefault();
    if (
      input.brand &&
      input.material &&
      input.name &&
      input.description &&
      input.categories > 0 &&
      input.sizes > 0
    ) {
      console.log(input);
      dispatch(createModel(input));
      alert("The model was succesfully Created!");
      setInput({
        brand: "",
        material: "",
        categories: [],
        sizes: [],
        name: "",
        description: "",
      });

      props.onHide();
      dispatch(getSneakers());
    } else {
      alert("You must complete every field!");
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create Model
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form.Group>
          <Form.Label id="label">Brand</Form.Label>
          <Form.Control
            name="brand"
            type="text"
            placeholder="Enter a brand"
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label id="label">Material</Form.Label>
          <Form.Control
            name="material"
            type="text"
            placeholder="Enter a material"
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label id="label">Name</Form.Label>
          <Form.Control
            name="name"
            type="text"
            placeholder="Enter name"
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label id="label">Description</Form.Label>
          <Form.Control
            name="description"
            type="text"
            placeholder="Write a description"
            onChange={handleInputChange}
          />
        </Form.Group>

        {/* <Form.Group>
          <Form.Label id="label">Model</Form.Label>
          <SelectModels handleSelectChange={handleSelectChange} />
        </Form.Group> */}
        <Form.Group>
          <Form.Label id="label">Categories</Form.Label>
          <SelectCategories handleSelectChange={handleSelectChange} />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={props.onHide}>
          Cancel
        </Button>
        <Button variant="success" onClick={createClick}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
