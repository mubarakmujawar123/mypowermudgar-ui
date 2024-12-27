/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";
import {
  resendOTP,
  resetUserIdForEmailVerification,
  verifyAccount,
  verifyResetPasswordOTP,
} from "@/store/auth-slice/authSlice";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OTPVerification = ({
  isForResetPassword = false,
  emailForResetPassword = null,
  setIsResetPasswordOTPVerified = null,
  resetAllStateForResetPassword = null,
}) => {
  const [value, setValue] = useState("");
  console.log("in otp");
  // const [showResendButton, setShowResendButton] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { userIdForEmailVerification } = useSelector((state) => state.auth);

  const submitOTP = (e) => {
    e.preventDefault();
    if (!value || value.length < 6) {
      toast({ title: "Please enter valid OTP!", variant: "destructive" });
      return;
    }
    if (!isForResetPassword) {
      dispatch(
        verifyAccount({ id: userIdForEmailVerification, otp: value })
      ).then((data) => {
        if (data?.payload?.success) {
          toast({
            title: data?.payload?.message,
          });
          navigate("/auth/login");
        } else {
          toast({
            title: data?.payload?.message,
            variant: "destructive",
          });
        }
      });
    } else {
      dispatch(
        verifyResetPasswordOTP({ email: emailForResetPassword, otp: value })
      ).then((data) => {
        if (data?.payload?.success) {
          toast({
            title: data?.payload?.message,
          });
          setIsResetPasswordOTPVerified(true);
        } else {
          toast({
            title: data?.payload?.message,
            variant: "destructive",
          });
        }
      });
    }
  };

  const otpCancelHandler = (e) => {
    e.preventDefault();
    if (isForResetPassword) {
      resetAllStateForResetPassword();
    } else {
      dispatch(resetUserIdForEmailVerification());
      navigate(-1);
    }
  };
  const resendOTPHandler = (e) => {
    e.preventDefault();
    if (userIdForEmailVerification) {
      dispatch(resendOTP({ id: userIdForEmailVerification })).then((data) => {
        if (data?.payload?.success) {
          toast({
            title: data?.payload?.message,
          });
        } else {
          toast({
            title: data?.payload?.message,
            variant: "destructive",
          });
        }
      });
    } else {
      toast({
        title: "No user found!",
        variant: "destructive",
      });
    }
  };
  return (
    <div>
      <label className="mb-8">One-Time Password</label>
      <InputOTP
        maxLength={6}
        value={value}
        onChange={(value) => setValue(value)}
        pattern={REGEXP_ONLY_DIGITS}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <div className="mt-1">
        Please enter the one-time password sent to your register email. <br />
        Valid for {isForResetPassword ? 5 : 30} Mins. If OTP not recived or
        invalid OTP.
      </div>
      <div className="mt-5 flex gap-3">
        <Button onClick={(e) => submitOTP(e)}>Submit</Button>
        {!isForResetPassword ? (
          <Button onClick={(e) => resendOTPHandler(e)}>Resend OTP</Button>
        ) : null}
        <Button onClick={(e) => otpCancelHandler(e)}>Cancel</Button>
      </div>
    </div>
  );
};

export default OTPVerification;
