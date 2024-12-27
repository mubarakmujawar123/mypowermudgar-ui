import Loader from "@/components/common/Loader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchCartItems } from "@/store/shop/shoppingCartSlice";
import { capturePayment } from "@/store/shop/shoppingOrderSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentCapture = () => {
  const [isCapturePaymentDone, setIsCapturePaymentDone] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("token");
  const payerId = params.get("PayerID");

  useEffect(() => {
    if (paymentId && payerId) {
      const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));
      setCurrentOrderId(orderId);
      dispatch(capturePayment({ paymentId, payerId, orderId })).then((data) => {
        if (data?.payload?.success) {
          sessionStorage.removeItem("currentOrderId");
          setCurrentOrderId(null);
          setIsCapturePaymentDone(true);
        } else {
          setErrorMessage(data?.payload?.message);
        }
      });
    }
  }, [payerId, paymentId, dispatch]);

  useEffect(() => {
    if (isCapturePaymentDone && user?.id) {
      dispatch(fetchCartItems(user?.id));
    }
  }, [dispatch, user?.id, isCapturePaymentDone]);

  return (
    <>
      <Card className="p-10 w-96 m-10">
        {errorMessage ? (
          <>
            <CardHeader className="p-0">
              <CardTitle className="text-xl">{errorMessage}</CardTitle>
            </CardHeader>
            <CardDescription>
              {currentOrderId && (
                <>
                  Please keep this order Id <b>{currentOrderId}</b> for
                  refernece.
                </>
              )}
              <Button
                className="mt-5"
                onClick={() => navigate("/shop/listing")}
              >
                Keep shopping
              </Button>
            </CardDescription>
          </>
        ) : (
          <>
            {isCapturePaymentDone ? (
              <>
                <CardHeader className="p-0">
                  <CardTitle className="text-2xl">
                    Payment is successfull!
                  </CardTitle>
                </CardHeader>
                <Button
                  className="mt-5"
                  onClick={() => navigate("/shop/account")}
                >
                  View Orders
                </Button>
              </>
            ) : (
              <CardHeader>
                <CardTitle>Processing Payment...Please wait!</CardTitle>
              </CardHeader>
            )}
          </>
        )}
      </Card>
      {!errorMessage && !isCapturePaymentDone ? <Loader /> : null}
    </>
  );
};

export default PaymentCapture;
