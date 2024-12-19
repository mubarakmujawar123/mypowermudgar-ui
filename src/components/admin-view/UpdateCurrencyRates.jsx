import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import {
  getCurrencyRates,
  getCurrencyRatesForAdmin,
  setCurrencyRates,
} from "@/store/auth-slice/currencyRateSlice";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

const UpdateCurrencyRates = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [currencyRatesInfo, setCurrencyRatesInfo] = useState(null);
  const updateCurrencyRatesHandler = () => {
    dispatch(getCurrencyRatesForAdmin()).then((data) => {
      if (data?.payload) {
        const rates = { INR: "1", ...data?.payload };
        toast({ title: "Currecny rates fetched !" });
        dispatch(setCurrencyRates({ rates })).then((info) => {
          if (info?.payload?.success) {
            toast({ title: info?.payload?.message });
          } else {
            toast({
              title: info?.payload?.message,
              variant: "destructive",
            });
          }
        });
      } else {
        toast({
          title: "Error while fetching currency rates",
          variant: "destructive",
        });
      }
    });
  };

  useEffect(() => {
    if (!currencyRatesInfo) {
      dispatch(getCurrencyRates()).then((data) => {
        if (data?.payload?.success) {
          toast({ title: data?.payload?.message });
          setCurrencyRatesInfo(data?.payload?.data);
        } else {
          toast({
            title: data?.payload?.message,
            variant: "destructive",
          });
        }
      });
    }
  }, []);
  return (
    <div className="flex justify-around">
      <div>
        <span className="font-bold">Currency Info</span>
        {currencyRatesInfo && currencyRatesInfo.rates && (
          <>
            <div className="flex gap-5">
              <div>Base Currency</div>
              <div>{currencyRatesInfo.base}</div>
            </div>
            <div className="flex gap-5">
              <div>Base Currency Amount</div>
              <div>{currencyRatesInfo.amount}</div>
            </div>
            {Object.keys(currencyRatesInfo.rates).map((key) => {
              return (
                <div className="flex gap-5" key={key}>
                  <div>{key}</div>
                  <div>{currencyRatesInfo.rates[key]}</div>
                </div>
              );
            })}
          </>
        )}
      </div>
      <Button onClick={updateCurrencyRatesHandler}>
        Update Currency Rates
      </Button>
    </div>
  );
};

export default UpdateCurrencyRates;