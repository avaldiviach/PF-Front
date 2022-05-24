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

  if (!descriptionVal.test(e.description)) error.description = message;
  if (!nameVal.test(e.name)) error.name = message;

  if (e.categories.length === "" || e.categories.length === 0)
    error.categories = "A category is required";

  for (let i = 0; i < e.categories.length; i++) {
    for (let y = i + 1; y <= e.categories.length; y++) {
      if (e.categories[i] === e.categories[y])
        error.categories = "The categories can not be repeated";
    }
  }

  if (e.brand.length === "" || e.brand.length === 0)
    error.brand = "A brand is required";

  if (e.brand.length > 1) error.brand = "Only one brand can be selected";

  // for (let i = 0; i < e.brand.length; i++) {
  //   for (let y = i + 1; y <= e.brand.length; y++) {
  //     if (e.brand[i] === e.brand[y])
  //       error.brand = "The categories can not be repeated";
  //   }
  // }

  if (e.material.length === "" || e.material.length === 0)
    error.material = "A material is required";

  for (let i = 0; i < e.material.length; i++) {
    for (let y = i + 1; y <= e.material.length; y++) {
      if (e.material[i] === e.material[y])
        error.material = "The materials can not be repeated";
    }
  }

  if (e.sizes.length === "" || e.sizes.length === 0)
    error.sizes = "A size is required";

  for (let i = 0; i < e.sizes.length; i++) {
    for (let y = i + 1; y <= e.sizes.length; y++) {
      if (e.sizes[i] === e.sizes[y])
        error.sizes = "The sizes can not be repeated";
    }
  }

  return error;
};

export default FormValidation;
