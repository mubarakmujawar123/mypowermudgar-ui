import AdminProductTile from "@/components/admin-view/AdminProductTile";
import ProductImageUpload from "@/components/admin-view/ProductImageUpload";
import CommonForm from "@/components/common/CommonForm";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config/config";
import { isFormValid } from "@/config/utils";
import { useToast } from "@/hooks/use-toast";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/productSlice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialAddProductFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  woodType: [],
  height: "",
  weight: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0,
};
const AdminProducts = () => {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialAddProductFormData);
  const [imageFile, setImageFile] = useState(null);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const { productList } = useSelector((state) => state.adminProduct);
  const dispatch = useDispatch();
  const { toast } = useToast();
  console.log("productList", productList);

  const onSubmit = (event) => {
    event.preventDefault();
    const dispatchMethod = currentEditedId
      ? editProduct({
          id: currentEditedId,
          formData: {
            ...formData,
            image: uploadedImageUrl ? uploadedImageUrl : formData.image,
          },
        })
      : addNewProduct({ ...formData, image: uploadedImageUrl });
    dispatch(dispatchMethod).then((data) => {
      if (data?.payload?.success) {
        setImageFile(null);
        setUploadedImageUrl(null);
        setFormData(initialAddProductFormData);
        setCurrentEditedId(null);
        setOpenCreateProductsDialog(false);
        dispatch(fetchAllProducts());
        toast({
          title: data?.payload?.message,
        });
      }
    });
  };
  const handleEdit = (editedProduct) => {
    setUploadedImageUrl(null);
    setCurrentEditedId(editedProduct?._id);
    setOpenCreateProductsDialog(true);
    setFormData(editedProduct);
  };
  const handleDelete = (id) => {
    dispatch(deleteProduct(id)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
        toast({
          title: data?.payload?.message,
        });
      }
    });
  };

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);
  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((productItem) => (
              <AdminProductTile
                key={productItem._id}
                product={productItem}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            ))
          : null}
      </div>

      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
          setFormData(initialAddProductFormData);
          setImageFile(null);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId ? `Edit product` : `Add New Product`}
            </SheetTitle>
          </SheetHeader>
          <div className="py-6">
            <ProductImageUpload
              imageFile={imageFile}
              setImageFile={setImageFile}
              uploadedImageUrl={uploadedImageUrl}
              setUploadedImageUrl={setUploadedImageUrl}
              imageLoadingState={imageLoadingState}
              setImageLoadingState={setImageLoadingState}
            />
            <CommonForm
              buttonText={currentEditedId ? "Edit" : "Add"}
              formData={formData}
              setFormData={setFormData}
              onSubmit={onSubmit}
              formControls={addProductFormElements}
              isFormValid={isFormValid(formData)}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default AdminProducts;
