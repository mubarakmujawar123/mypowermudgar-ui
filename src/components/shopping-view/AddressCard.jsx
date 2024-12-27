/* eslint-disable react/prop-types */
import { CircleCheck } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";

export const AddressCard = ({
  addressInfo,
  handleEditAddress,
  handleDeleteAddress,
  updateCurrentSelectedAddress,
  currentSelectedAddress,
}) => {
  return (
    <Card
      onClick={
        updateCurrentSelectedAddress
          ? () => updateCurrentSelectedAddress(addressInfo)
          : null
      }
      className={`cursor-pointer ${
        currentSelectedAddress?._id === addressInfo?._id
          ? "border-red-600 border-[4px]"
          : "border-black"
      }`}
    >
      <CardContent className="grid p-4 gap-4">
        <Label className="flex justify-end">
          {currentSelectedAddress?._id === addressInfo?._id ? (
            <CircleCheck color="green" />
          ) : null}
        </Label>
        <Label>Phone: {addressInfo?.phone}</Label>
        <Label>Address: {addressInfo?.address}</Label>
        <Label>City: {addressInfo?.city}</Label>
        <Label>Pincode: {addressInfo?.pincode}</Label>
        <Label>State: {addressInfo?.state}</Label>
        <Label>Country: {addressInfo?.country}</Label>
        <Label>Notes: {addressInfo?.notes}</Label>
      </CardContent>
      <CardFooter className="p-3 flex justify-between">
        <Button onClick={() => handleEditAddress(addressInfo)}>Edit</Button>
        <Button onClick={() => handleDeleteAddress(addressInfo?._id)}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};
