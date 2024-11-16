export const isFormValid = (formData, formFields = null) => {
  const _formData = { ...formData };
  if (formFields) {
    formFields?.forEach((field) => {
      if (!field.isMandatory) {
        delete _formData[field.name];
      }
    });
  }
  return Object.keys(_formData)
    .map((key) => _formData[key] !== "")
    .every((item) => item);
};

export const calculateTotalCartPrice = (cartItems) => {
  return cartItems && cartItems.length > 0
    ? cartItems.reduce(
        (sum, currentItem) =>
          sum +
          (currentItem?.salePrice > 0
            ? currentItem?.salePrice
            : currentItem?.price) *
            currentItem?.quantity,
        0
      )
    : 0;
};
