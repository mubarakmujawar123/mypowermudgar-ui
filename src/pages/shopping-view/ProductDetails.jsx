/* eslint-disable react-hooks/exhaustive-deps */
import CommonForm from "@/components/common/CommonForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { addProducToCartElements } from "@/config/config";
import {
  calculateItemPrice,
  convertPrice,
  getConstantValue,
  isFormValid,
} from "@/config/utils";
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
  const [formData, setFormData] = useState(initialAddProductToCartData);
  const [formElements, setFormElements] = useState(addProducToCartElements);
  const { toast } = useToast();

  const onSubmit = (event) => {
    event.preventDefault();
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
        basePrice:
          selectedProduct?.salePrice > 0
            ? selectedProduct?.salePrice
            : selectedProduct?.price,
        productAdditionalInfo: restFormData,
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
              label: getConstantValue(ele),
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
        <h2 className="font-semibold text-3xl">{selectedProduct?.title}</h2>
        {selectedProduct?.salePrice > 0 ? (
          <Badge className="font-medium bg-black hover:bg-black mb-3 mt-3">
            Sale
          </Badge>
        ) : null}
        <div className="w-6/12 flex items-center mb-3">
          <span className="text-2xl font-semibold flex items-center">
            <div className="text-lg">Price: </div>
            <div>
              {selectedProduct?.salePrice > 0
                ? convertPrice(
                    calculateItemPrice(
                      selectedProduct?.salePrice,
                      formData.quantity,
                      formData
                    )
                  )
                : convertPrice(
                    calculateItemPrice(
                      selectedProduct?.price,
                      formData.quantity,
                      formData
                    )
                  )}
            </div>
          </span>
          <span className="text-sm text-primary self-end ml-1">
            {/* <div>Price</div> */}
            {selectedProduct?.salePrice > 0 ? (
              <div
                className={`${
                  selectedProduct?.salePrice > 0 ? "line-through" : ""
                }`}
              >
                {convertPrice(
                  calculateItemPrice(
                    selectedProduct?.price,
                    formData.quantity,
                    formData
                  )
                )}
              </div>
            ) : null}
          </span>
        </div>
        <p className="mb-2">
          Category : {getConstantValue(selectedProduct?.category)}
        </p>
        <div className="w-6/12">
          <CommonForm
            hideSubmitButton={!user?.id ? true : false}
            buttonText={"Add To Cart"}
            formData={formData}
            setFormData={setFormData}
            onSubmit={onSubmit}
            formControls={formElements}
            isFormValid={isFormValid(formData, formElements)}
          />
        </div>
        <p className="mt-5 mb-5 text-lg">{selectedProduct?.description}</p>
      </div>
    </div>
  );
};
