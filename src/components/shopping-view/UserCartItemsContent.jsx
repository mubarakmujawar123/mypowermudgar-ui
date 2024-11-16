import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { optionsMap } from "@/config/config";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartItem,
  updateCartQuantity,
} from "@/store/shop/shoppingCartSlice";
import { useToast } from "@/hooks/use-toast";

/* eslint-disable react/prop-types */
const UserCartItemsContent = ({ cartItem }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();
  const handleUpdateQuantity = (cartItem, typeOfAction) => {
    dispatch(
      updateCartQuantity({
        userId: user?.id,
        productId: cartItem?.productId,
        productDescription: cartItem?.productDescription,
        quantity:
          typeOfAction === "plus"
            ? cartItem?.quantity + 1
            : cartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({ title: data.payload.message });
      }
    });
  };
  const handleCartItemDelete = (cartItem) => {
    dispatch(
      deleteCartItem({
        userId: user?.id,
        productId: cartItem?.productId,
        productDescription: JSON.stringify(cartItem?.productDescription),
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({ title: data.payload.message });
      }
    });
  };
  return (
    <div className="flex items-center space-x-4 bg-gray-100 p-2">
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        <h4 className="font-light italic">{optionsMap[cartItem?.category]}</h4>
        <h3 className="font-extrabold">{cartItem?.title}</h3>
        <div className="gap-2 mt-1">
          {cartItem?.productDescription
            ? Object.keys(cartItem.productDescription).map(
                (descriptionItem) => (
                  <div key={descriptionItem}>{`${
                    optionsMap[descriptionItem]
                  } : ${
                    optionsMap[cartItem?.productDescription[descriptionItem]]
                  }`}</div>
                )
              )
            : ""}
        </div>
      </div>
      <div className="flex flex-col self-end gap-2 items-end">
        <p className="font-semibold">
          $
          {(
            (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
            cartItem?.quantity
          ).toFixed(2)}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            disabled={cartItem?.quantity === 1}
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{cartItem?.quantity}</span>
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
        </div>
        <Trash
          onClick={() => handleCartItemDelete(cartItem)}
          className="cursor-pointer mt-1"
          size={20}
        />
      </div>
    </div>
  );
};

export default UserCartItemsContent;
