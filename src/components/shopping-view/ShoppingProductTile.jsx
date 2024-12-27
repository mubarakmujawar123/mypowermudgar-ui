/* eslint-disable react/prop-types */
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";
import { convertPrice, getConstantValue } from "@/config/utils";

const ShoppingProductTile = ({ product }) => {
  const navigate = useNavigate();
  return (
    <Card
      className="w-full max-w-sm mx-auto m-2 cursor-pointer hover:shadow-lg shadow-slate-200"
      onClick={() =>
        navigate(`/shop/${product?.category}/${product?._id}`, {
          state: { product: product },
        })
      }
    >
      <div>
        <div className="relative">
          <img
            src={product?.image}
            alt={product.title}
            className="w-full h-[300px] object-none rounded-t-lg transform transition duration-500 hover:scale-105"
          />

          {product?.salePrice > 0 ? (
            <Badge className="absolute top-2 right-2 font-medium bg-black hover:bg-black">
              Sale
            </Badge>
          ) : null}
        </div>
        <CardContent>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[16px] text-muted-foreground">
              {getConstantValue(product?.category)}
            </span>
          </div>
          <h2 className="text-xl font-bold mb-2 mt-2">{product?.title}</h2>

          <div className="flex justify-between items-center mb-2">
            <span className="text-lg text-primary">
              <div>Price</div>
              <div
                className={`${product?.salePrice > 0 ? "line-through" : ""}`}
              >
                {convertPrice(product?.price)}
              </div>
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg">
                <div>Sale Price</div>
                <div>{convertPrice(product?.salePrice)}</div>
              </span>
            ) : null}
          </div>
        </CardContent>
        {/* <CardFooter className="flex justify-between items-center">
          <Button
          // onClick={() => {
          //   handleEdit(product);
          // }}
          >
            Add To Cart
          </Button>
        </CardFooter> */}
      </div>
    </Card>
  );
};

export default ShoppingProductTile;
