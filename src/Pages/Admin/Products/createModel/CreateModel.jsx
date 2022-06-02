import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { getSneakers } from "../../../../Redux/Actions";
import { useDispatch ,useSelector} from "react-redux";
import SelectCategories from "./select/Categories";
import SelectSizes from "./select/Sizes";
import SelecBrand from "./select/Brands";
import FormValidationModel from "../FormValidationModel";
import { createModel } from "../../../../Redux/Actions";
import s from './form.module.css'

export default function CreateModel(props) {
  const dispatch = useDispatch();
  const token = useSelector(state => state.getToken )

  const [input, setInput] = useState({
    brand: "",
    material: "",
    categories: [],
    sizes: [],
    name: "",
    description: "",
  });

  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(
      FormValidationModel({ ...input, [e.target.name]: e.target.value })
    );
  };

  const handleSelectChange = (value, meta) => {
    setInput({
      ...input,
      [meta.name]: value.value,
    });
  };

  const handleSelectMultiChange = (value, meta) => {
    setInput({
      ...input,
      [meta.name]: value,
    });
    setError(
      FormValidationModel({ ...input, [meta.name]: value })
    );
  };

  const createClick = async (e) => {
    e.preventDefault();
    if (
      input.brand &&
      input.material &&
      input.name &&
      input.description &&
      input.categories.length > 0 &&
      input.sizes.length > 0
    ) {
      await dispatch(createModel(input, token));
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
        <Form.Group className={s.group}>
          <Form.Label id="label">Brand</Form.Label>
          <SelecBrand handleSelectChange={handleSelectChange} />
        </Form.Group>

        <Form.Group className={s.group}>
          <Form.Label id="label">Material</Form.Label>
          <Form.Control
            name="material"
            type="text"
            placeholder="Enter a material"
            onChange={handleInputChange}
          />
        </Form.Group>
        {error.material && <p className={s.error}>{error.material}</p>}

        <Form.Group className={s.group}>
          <Form.Label id="label">Name</Form.Label>
          <Form.Control
            name="name"
            type="text"
            placeholder="Enter name"
            onChange={handleInputChange}
          />
        </Form.Group>
        {error.name && <p className={s.error}>{error.name}</p>}

        <Form.Group className={s.group}>
          <Form.Label id="label">Description</Form.Label>
          <Form.Control
            name="description"
            type="text"
            placeholder="Write a description"
            onChange={handleInputChange}
          />
        </Form.Group>
        {error.description && <p className={s.error}>{error.description}</p>}

        <Form.Group className={s.group}>
          <Form.Label id="label">Categories</Form.Label>
          <SelectCategories handleSelectMultiChange={handleSelectMultiChange} />
        {error.categories && <p className={s.error}>{error.categories}</p>}

        </Form.Group>
        <Form.Group className={s.group}>
          <Form.Label id="label">Sizes</Form.Label>
          <SelectSizes handleSelectMultiChange={handleSelectMultiChange} />
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
