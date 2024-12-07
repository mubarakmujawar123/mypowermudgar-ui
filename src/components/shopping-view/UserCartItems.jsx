/* eslint-disable react/prop-types */
import {
  calculateShippingCost,
  calculateTotalCartPrice,
  convertPrice,
} from "@/config/utils";
import UserCartItemsContent from "./UserCartItemsContent";

const UserCartItems = ({ cartItems }) => {
  const totalCartAmount = calculateTotalCartPrice(cartItems);
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
          <span className="font-bold">{convertPrice(totalCartAmount)}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold">Shipping Charges</span>
          <span className="font-bold">
            {convertPrice(calculateShippingCost())}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold">Total Cart Price</span>
          <span className="font-bold">
            {convertPrice(totalCartAmount + calculateShippingCost())}
          </span>
        </div>
      </div>
    </>
  );
};

export default UserCartItems;
