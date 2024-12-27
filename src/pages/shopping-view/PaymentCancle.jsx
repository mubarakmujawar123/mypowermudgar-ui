import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { canclePayment } from "@/store/shop/shoppingOrderSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const PaymentCancle = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));

  useEffect(() => {
    if (orderId) {
      dispatch(canclePayment({ orderId })).then((data) => {
        if (data?.payload?.success) {
          sessionStorage.removeItem("currentOrderId");
          toast({ title: data?.payload?.message, variant: "destructive" });
        } else {
          toast({ title: data?.payload?.message, variant: "destructive" });
        }
      });
    }
  }, [orderId, dispatch]);

  return (
    <Card className="p-10 w-96 m-10">
      <CardHeader className="p-0">
        <CardTitle className="text-2xl">Payment canceled!</CardTitle>
      </CardHeader>
      <CardDescription className="text-xl text-foreground">
        Please visit checkout page to order it again.
      </CardDescription>
      <Button className="mt-5" onClick={() => navigate("/shop/checkout")}>
        Checkout
      </Button>
    </Card>
  );
};

export default PaymentCancle;
