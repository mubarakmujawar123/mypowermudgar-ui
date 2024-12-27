/* eslint-disable react/prop-types */
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { getConstantValue } from "@/config/utils";

const AdminProductTile = ({ product, handleEdit, handleDelete }) => {
  return (
    <Card className="w-full max-w-sm mx-auto m-2">
      <div>
        <div className="relative">
          <img
            src={product?.image}
            alt={product.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
        </div>
        <CardContent>
          <h6 className="text-lg font-normal italic mb-2 mt-2">
            {getConstantValue(product?.category)}
          </h6>
          <h2 className="text-xl font-bold mb-2 mt-2">{product?.title}</h2>

          <div className="flex justify-between items-center mb-2">
            <span className="text-lg text-primary">
              <div>Price</div>
              <div
                className={`${product?.salePrice > 0 ? "line-through" : ""}`}
              >
                {product?.price}
              </div>
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg">
                <div>Sale Price</div>
                <div>{product?.salePrice}</div>
              </span>
            ) : null}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button
            onClick={() => {
              handleEdit(product);
            }}
          >
            Edit
          </Button>
          <Button onClick={() => handleDelete(product._id)}>Delete</Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default AdminProductTile;
