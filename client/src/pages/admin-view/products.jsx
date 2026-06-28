import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ImageUpload from "@/components/admin-view/image-upload";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
} from "@/store/admin/products-slice";
import { toast } from "react-toastify";
import ProductTile from "./product-tile";

const schema = yup
  .object({
    title: yup.string().required(),
    description: yup.string().required(),
    category: yup.string().required(),
    brand: yup.string().required(),
    salesPrice: yup.number().positive().integer().required(),
    stockQuantity: yup.number().positive().integer().required(),
  })
  .required();

const inputClass =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50";

const AdminProducts = ({ product }) => {
  //Redux Logic
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.adminProducts);
  console.log("productList", productList);
  //Redux Logic

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  // states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  // states

  // function logic
  const handleDelete = (id) => {
    dispatch(deleteProduct(id)).then((response) => {
      if (response?.payload?.success) {
        toast.success(response?.payload?.message);
        dispatch(getAllProducts());
      } else {
        toast.error(response?.payload?.message);
      }
    });
  };
  // function logic
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    data = {
      ...data,
      imageUrl,
    };
    console.log(data);
    dispatch(createProduct(data)).then((response) => {
      if (response?.payload?.success) {
        toast.success(response?.payload?.message);
        setIsModalOpen(false);
        dispatch(getAllProducts());
      } else {
        toast.error(response?.payload?.message);
      }
    });
  };

  return (
    <div>
      <div className="mb-5 w-full flex justify-end">
        <Button variant="outline" onClick={() => setIsModalOpen(true)}>
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 max-h-screen overflow-y-auto">
        {productList && productList.length > 0
          ? productList.map((product) => (
              <ProductTile
                key={product.id}
                product={product}
                handleDelete={handleDelete}
              />
            ))
          : null}
      </div>
      <Sheet open={isModalOpen} onOpenChange={setIsModalOpen}>
        <SheetContent className="max-h-screen overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Add New Product</SheetTitle>
            <SheetDescription>
              Add a new product to your store. Click save when you&apos;re done.
            </SheetDescription>
          </SheetHeader>
          <div
            className={`grid flex-1 auto-rows-min gap-6 px-4 ${
              imageLoadingState ? "blur-sm pointer-events-none" : ""
            }`}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Product Title</label>
                <input
                  {...register("title")}
                  placeholder="Enter product title"
                  className={inputClass}
                />
                <p className="text-sm text-red-500">{errors?.title?.message}</p>
              </div>

              <ImageUpload
                setImageLoadingState={setImageLoadingState}
                setImageUrl={setImageUrl}
              />
              {/* Product Description */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Product Description
                </label>
                <textarea
                  {...register("description")}
                  placeholder="Enter product description"
                  className={inputClass}
                />
                <p className="text-sm text-red-500">
                  {errors?.description?.message}
                </p>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <select {...register("category")} className={inputClass}>
                  <option value="">Select category</option>
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                  <option value="kids">Kids</option>
                </select>
                <p className="text-sm text-red-500">
                  {errors.category?.message}
                </p>
              </div>

              {/* Brands */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Brands</label>
                <select {...register("brand")} className={inputClass}>
                  <option value="">Select brand</option>
                  <option value="nike">Nike</option>
                  <option value="adidas">Adidas</option>
                  <option value="puma">Puma</option>
                </select>
                <p className="text-sm text-red-500">{errors.brand?.message}</p>
              </div>

              {/* Sales Price */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Sales Price</label>
                <input
                  {...register("salesPrice")}
                  placeholder="Enter product title"
                  className={inputClass}
                />
                <p className="text-sm text-red-500">
                  {errors?.salesPrice?.message}
                </p>
              </div>

              {/* Stock Quantity */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Stock Quantity</label>
                <input
                  {...register("stockQuantity")}
                  placeholder="Enter stock quantity"
                  className={inputClass}
                />
                <p className="text-sm text-red-500">
                  {errors?.salesPrice?.message}
                </p>
              </div>

              <Button className="w-full" type="submit">
                Add Product
              </Button>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AdminProducts;
