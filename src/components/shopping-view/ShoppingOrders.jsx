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
  getInvoice,
  getOrderDetails,
  resetOrderDetails,
} from "@/store/shop/shoppingOrderSlice";
import { convertPriceForOrderPage, getCurrencySymbol } from "@/config/utils";
import { ArrowDownToLine } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ShoppingOrders = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.shopOrder);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleFetchOrderDetails = (getId) => {
    dispatch(getOrderDetails(getId));
  };
  const generateInvoiceHandler = (orderId) => {
    dispatch(getInvoice(orderId)).then((data) => {
      if (data.payload) {
        const blob = new Blob([data.payload], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");

        //to direct download
        // const link = document.createElement("a");
        // link.href = URL.createObjectURL(blob);
        // link.download = "invoice.pdf";
        // document.body.appendChild(link);
        // link.click();
        // link.remove();
      } else {
        toast({
          title: "Error in download Invoice!",
          variant: "destructive",
        });
      }
    });
  };

  useEffect(() => {
    if (user?.id) dispatch(getAllOrdersByUserId(user?.id));
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
              <TableHead>Total Order Amount</TableHead>
              <TableHead>Invoice</TableHead>
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
                        : orderItem?.orderStatus === "REJECTED" ||
                          orderItem?.orderStatus === "CANCELLED"
                        ? "text-red-600"
                        : "text-black"
                    }`}
                  >
                    {orderItem?.orderStatus}
                  </TableCell>
                  <TableCell>
                    {getCurrencySymbol(orderItem?.orderInCurrency)}
                    {orderItem?.totalCartPriceWithPreferredCurrency.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    {convertPriceForOrderPage(
                      orderItem?.shippingCost,
                      orderItem?.orderInCurrency,
                      orderItem?.orderInCurrencyRate
                    )}
                  </TableCell>
                  <TableCell>
                    {getCurrencySymbol(orderItem?.orderInCurrency)}
                    {(
                      Number(orderItem?.totalCartPriceWithPreferredCurrency) +
                      Number(
                        convertPriceForOrderPage(
                          orderItem?.shippingCost,
                          orderItem?.orderInCurrency,
                          orderItem?.orderInCurrencyRate,
                          true
                        )
                      )
                    ).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        generateInvoiceHandler(orderItem?._id);
                      }}
                    >
                      <ArrowDownToLine />
                    </Button>
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
