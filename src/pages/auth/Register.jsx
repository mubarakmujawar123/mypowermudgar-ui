import CommonForm from "@/components/common/CommonForm";
import { registerFormControls } from "@/config/config";
import { isFormValid } from "@/config/utils";
import { useToast } from "@/hooks/use-toast";
import { registerUser } from "@/store/auth-slice/authSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
const initialState = {
  userName: "",
  email: "",
  password: "",
  preferredCurrency: "",
};
const Register = () => {
  const { preferredCurrencyList } = useSelector((state) => state.currencyRate);
  const [formData, setFormData] = useState(initialState);
  const [registerFormControlsFields, setRegisterFormControlsFields] =
    useState(registerFormControls);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const onSubmit = (event) => {
    console.log("formdata", formData);
    event.preventDefault();
    if (formData.password !== formData.reEnterpassword) {
      toast({
        title: "Password dose not matched!",
        variant: "destructive",
      });
      return;
    }
    dispatch(registerUser(formData)).then((data) => {
      console.log(data);
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
  };
  useEffect(() => {
    if (preferredCurrencyList && preferredCurrencyList.length > 0) {
      const dummyRegisterFormControlsFields = registerFormControlsFields.map(
        (item) => {
          if (item.name === "preferredCurrency") {
            item.options = preferredCurrencyList;
          }
          return item;
        }
      );
      setRegisterFormControlsFields(dummyRegisterFormControlsFields);
    }
  }, [preferredCurrencyList]);

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
        <p className="mt-2">
          Already have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControlsFields}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        isFormValid={isFormValid(formData, registerFormControlsFields)}
      />
    </div>
  );
};

export default Register;
