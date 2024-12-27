/* eslint-disable react/prop-types */
import {
  calculateShippingCost,
  // calculateTotalCartPrice,
  calculateTotalCartPriceWithPreferredCurrency,
  convertPrice,
  getCurrencySymbol,
} from "@/config/utils";
import UserCartItemsContent from "./UserCartItemsContent";
import { useSelector } from "react-redux";

const UserCartItems = ({ cartItems }) => {
  // const totalCartAmount = calculateTotalCartPrice(cartItems);
  const { user } = useSelector((state) => state.auth);
  const totalCartPriceWithPreferredCurrency =
    calculateTotalCartPriceWithPreferredCurrency(cartItems);
  const { selectedAddress } = useSelector((state) => state.shopAddress);
  const { shippingChargesList } = useSelector((state) => state.shippingCharges);

  if (cartItems && cartItems.length === 0) {
    return <div>Your cart is empty!</div>;
  }
  return (
    <>
      <div className="mt-8 space-y-4">
        {cartItems && cartItems.length > 0
          ? cartItems.map((item, index) => (
              <UserCartItemsContent
                key={`${item.productId}-${index}`}
                cartItem={item}
              />
            ))
          : null}
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Items Total </span>
          <span className="font-bold">
            {getCurrencySymbol(user?.preferredCurrency ?? "INR")}
            {totalCartPriceWithPreferredCurrency.toFixed(2)}
          </span>
        </div>
        {selectedAddress ? (
          <div className="flex justify-between">
            <span className="font-bold">Shipping Charges</span>
            <span className="font-bold">
              {convertPrice(
                calculateShippingCost(
                  cartItems,
                  selectedAddress,
                  shippingChargesList
                )
              )}
            </span>
          </div>
        ) : null}
        <div className="flex justify-between">
          <span className="font-bold">Total Cart Price</span>
          <span className="font-bold">
            {getCurrencySymbol(user?.preferredCurrency ?? "INR")}
            {(
              Number(totalCartPriceWithPreferredCurrency.toFixed(2)) +
              Number(
                convertPrice(
                  calculateShippingCost(
                    cartItems,
                    selectedAddress,
                    shippingChargesList
                  ),
                  false,
                  true
                )
              )
            ).toFixed(2)}
          </span>
        </div>
      </div>
    </>
  );
};

export default UserCartItems;
