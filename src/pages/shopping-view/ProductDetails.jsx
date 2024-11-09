/* eslint-disable react-hooks/exhaustive-deps */
import CommonForm from "@/components/common/CommonForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { addProducToCartElements, optionsMap } from "@/config/config";
import { isFormValid } from "@/config/utils";
import { useToast } from "@/hooks/use-toast";
import { addToCart, fetchCartItems } from "@/store/shop/shoppingCartSlice";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const initialAddProductToCartData = {
  woodType: "",
  height: "",
  weight: "",
  quantity: 1,
};

export const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedProduct = location?.state.product;
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [formData, setFormData] = useState(initialAddProductToCartData);
  const [formElements, setFormElements] = useState(addProducToCartElements);
  const { toast } = useToast();
  const onSubmit = (event) => {
    event.preventDefault();
    console.log("formData", formData);
    const { quantity, ...restFormData } = formData;
    // let getCartsItems = cartItems.items || [];
    if (!user?.id) {
      return navigate("/auth/login");
    }
    dispatch(
      addToCart({
        userId: user?.id,
        productId: selectedProduct?._id,
        quantity: quantity,
        productDescription: restFormData,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({ title: data?.payload?.message });
      }
    });
  };

  useEffect(() => {
    /**
     * checking option list for fields selected product, if present we are showing option in respective fields, and if option contains 0 then not
     * showing field as fields not applicable, and accordingly updating form data initial state
     */
    const updatedFormElements = formElements.map((element) => {
      Object.keys(selectedProduct).forEach((item) => {
        const objItem = selectedProduct[item];
        if (objItem && Array.isArray(objItem)) {
          if (element.name === item && objItem.includes("0")) {
            element.hidden = true;
          }
          if (element.name === item && !objItem.includes("0")) {
            element.hidden = false;
            element.options = objItem.map((ele) => ({
              id: ele,
              label: optionsMap[ele],
            }));
          }
        }
      });
      return element;
    });
    let updatedProductToCartData = {};
    updatedFormElements.forEach((item) => {
      if (item.name && !item.hidden) {
        updatedProductToCartData[item.name] =
          initialAddProductToCartData[item.name];
      }
    });
    setFormElements(updatedFormElements);
    setFormData(updatedProductToCartData);
  }, [selectedProduct, location]);

  //   console.log("location", selectedProduct);
  return (
    <div className="w-9/12 mx-auto flex justify-center">
      <Button
        type="button"
        variant="outline"
        onClick={() => navigate(-1)}
        className="m-5"
      >
        <ArrowLeft className="mr-2" />
        Back
      </Button>
      <div className="m-5 w-6/12">
        <img
          className="object-cover"
          src={selectedProduct?.image}
          height="500"
          width="500"
        />
      </div>
      <div className="m-5 w-6/12">
        <h3 className="text-xl italic font-light">
          {optionsMap[selectedProduct?.category]}
        </h3>
        <h2 className="font-semibold text-3xl">{selectedProduct?.title}</h2>
        {selectedProduct?.salePrice > 0 ? (
          <Badge className="font-medium bg-black hover:bg-black mb-3 mt-3">
            Sale
          </Badge>
        ) : null}
        <div className="w-6/12 flex justify-between items-center mb-3">
          {selectedProduct?.salePrice > 0 ? (
            <span className="text-lg">
              <div>Sale Price</div>
              <div>{selectedProduct?.salePrice}</div>
            </span>
          ) : null}
          <span className="text-lg text-primary">
            <div>Price</div>
            <div
              className={`${
                selectedProduct?.salePrice > 0 ? "line-through" : ""
              }`}
            >
              {selectedProduct?.price}
            </div>
          </span>
        </div>
        <p className="mt-5 mb-5 text-lg">{selectedProduct?.description}</p>

        <div className="w-6/12">
          <CommonForm
            buttonText={"Add To Cart"}
            formData={formData}
            setFormData={setFormData}
            onSubmit={onSubmit}
            formControls={formElements}
            isFormValid={isFormValid(formData, formElements)}
          />
        </div>
      </div>
    </div>
  );
};
