import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { useForm } from "react-hook-form";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { toast } from "react-toastify";

const EditListingDialog = ({ listing, open, setOpen, onEditSuccess }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (listing) {
      // Set form values when the dialog opens
      setValue("name", listing.name);
      setValue("beds", listing.beds);
      setValue("baths", listing.baths);
      setValue("address", listing.address);
      setValue("description", listing.description);
      setValue("regularPrice", listing.regularPrice);
      setValue("discountedPrice", listing.discountedPrice);
    }
  }, [listing, setValue]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const listingDocRef = doc(db, "listings", listing.id);
      await updateDoc(listingDocRef, data);
      toast.success("Listing updated successfully!");
      onEditSuccess(); // Notify the parent component to refetch data
      setOpen(false); // Close the dialog after submission
    } catch (error) {
      toast.error("Failed to update the listing: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className=" ">
      <Dialog px-4 open={open} onOpenChange={setOpen}>
        <DialogContent className=" w-11/12 rounded-md">
          <DialogHeader>
            <DialogTitle>Edit Listing</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name */}
            <div className="mb-4">
              <Label>Name</Label>
              <Input
                {...register("name", { required: "Name is required" })}
                placeholder="Name"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Beds and Baths */}
            <div className="flex gap-4 mb-4">
              <div>
                <Label>Beds</Label>
                <Input
                  {...register("beds", {
                    required: "Beds are required",
                    min: 1,
                  })}
                  type="number"
                  placeholder="Beds"
                />
                {errors.beds && (
                  <p className="text-red-500">{errors.beds.message}</p>
                )}
              </div>
              <div>
                <Label>Baths</Label>
                <Input
                  {...register("baths", {
                    required: "Baths are required",
                    min: 1,
                  })}
                  type="number"
                  placeholder="Baths"
                />
                {errors.baths && (
                  <p className="text-red-500">{errors.baths.message}</p>
                )}
              </div>
            </div>

            {/* Address */}
            <div className="mb-4">
              <Label>Address</Label>
              <Textarea
                {...register("address", { required: "Address is required" })}
                placeholder="Address"
                className="h-16 w-full"
              />
              {errors.address && (
                <p className="text-red-500">{errors.address.message}</p>
              )}
            </div>

            {/* Description */}
            <div className="mb-4">
              <Label>Description</Label>
              <Textarea
                {...register("description", {
                  required: "Description is required",
                })}
                placeholder="Description"
                className="h-32 w-full"
              />
              {errors.description && (
                <p className="text-red-500">{errors.description.message}</p>
              )}
            </div>

            {/* Price */}
            <div className="mb-4">
              <Label>Regular Price</Label>
              <Input
                {...register("regularPrice", {
                  required: "Regular price is required",
                })}
                type="number"
                placeholder="Regular Price"
              />
              {errors.regularPrice && (
                <p className="text-red-500">{errors.regularPrice.message}</p>
              )}
            </div>

            <div className="mb-4">
              <Label>Discounted Price</Label>
              <Input
                {...register("discountedPrice", {
                  required: "Discounted price is required",
                })}
                type="number"
                placeholder="Discounted Price"
              />
              {errors.discountedPrice && (
                <p className="text-red-500">{errors.discountedPrice.message}</p>
              )}
            </div>

            <DialogFooter>
              <Button
                type="submit"
                className="bg-black w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Updating..." : "Update Listing"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditListingDialog;
