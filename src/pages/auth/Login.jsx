import CommonForm from "@/components/common/CommonForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginFormControls, resetPasswordFormControls } from "@/config/config";
import { isFormValid } from "@/config/utils";
import { useToast } from "@/hooks/use-toast";
import {
  getResetPasswordOTP,
  loginUser,
  updatePassword,
} from "@/store/auth-slice/authSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import OTPVerification from "./OTPVerification";
const initialState = {
  email: "",
  password: "",
};
const resetPasswordForminitialState = {
  newPassword: "",
};

const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const [resetPasswordFormData, setResetPasswordFormData] = useState(
    resetPasswordForminitialState
  );
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [isResetPasswordOTPVerified, setIsResetPasswordOTPVerified] =
    useState(false);
  const [emailForResetPassword, setEmailForResetPassword] = useState("");
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { userIdForEmailVerification } = useSelector((state) => state.auth);

  const resetAllStateForResetPassword = () => {
    setIsResetPasswordOTPVerified(false);
    setIsOTPSent(false);
    setEmailForResetPassword("");
    setIsResetPassword(false);
    setFormData(initialState);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data.payload.message,
        });
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
        if (data?.payload?.message !== "Something went wrong!") {
          //sending OPT to verify account if account not verified and navigati
          if (userIdForEmailVerification) {
            navigate("/auth/otpVerification");
          }
        }
      }
    });
  };

  const onUpdatePasswordSubmit = (event) => {
    event.preventDefault();
    console.log(
      "isOTPSent, isResetPasswordOTPVerified",
      isOTPSent,
      isResetPasswordOTPVerified
    );
    if (isOTPSent && isResetPasswordOTPVerified) {
      console.log(
        "resetPasswordFormData.newPassword",
        resetPasswordFormData.newPassword,
        resetPasswordFormData.reEnterNewpassword
      );
      if (
        resetPasswordFormData.newPassword !==
        resetPasswordFormData.reEnterNewpassword
      ) {
        toast({
          title: "Password dose not matched!",
          variant: "destructive",
        });
        return;
      }
      dispatch(
        updatePassword({
          email: emailForResetPassword,
          newPassword: resetPasswordFormData.newPassword,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          toast({
            title: data.payload.message,
          });
          resetAllStateForResetPassword();
        } else {
          toast({
            title: data?.payload?.message,
            variant: "destructive",
          });
        }
      });
    }
  };

  const resetPasswordOTPHandler = (e) => {
    e.preventDefault();
    console.log(emailForResetPassword);
    if (!isOTPSent) {
      dispatch(getResetPasswordOTP({ email: emailForResetPassword })).then(
        (data) => {
          if (data?.payload?.success) {
            toast({
              title: data.payload.message,
            });
            setIsOTPSent(true);
          } else {
            toast({
              title: data?.payload?.message,
              variant: "destructive",
            });
          }
        }
      );
    }
  };
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      {!isResetPassword ? (
        <>
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Sign In to your account
            </h1>
            <p className="mt-2">
              Don&apos;t have an account
              <Link
                className="font-medium ml-2 text-blue-500 underline cursor-pointer"
                to="/auth/register"
              >
                Register
              </Link>
            </p>
          </div>
          <CommonForm
            formControls={loginFormControls}
            buttonText={"Sign In"}
            formData={formData}
            setFormData={setFormData}
            onSubmit={onSubmit}
            isFormValid={isFormValid(formData, loginFormControls)}
          />
          <div
            className="text-blue-500 underline cursor-pointer"
            onClick={() => setIsResetPassword(true)}
          >
            Forgot Password
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-3">
          <form onSubmit={resetPasswordOTPHandler}>
            <div className="grid w-full gap-1.5">
              <label htmlFor="emailForResetPassword">
                Enter your register email to get OTP for reset password.
              </label>
              <Input
                name="emailForResetPassword"
                placeholder="Enter your register email."
                id="emailForResetPassword"
                type="email"
                value={emailForResetPassword}
                disabled={isOTPSent}
                onChange={(event) => {
                  setEmailForResetPassword(event.target.value);
                }}
              />
              {!isOTPSent && !isResetPasswordOTPVerified ? (
                <Button
                  disabled={!emailForResetPassword}
                  className="mt-5 w-full"
                  type="submit"
                  // onClick={(e) => forgotPasswordSubmitHandler(e)}
                >
                  Submit
                </Button>
              ) : null}
            </div>
          </form>

          {isOTPSent && !isResetPasswordOTPVerified ? (
            <OTPVerification
              isForResetPassword={true}
              setIsResetPasswordOTPVerified={setIsResetPasswordOTPVerified}
              emailForResetPassword={emailForResetPassword}
              resetAllStateForResetPassword={resetAllStateForResetPassword}
            />
          ) : (
            <>
              {isResetPasswordOTPVerified ? (
                <CommonForm
                  formControls={resetPasswordFormControls}
                  buttonText={"Submit"}
                  formData={resetPasswordFormData}
                  setFormData={setResetPasswordFormData}
                  onSubmit={onUpdatePasswordSubmit}
                  isFormValid={isFormValid(
                    resetPasswordFormData,
                    resetPasswordFormControls
                  )}
                />
              ) : null}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Login;
