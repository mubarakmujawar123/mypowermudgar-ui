/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useDispatch, useSelector } from "react-redux";
import CommonForm from "../common/CommonForm";
import { addressFormControls } from "@/config/config";
import { isFormValid } from "@/config/utils";
import {
  addAddress,
  deleteAddress,
  editAddress,
  fecthAllAddress,
} from "@/store/shop/shoppingAddressSlice";
import { useToast } from "@/hooks/use-toast";
import { AddressCard } from "./AddressCard";

const initialAddressFormData = {
  address: "",
  city: "",
  state: "",
  pincode: "",
  phone: "",
  country: "",
  notes: "",
  // isDefault: false,
};

const Address = ({ updateCurrentSelectedAddress, currentSelectedAddress }) => {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [localAddressFormControls, setLocalAddressFormControls] =
    useState(addressFormControls);
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);
  const { shippingChargesList } = useSelector((state) => state.shippingCharges);
  const { toast } = useToast();
  const dispatch = useDispatch();
  const handleManageAddress = (event) => {
    event.preventDefault();

    if (addressList.length >= 3 && !currentEditedId) {
      setFormData(initialAddressFormData);
      toast({ title: "You can add max 3 addresses", variant: "destructive" });
      return;
    }

    currentEditedId
      ? dispatch(
          editAddress({
            userId: user?.id,
            addressId: currentEditedId,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fecthAllAddress(user?.id));
            setCurrentEditedId(null);
            setFormData(initialAddressFormData);
            toast({ title: data.payload.message });
          }
        })
      : dispatch(addAddress({ userId: user?.id, ...formData })).then((data) => {
          if (data?.payload?.success) {
            setFormData(initialAddressFormData);
            dispatch(fecthAllAddress(user?.id));
            toast({ title: data.payload.message });
          }
        });
  };
  const handleEditAddress = (selectedAddress) => {
    setCurrentEditedId(selectedAddress?._id);
    setFormData({
      //...formData,
      address: selectedAddress?.address,
      city: selectedAddress?.city,
      state: selectedAddress?.state,
      pincode: selectedAddress?.pincode,
      phone: selectedAddress?.phone,
      country: selectedAddress?.country,
      notes: selectedAddress?.notes,
      // isDefault: selectedAddress?.isDefault,
    });
  };
  const handleDeleteAddress = (currentEditedId) => {
    dispatch(
      deleteAddress({
        userId: user?.id,
        addressId: currentEditedId,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fecthAllAddress(user?.id));
        toast({ title: data.payload.message });
      }
    });
  };

  useEffect(() => {
    if (user?.id) dispatch(fecthAllAddress(user?.id));
  }, [dispatch, user]);

  useEffect(() => {
    if (shippingChargesList) {
      const _listCountries = shippingChargesList.map((item) => ({
        label: item.country,
        value: item.country,
      }));
      let updatedObj = addressFormControls?.filter((item) => {
        if (item.name === "country") {
          item.options = _listCountries;
        }
        return item;
      });
      setLocalAddressFormControls(updatedObj);
    }
  }, [shippingChargesList, formData]);

  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 lg:grid-cols-3 lg gap-2">
        {addressList && addressList.length > 0
          ? addressList?.map((addressItem) => (
              <AddressCard
                key={addAddress._id}
                addressInfo={addressItem}
                handleEditAddress={handleEditAddress}
                handleDeleteAddress={handleDeleteAddress}
                currentSelectedAddress={currentSelectedAddress}
                updateCurrentSelectedAddress={updateCurrentSelectedAddress}
              />
            ))
          : null}
      </div>
      <CardHeader>
        <CardTitle>
          {currentEditedId === null ? "Add New Address" : "Edit Address"}
        </CardTitle>
        <CardContent className="space-y-3">
          <CommonForm
            formControls={localAddressFormControls}
            formData={formData}
            setFormData={setFormData}
            buttonText={currentEditedId === null ? "Add" : "Edit"}
            onSubmit={handleManageAddress}
            isFormValid={isFormValid(formData, localAddressFormControls)}
          />
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default Address;
