const FormValidationProduct = (e) => {
  let error = {};

  const message = "This field must be filled in";
  const PriceVal = new RegExp(/^([0-9]|[^a-zA-Z]\S){2,5}$/);

  if (!PriceVal.test(e.price)) error.price = message;

  return error;
};

export default FormValidationProduct;
