import Address from "@/components/shopping-view/Address";
import img from "../../assets/checkout.jpg";
import { useDispatch, useSelector } from "react-redux";
import { calculateShippingCost, calculateTotalCartPrice } from "@/config/utils";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { createNewOrder } from "@/store/shop/shoppingOrderSlice";
import UserCartItems from "@/components/shopping-view/UserCartItems";
import { payPalAcceptedCurrancies } from "@/config/constant";
import { useLocation, useNavigate } from "react-router-dom";

const Checkout = () => {
  const [isPaymentStart, setIsPaymentStart] = useState(false);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { currencyRateList } = useSelector((state) => state.currencyRate);
  const { user } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector((state) => state.shopOrder);
  const { toast } = useToast();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const totalCartAmount = calculateTotalCartPrice(cartItems?.items);
  const shippingCost = calculateShippingCost(cartItems?.items);

  const getInfoForPayPal = () => {
    const currencyForCheckout = payPalAcceptedCurrancies.includes(
      user?.preferredCurrency
    )
      ? user?.preferredCurrency
      : "USD";
    return {
      currencyForCheckout,
      currencyRateForCheckout: currencyRateList[currencyForCheckout],
    };
  };
  const handleInitiatePaypalPayment = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Your cart is empty. Please add items to proceed",
        variant: "destructive",
      });
      return;
    }
    if (currentSelectedAddress === null) {
      toast({
        title: "Please select one address to proceed.",
        variant: "destructive",
      });

      return;
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems?.items?.map((item) => ({
        productId: item?.productId,
        title: item?.title,
        category: item?.category,
        image: item?.image,
        productAdditionalInfo: item?.productAdditionalInfo,
        price: item?.salePrice > 0 ? item?.salePrice : item?.price,
        quantity: item?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
        state: currentSelectedAddress?.state,
        country: currentSelectedAddress?.country,
      },
      orderStatus: "PENDING",
      paymentMethod: "Paypal",
      paymentStatus: "PENDING",
      totalAmount: totalCartAmount,
      shippingCost: shippingCost,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      infoForPayPal: getInfoForPayPal(),
      orderInCurrency: user?.preferredCurrency,
      orderInCurrencyRate: currencyRateList[user?.preferredCurrency],
      paymentId: "",
      payerId: "",
    };
    console.log("orderData", orderData);
    dispatch(createNewOrder(orderData)).then((data) => {
      console.log("create order data", data);
      if (data?.payload?.success) {
        setIsPaymentStart(true);
      } else {
        toast({ title: data?.payload?.message, variant: "destructive" });
        setIsPaymentStart(false);
      }
    });
  };
  useEffect(() => {
    if (approvalURL) {
      window.location.href = approvalURL;
      if (isPaymentStart)
        window.history.pushState({ prevPage: "paypalOrderPage" }, null);
    }
  }, [approvalURL, isPaymentStart]);

  useEffect(() => {
    const prevPage = window?.history?.state?.prevPage;
    if (prevPage === "paypalOrderPage") {
      window.history.pushState(null, null);
      navigate("/shop/cancel-payment");
    }
  }, [window?.history?.state]);

  console.log("window.history", window.history);

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5 p-5">
        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />
        <div className="flex flex-col gap-4">
          {/* {cartItems && cartItems?.items?.length > 0
            ? cartItems?.items?.map((item) => (
                <UserCartItemsContent key={item._id} cartItem={item} />
              ))
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Items Total </span>
              <span className="font-bold">${totalCartAmount}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Shipping Charges</span>
              <span className="font-bold">${calculateShippingCost()}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Total Cart Price</span>
              <span className="font-bold">
                ${totalCartAmount + calculateShippingCost()}
              </span>
            </div>
          </div> */}
          <UserCartItems cartItems={cartItems.items} />
          <div className="mt-4 w-full">
            <Button
              onClick={handleInitiatePaypalPayment}
              className={`w-full ${
                !cartItems || cartItems?.items?.length === 0
                  ? "hidden"
                  : "block"
              }`}
              disabled={
                !cartItems || cartItems?.items?.length === 0 ? true : false
              }
            >
              {isPaymentStart
                ? "Processing Paypal Payment..."
                : "Checkout with Paypal"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
