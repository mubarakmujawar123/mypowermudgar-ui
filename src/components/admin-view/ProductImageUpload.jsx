/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const ProductImageUpload = ({
  imageFile,
  setImageFile,
  imageLoadingState,
  setImageLoadingState,
  setUploadedImageUrl,
}) => {
  const inputRef = useRef(null);
  const handleImageFileChange = (event) => {
    event.preventDefault();
    const selectedFile = event.target.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  };
  const handleRemoveImage = (event) => {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };
  const uploadImageToCloudinary = async () => {
    setImageLoadingState(true);
    const data = new FormData();
    data.append("my_file", imageFile);
    const response = await axios.post(
      `${baseUrl}/admin/products/upload-image`,
      data
    );
    if (response?.data?.success) {
      setUploadedImageUrl(response.data.data.url);
      setImageLoadingState(false);
    }
  };

  useEffect(() => {
    if (imageFile) uploadImageToCloudinary();
  }, [imageFile]);

  return (
    <div className="w-full mt-4">
      <Label className="text-lg font-semibold mb-3 block">Upload Image</Label>
      <div
        className="border-2 border-dashed rounded-lg p-4"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center h-32 cursor-pointer"
          >
            <UploadCloudIcon className="w-10 h-10 mb-2" />
            <span>Drag and drop or click to upload image</span>
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className="h-10 bg-gray-100" />
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 text-primary mr-2 h-8" />
            </div>
            <p className="text-sm font-medium">{imageFile.name}</p>
            <Button
              variant="ghost"
              size="icon"
              className="hover:text-foreground"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImageUpload;
