const FormValidationProduct = (e) => {
  let error = {};

  const PriceVal = new RegExp(/^([0-9]|[^a-zA-Z]\S){2,5}$/);
  const nameVal = new RegExp(/^([a-zA-Z]|[^0-9]\S)([^0-9]*){1,}$/);


  if (e.price) if (!PriceVal.test(e.price)) error.price = 'You must put the price in numbers';
  if (e.color) if(!nameVal.test(e.color)) error.color = "Color can't be numbers";

  return error;
};

export default FormValidationProduct;
