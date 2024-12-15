/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { DialogContent, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { convertPriceForOrderPage, getConstantValue } from "@/config/utils";

const ShoppingOrderDetails = ({ orderDetails }) => {
  const { user } = useSelector((state) => state.auth);
  return (
    <DialogContent className="sm:max-w-[600px] overflow-auto h-auto max-h-[80vh]">
      {orderDetails ? (
        <>
          <DialogTitle>Order Information</DialogTitle>
          <div className="grid gap-6">
            <div className="grid gap-2">
              <div className="flex mt-6 items-center justify-between">
                <p className="font-medium">Order ID</p>
                <Label>{orderDetails?._id}</Label>
              </div>
              <div className="flex mt-2 items-center justify-between">
                <p className="font-medium">Order Date</p>
                <Label>{orderDetails?.orderDate?.split("T")[0]}</Label>
              </div>
              <div className="flex mt-2 items-center justify-between">
                <p className="font-medium">Order Price</p>
                <Label>
                  {convertPriceForOrderPage(
                    orderDetails?.totalAmount,
                    orderDetails?.orderInCurrency,
                    orderDetails?.orderInCurrencyRate
                  )}
                </Label>
              </div>
              <div className="flex mt-2 items-center justify-between">
                <p className="font-medium">Shipping Charges</p>
                <Label>
                  {convertPriceForOrderPage(
                    orderDetails?.shippingCost,
                    orderDetails?.orderInCurrency,
                    orderDetails?.orderInCurrencyRate
                  )}
                </Label>
              </div>
              <div className="flex mt-2 items-center justify-between">
                <p className="font-medium">Total Order Amount</p>
                <Label>
                  {convertPriceForOrderPage(
                    orderDetails?.totalAmount + orderDetails?.shippingCost,
                    orderDetails?.orderInCurrency,
                    orderDetails?.orderInCurrencyRate
                  )}
                </Label>
              </div>
              <div className="flex mt-2 items-center justify-between">
                <p className="font-medium">Payment method</p>
                <Label>{orderDetails?.paymentMethod}</Label>
              </div>
              <div className="flex mt-2 items-center justify-between">
                <p className="font-medium">Payment Status</p>
                <Label>{orderDetails?.paymentStatus}</Label>
              </div>
              <div className="flex mt-2 items-center justify-between">
                <p className="font-medium">Order Status</p>
                <Label
                  className={`py-1 px-3 ${
                    orderDetails?.orderStatus === "CONFIRMED"
                      ? "text-green-500"
                      : orderDetails?.orderStatus === "REJECTED" ||
                        orderDetails?.orderStatus === "CANCELLED"
                      ? "text-red-600"
                      : "text-black"
                  }`}
                >
                  {getConstantValue(orderDetails?.orderStatus)}
                </Label>
              </div>
            </div>
            <Separator />
            <div className="grid gap-4">
              <div className="grid gap-2">
                <div className="font-medium">Order Details</div>
                <div className="grid gap-3">
                  {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                    ? orderDetails?.cartItems.map((cartItem) => (
                        <div
                          key={cartItem.id}
                          className="flex items-center space-x-4 bg-gray-100 p-2"
                        >
                          <img
                            src={cartItem?.image}
                            alt={cartItem?.title}
                            className="w-20 h-20 rounded object-cover"
                          />
                          <div className="flex-1">
                            <div>
                              <span className="font-semibold">Category: </span>{" "}
                              {getConstantValue(cartItem?.category)}
                            </div>
                            <div className="">
                              <span className="font-semibold">Title: </span>{" "}
                              {cartItem?.title}
                            </div>
                            <div className="gap-2">
                              <span className="font-semibold">
                                Product Description:{" "}
                              </span>{" "}
                              {cartItem?.productAdditionalInfo
                                ? Object.keys(
                                    cartItem.productAdditionalInfo
                                  ).map((descriptionItem) => (
                                    <div
                                      key={descriptionItem}
                                    >{`${getConstantValue(
                                      descriptionItem
                                    )} : ${getConstantValue(
                                      cartItem?.productAdditionalInfo[
                                        descriptionItem
                                      ]
                                    )}`}</div>
                                  ))
                                : ""}
                            </div>
                            <div>
                              <span className="font-semibold">Quantity: </span>
                              {cartItem?.quantity}
                            </div>
                            <div>
                              <span className="font-semibold">Price: </span>
                              {convertPriceForOrderPage(
                                cartItem?.price,
                                orderDetails?.orderInCurrency,
                                orderDetails?.orderInCurrencyRate
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    : null}
                </div>
              </div>
            </div>
            <Separator />
            <div className="grid gap-1">
              <div className="font-thin italic">Note:</div>
              <div className="font-thin italic">
                Order price is based on product price, weight, quantity etc...
                <br />
                Total order amount is based on order price and shipping charges
              </div>
            </div>
            <Separator />
            <div className="grid gap-2">
              <div className="font-medium">Shipping Info</div>
              <div className="grid gap-0.5">
                <span>
                  <span className="font-semibold">User Name : </span>
                  {user.userName}
                </span>
                <span>
                  <span className="font-semibold">Phone : </span>
                  {orderDetails?.addressInfo?.phone}
                </span>
                <span>
                  <span className="font-semibold">Email : </span>
                  {user?.email}
                </span>
                <span>
                  <span className="font-semibold">Address : </span>
                  {orderDetails?.addressInfo?.address}
                </span>
                <span>
                  <span className="font-semibold">City : </span>
                  {orderDetails?.addressInfo?.city}
                </span>
                <span>
                  <span className="font-semibold">Pincode : </span>
                  {orderDetails?.addressInfo?.pincode}
                </span>
                <span>
                  <span className="font-semibold">State : </span>
                  {orderDetails?.addressInfo?.state}
                </span>
                <span>
                  <span className="font-semibold">Country : </span>
                  {orderDetails?.addressInfo?.country}
                </span>
                <span>
                  <span className="font-semibold">Note : </span>
                  {orderDetails?.addressInfo?.notes}
                </span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <DialogTitle>Order not found!</DialogTitle>
      )}
    </DialogContent>
  );
};

export default ShoppingOrderDetails;
