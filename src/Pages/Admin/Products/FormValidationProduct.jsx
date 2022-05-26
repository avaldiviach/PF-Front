const FormValidationProduct = (e) => {
  let error = {};

  const message = "This field must be filled in";
  //sneaker
  // const imgVal = new RegExp(/\.(jpg|png)$/);
  const PriceVal = new RegExp(/^[0-9]{2,5}$/);
  // if (!imgVal.test(e.image)) error.image = message;
  if (!PriceVal.test(e.price)) error.price = message;

  //model
  const descriptionVal = new RegExp(/^([a-zA-Z]|[^0-9]\S)([^0-9]*)$/);
  const nameVal = new RegExp(/^([a-zA-Z]|[^0-9]\S)([^0-9]*){1,}$/);

  if (!descriptionVal.test(e.description)) error.description = message;
  if (!nameVal.test(e.name)) error.name = message;

  return error;
};

export default FormValidationProduct;
