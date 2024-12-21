import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import AdminOrderDetailsView from "./AdminOrderDetailsView";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderDetailsForAdmin,
  getOrdersOfAllUsers,
  resetAdminOrderDetails,
} from "@/store/admin/orderSlice";
import { getConstantValue } from "@/config/utils";
import { currencySymbol } from "@/config/constant";

const AdminOrders = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
  const handleFetchOrderDetails = (getId) => {
    dispatch(getOrderDetailsForAdmin(getId));
  };

  useEffect(() => {
    dispatch(getOrdersOfAllUsers());
  }, [dispatch]);

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
              <TableHead>Total Order Amount</TableHead>
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
                        : orderItem?.orderStatus === "REJECTED" ||
                          orderItem?.orderStatus === "CANCELLED"
                        ? "text-red-600"
                        : "text-black"
                    }`}
                  >
                    {getConstantValue(orderItem?.orderStatus)}
                  </TableCell>
                  <TableCell>
                    {currencySymbol["INR"]}
                    {orderItem?.totalAmount.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    {currencySymbol["INR"]}
                    {orderItem?.shippingCost.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    {currencySymbol["INR"]}
                    {(orderItem?.totalAmount + orderItem?.shippingCost).toFixed(
                      2
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
              dispatch(resetAdminOrderDetails());
              setOpenDetailsDialog(false);
            }}
          >
            <AdminOrderDetailsView
              orderDetails={orderDetails}
              setOpenDetailsDialog={setOpenDetailsDialog}
            />
          </Dialog>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default AdminOrders;
