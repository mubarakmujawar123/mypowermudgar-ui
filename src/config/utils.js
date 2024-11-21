import { constantMap } from "./constant";

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
          parseInt(sum) +
          (currentItem?.salePrice > 0
            ? parseInt(
                calculateItemPrice(
                  currentItem?.salePrice,
                  currentItem?.quantity,
                  currentItem?.productDescription
                )
              )
            : parseInt(
                calculateItemPrice(
                  currentItem?.price,
                  currentItem?.quantity,
                  currentItem?.productDescription
                )
              )),
        0
      )
    : 0;
};

export const calculateItemPrice = (basePrice, quantity, productDescription) => {
  let finalPrice = basePrice * parseInt(quantity);

  let productWeight = productDescription.weight;
  if (productWeight) {
    if (productWeight.includes("-")) {
      productWeight = productWeight.split("-")?.[0];
    }

    finalPrice = finalPrice * parseInt(productWeight);
  }
  console.log("finalPrice 123", finalPrice);
  finalPrice = finalPrice.toFixed(2);
  return finalPrice;
};

export const getConstantValue = (key) => {
  return constantMap[key] ?? key;
};

export const calculateShippingCost = (cartItems) => {
  return 10;
};
