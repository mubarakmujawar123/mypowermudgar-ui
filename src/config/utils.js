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

export const calculateItemPrice = (
  basePrice,
  quantity,
  productAdditionalInfo
) => {
  let finalPrice = basePrice * Number(quantity);

  let productWeight = productAdditionalInfo?.weight;
  if (productWeight) {
    if (productWeight.includes("-")) {
      productWeight = productWeight.split("-")?.[0];
    }

    finalPrice = finalPrice * Number(productWeight);
  }
  finalPrice = finalPrice.toFixed(2);
  return finalPrice;
};

export const getConstantValue = (key) => {
  return constantMap[key] ?? key;
};

export const convertPrice = (price, isForPaypalOrder = false) => {
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
  return (
    getCurrencySymbol(preferredCurrency ? preferredCurrency : "INR") +
    "" +
    Number(calculatedPrice).toFixed(2)
  );
};

export const convertPriceForOrderPage = (
  price,
  orderInCurrency,
  orderInCurrencyRate
) => {
  let calculatedPrice = Number(price);
  if (orderInCurrencyRate && orderInCurrency) {
    calculatedPrice = calculatedPrice * Number(orderInCurrencyRate);
  }
  return (
    getCurrencySymbol(orderInCurrency ? orderInCurrency : "INR") +
    "" +
    calculatedPrice.toFixed(2)
  );
};
export const calculateShippingCost = (cartItems) => {
  return 10;
};

export const getCurrencySymbol = (currency) => {
  return currencySymbol[currency] || currency;
};
