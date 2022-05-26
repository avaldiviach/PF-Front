const FormValidation = (e) => {
  let error = {};

  const message = "This field must be filled in";
  const descriptionVal = new RegExp(/^([a-zA-Z]|[^0-9]\S)([^0-9]*)$/);
  const nameVal = new RegExp(/^([a-zA-Z]|[^0-9]\S)([^0-9]*){1,}$/);
  const materialVal = new RegExp(/^([a-zA-Z]|[^0-9]\S)([^0-9]*)$/);

  if (!descriptionVal.test(e.description)) error.description = message;
  if (!nameVal.test(e.name)) error.name = message;
  if (!materialVal.test(e.material)) error.material = message;

  if (e.categories.length === "" || e.categories.length === 0)
    error.categories = "A category is required";

  if (e.brand.length === "" || e.brand.length === 0)
    error.brand = "A brand is required";

  if (e.brand.length > 1) error.brand = "Only one brand can be selected";
  if (e.sizes.length === "" || e.sizes.length === 0)
    error.sizes = "A size is required";

  return error;
};

export default FormValidation;
