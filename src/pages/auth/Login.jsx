import CommonForm from "@/components/common/CommonForm";
import { loginFormControls } from "@/config/config";
import { isFormValid } from "@/config/utils";
import { useToast } from "@/hooks/use-toast";
import { loginUser } from "@/store/auth-slice/authSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser(formData)).then((data) => {
      console.log(data);
      if (data.payload.success) {
        toast({
          title: data.payload.message,
        });
      } else {
        toast({
          title: data.payload.message,
          variant: "destructive",
        });
      }
    });
  };
  console.log("formData", formData);
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign In to your account
        </h1>
        <p className="mt-2">
          Don&apos;t have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
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
        isFormValid={isFormValid(formData)}
      />
    </div>
  );
};

export default Login;
