import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const PaymentCancle = () => {
  const navigate = useNavigate();
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
