const FormValidation = (e) => {
  let error = {};

  const descriptionVal = new RegExp(/^([a-zA-Z0-9]+[_-])*[a-zA-Z0-9]+.[a-zA-Z0-9]+$/);
  const nameVal = new RegExp(/^([a-zA-Z0-9]+[_-])*[a-zA-Z0-9]+.[a-zA-Z0-9]+$/);
  const materialVal = new RegExp(/^([a-zA-Z]|[^0-9]\S)([^0-9]*)$/);

  if(e.description) if (!descriptionVal.test(e.description)) error.description = "A description is required";
  if(e.name) if (!nameVal.test(e.name)) error.name = "A name is required";
  if(e.material) if (!materialVal.test(e.material)) error.material = "A material is required, use only (a-z)";

  if (e.categories) {
    if (e.categories.length === 0)
    error.categories = "A category is required";
  } 

  if (e.brand.length === "" || e.brand.length === 0)
    error.brand = "A brand is required";

  if (e.sizes.length === "" || e.sizes.length === 0)
    error.sizes = "A size is required";

  return error;
};

export default FormValidation;
