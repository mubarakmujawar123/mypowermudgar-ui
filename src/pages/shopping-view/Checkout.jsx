import Address from "@/components/shopping-view/Address";
import img from "../../assets/checkout.jpeg";
import { useDispatch, useSelector } from "react-redux";
import {
  calculateShippingCost,
  calculateTotalCartPrice,
  calculateTotalCartPriceWithPreferredCurrency,
} from "@/config/utils";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { createNewOrder } from "@/store/shop/shoppingOrderSlice";
import UserCartItems from "@/components/shopping-view/UserCartItems";
import { payPalAcceptedCurrancies } from "@/config/constant";
import { useNavigate } from "react-router-dom";
import { updateSelectedAddress } from "@/store/shop/shoppingAddressSlice";

const Checkout = () => {
  const [isPaymentStart, setIsPaymentStart] = useState(false);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { currencyRateList } = useSelector((state) => state.currencyRate);
  const { shippingChargesList } = useSelector((state) => state.shippingCharges);
  const { user } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector((state) => state.shopOrder);
  const { selectedAddress } = useSelector((state) => state.shopAddress);
  const { toast } = useToast();
  const dispatch = useDispatch();
  // const location = useLocation();
  const navigate = useNavigate();

  const totalCartAmount = calculateTotalCartPrice(cartItems?.items);
  const totalCartPriceWithPreferredCurrency =
    calculateTotalCartPriceWithPreferredCurrency(cartItems?.items);
  const shippingCost = calculateShippingCost(
    cartItems?.items,
    selectedAddress,
    shippingChargesList
  );

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
      totalAmount: totalCartAmount.toFixed(2),
      totalCartPriceWithPreferredCurrency:
        totalCartPriceWithPreferredCurrency.toFixed(2),
      shippingCost: shippingCost.toFixed(2),
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      infoForPayPal: getInfoForPayPal(),
      orderInCurrency: user?.preferredCurrency,
      orderInCurrencyRate: currencyRateList[user?.preferredCurrency],
      paymentId: "",
      payerId: "",
    };
    dispatch(createNewOrder(orderData)).then((data) => {
      if (data?.payload?.success) {
        setIsPaymentStart(true);
      } else {
        toast({ title: data?.payload?.message, variant: "destructive" });
        setIsPaymentStart(false);
      }
    });
  };

  const updateCurrentSelectedAddress = (addressInfo) => {
    setCurrentSelectedAddress(addressInfo);
    dispatch(updateSelectedAddress(addressInfo));
  };

  useEffect(() => {
    if (approvalURL) {
      window.location.href = approvalURL;
    }
  }, [approvalURL]);

  useEffect(() => {
    if (approvalURL && isPaymentStart) {
      window.history.pushState({ prevPage: "paypalOrderPage" }, null);
    }
  }, [isPaymentStart]);

  useEffect(() => {
    const prevPage = window?.history?.state?.prevPage;
    if (prevPage === "paypalOrderPage") {
      window.history.pushState(null, null);
      navigate("/shop/cancel-payment");
    }
  }, [window?.history?.state]);

  useEffect(() => {
    if (selectedAddress) {
      setCurrentSelectedAddress(selectedAddress);
    }
  }, [selectedAddress]);

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5 p-5">
        <Address
          currentSelectedAddress={currentSelectedAddress}
          updateCurrentSelectedAddress={updateCurrentSelectedAddress}
        />
        <div className="flex flex-col gap-4">
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
                !cartItems || cartItems?.items?.length === 0 || !selectedAddress
                  ? true
                  : false
              }
            >
              {isPaymentStart
                ? "Processing Paypal Payment..."
                : "Checkout with Paypal"}
            </Button>
            {cartItems && cartItems?.items?.length > 0 && !selectedAddress ? (
              <div className="text-lg mt-2 text-red-600">
                Select delivery address to proceed.
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
