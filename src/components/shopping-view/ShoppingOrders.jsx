import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import ShoppingOrderDetails from "./ShoppingOrderDetails";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersByUserId,
  getOrderDetails,
  resetOrderDetails,
} from "@/store/shop/shoppingOrderSlice";
import { convertPriceForOrderPage } from "@/config/utils";

const ShoppingOrders = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.shopOrder);
  console.log("orderDetails 1", orderDetails);
  const dispatch = useDispatch();

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetails(getId));
  }

  useEffect(() => {
    dispatch(getAllOrdersByUserId(user?.id));
  }, [dispatch, user?.id]);

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>Shipping Charges</TableHead>
              {/* <TableHead>Payment Status</TableHead> */}
              <TableHead>
                <span className="sr-only">Details </span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList && orderList.length > 0 ? (
              orderList.map((orderItem) => (
                <TableRow key={orderItem?._id}>
                  <TableCell>{orderItem?._id}</TableCell>
                  <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>
                  <TableCell
                    className={`p-2 ${
                      orderItem?.orderStatus === "CONFIRMED"
                        ? "text-green-600"
                        : orderItem?.orderStatus === "REJECTED"
                        ? "text-red-600"
                        : "text-black"
                    }`}
                  >
                    {orderItem?.orderStatus}
                  </TableCell>
                  <TableCell>
                    {convertPriceForOrderPage(
                      orderItem?.totalAmount,
                      orderItem?.orderInCurrency,
                      orderItem?.orderInCurrencyRate
                    )}
                  </TableCell>
                  <TableCell>
                    {convertPriceForOrderPage(
                      orderItem?.shippingCost,
                      orderItem?.orderInCurrency,
                      orderItem?.orderInCurrencyRate
                    )}
                  </TableCell>
                  {/* <TableCell>{orderItem?.paymentStatus}</TableCell> */}
                  <TableCell className="flex justify-end">
                    <Button
                      onClick={() => {
                        setIsModalOpen(true);
                        handleFetchOrderDetails(orderItem?._id);
                      }}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <>No orders found!</>
            )}
          </TableBody>
        </Table>
        {isModalOpen ? (
          <Dialog
            open={openDetailsDialog}
            onOpenChange={() => {
              dispatch(resetOrderDetails());
              setOpenDetailsDialog(false);
            }}
          >
            <ShoppingOrderDetails orderDetails={orderDetails} />
          </Dialog>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default ShoppingOrders;
