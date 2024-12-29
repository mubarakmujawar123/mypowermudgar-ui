/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
// import UserCartItemsContent from "./UserCartItemsContent";
// import { calculateShippingCost, calculateTotalCartPrice } from "@/config/utils";
import UserCartItems from "./UserCartItems";

const UserCartWrapper = ({ cartItems, setOpenCartSheet, setOpenMenu }) => {
  const navigate = useNavigate();

  return (
    <SheetContent className="w-auto lg:max-w-lg overflow-auto">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <UserCartItems cartItems={cartItems} />

      <Button
        onClick={() => {
          navigate("/shop/checkout");
          setOpenCartSheet(false);
          setOpenMenu(false);
        }}
        disabled={cartItems.length === 0 ? true : false}
        className={`w-full mt-6 ${cartItems.length === 0 ? "hidden" : "block"}`}
      >
        Checkout
      </Button>
    </SheetContent>
  );
};

export default UserCartWrapper;
