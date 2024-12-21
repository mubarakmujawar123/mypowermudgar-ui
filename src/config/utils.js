// import { getCurrencyRates } from "@/store/auth-slice/currencyRateSlice";
import {
  constantMap,
  currencySymbol,
  payPalAcceptedCurrancies,
} from "./constant";
import store from "@/store/store";

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
          Number(sum) +
          (currentItem?.salePrice > 0
            ? Number(
                calculateItemPrice(
                  currentItem?.salePrice,
                  currentItem?.quantity,
                  currentItem?.productAdditionalInfo
                )
              )
            : Number(
                calculateItemPrice(
                  currentItem?.price,
                  currentItem?.quantity,
                  currentItem?.productAdditionalInfo
                )
              )),
        0
      )
    : 0;
};

export const calculateTotalCartPriceWithPreferredCurrency = (cartItems) => {
  return cartItems && cartItems.length > 0
    ? cartItems.reduce(
        (sum, currentItem) =>
          Number(sum) +
          (currentItem?.salePrice > 0
            ? Number(
                calculateItemPrice(
                  currentItem?.salePrice,
                  currentItem?.quantity,
                  currentItem?.productAdditionalInfo,
                  true
                )
              )
            : Number(
                calculateItemPrice(
                  currentItem?.price,
                  currentItem?.quantity,
                  currentItem?.productAdditionalInfo,
                  true
                )
              )),
        0
      )
    : 0;
};

export const calculateTotalProductsCount = (cartItems) => {
  return cartItems && cartItems.length > 0
    ? cartItems.reduce(
        (sum, currentItem) => Number(sum) + Number(currentItem?.quantity),
        0
      )
    : 0;
};

export const calculateItemPrice = (
  basePrice,
  quantity,
  productAdditionalInfo,
  convertPriceToPrefferedCurrency = false
) => {
  let finalPrice = basePrice;

  let productWeight = productAdditionalInfo?.weight;
  if (productWeight) {
    if (productWeight.includes("-")) {
      productWeight = productWeight.split("-")?.[0];
    }

    finalPrice = finalPrice * Number(productWeight);
  }
  if (convertPriceToPrefferedCurrency) {
    finalPrice = convertPrice(finalPrice, false, true);
  }
  finalPrice = finalPrice * Number(quantity).toFixed(2);

  return finalPrice;
};

export const getConstantValue = (key) => {
  return constantMap[key] ?? key;
};

export const convertPrice = (
  price,
  isForPaypalOrder = false,
  returnWithoutSymbol = false
) => {
  const preferredCurrency = store?.getState()?.auth?.user?.preferredCurrency;
  const currentCurrencyRate = store?.getState()?.currencyRate?.currencyRateList;
  if (!currentCurrencyRate) {
    return "";
  }
  if (isForPaypalOrder) {
    const _currency = payPalAcceptedCurrancies.includes(preferredCurrency)
      ? preferredCurrency
      : "USD";
    return (Number(price) * Number(currentCurrencyRate[_currency])).toFixed(2);
  }
  let calculatedPrice = 0;
  if (
    preferredCurrency === "INR" ||
    !preferredCurrency ||
    !currentCurrencyRate[preferredCurrency]
  ) {
    calculatedPrice = price;
  } else {
    calculatedPrice =
      Number(price) * Number(currentCurrencyRate[preferredCurrency]);
  }
  if (returnWithoutSymbol) {
    return Number(calculatedPrice).toFixed(2);
  } else {
    return (
      getCurrencySymbol(preferredCurrency ? preferredCurrency : "INR") +
      "" +
      Number(calculatedPrice).toFixed(2)
    );
  }
};

export const convertPriceForOrderPage = (
  price,
  orderInCurrency,
  orderInCurrencyRate,
  returnWithoutSymbol = false
) => {
  let calculatedPrice = Number(price);
  if (orderInCurrencyRate && orderInCurrency) {
    calculatedPrice = calculatedPrice * Number(orderInCurrencyRate);
  }
  if (returnWithoutSymbol) {
    return Number(calculatedPrice).toFixed(2);
  }
  return (
    getCurrencySymbol(orderInCurrency ? orderInCurrency : "INR") +
    "" +
    calculatedPrice.toFixed(2)
  );
};
export const calculateShippingCost = (
  cartItems,
  selectedAddress,
  shippingChargesList
) => {
  if (
    !selectedAddress ||
    !cartItems ||
    cartItems?.items?.length === 0 ||
    !shippingChargesList ||
    shippingChargesList.length === 0
  ) {
    return 0;
  }
  // finding shipping charges for selected country
  const shippingChargesForSelectedCountry = shippingChargesList.find(
    (item) => item.country === selectedAddress.country
  ).shippingCharges;

  //calculating allProductsWeightAndQuantity based on product weight and quantity  for each product
  let allProductsWeightAndQuantity = cartItems.map((item) => {
    let productWeight = item?.productAdditionalInfo?.weight;
    if (productWeight) {
      productWeight = productWeight.split("-")?.[0];
      return Number(productWeight) * Number(item.quantity);
    }
    return 0;
  });
  // calculating total weight
  allProductsWeightAndQuantity = allProductsWeightAndQuantity.reduce(
    (sum, item) => sum + item,
    0
  );
  //multiplying allProductsWeightAndQuantity with shippingChargesForSelectedCountry
  allProductsWeightAndQuantity = allProductsWeightAndQuantity
    ? allProductsWeightAndQuantity
    : 1;
  const totalShippingCost =
    allProductsWeightAndQuantity * shippingChargesForSelectedCountry;
  return totalShippingCost;
};

export const getCurrencySymbol = (currency) => {
  return currencySymbol[currency] || currency;
};
