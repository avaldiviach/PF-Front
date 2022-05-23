const FormValidation = (e) => {
  let error = {};

  const message = "This field must be filled in";
  //sneaker
  const imgVal = new RegExp(/\.(jpg|png)$/);
  const PriceVal = new RegExp(/^[0-9]{2,5}$/);
  if (!imgVal.test(e.image)) error.image = message;
  if (!PriceVal.test(e.price)) error.price = message;

  //model
  const descriptionVal = new RegExp(/^([a-zA-Z]|[^0-9]\S)([^0-9]*)$/);
  const nameVal = new RegExp(/^([a-zA-Z]|[^0-9]\S)([^0-9]*){1,}$/);

  if (!descriptionVal.test(description)) error.description = message;
  if (!nameVal.test(e.name)) error.name = message;

  if (e.categories.length === "" || e.categories.length === 0)
    error.categories = "A category is required";

  for (let i = 0; i < e.categories.length; i++) {
    for (let y = i + 1; y <= e.categories.length; y++) {
      if (e.categories[i] === e.categories[y])
        error.categories = "The categories can not be repeated";
    }
  }

  if (e.brands.length === "" || e.brands.length === 0)
    error.brands = "A brand is required";

  for (let i = 0; i < e.brands.length; i++) {
    for (let y = i + 1; y <= e.brands.length; y++) {
      if (e.brands[i] === e.brands[y])
        error.brands = "The categories can not be repeated";
    }
  }

  if (e.materials.length === "" || e.materials.length === 0)
    error.materials = "A material is required";

  for (let i = 0; i < e.materials.length; i++) {
    for (let y = i + 1; y <= e.materials.length; y++) {
      if (e.materials[i] === e.materials[y])
        error.materials = "The materials can not be repeated";
    }
  }

  return error;
};

export default FormValidation;
