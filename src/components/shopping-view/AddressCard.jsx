/* eslint-disable react/prop-types */
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";

export const AddressCard = ({
  addressInfo,
  handleEditAddress,
  handleDeleteAddress,
  setCurrentSelectedAddress,
  selectedId,
}) => {
  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
      className={` cursor-pointer border-red-700 ${
        selectedId?._id === addressInfo?._id
          ? "border-red-900 boder-[4px"
          : "border-black"
      }`}
    >
      <CardContent className="grid p-4 gap-4">
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
