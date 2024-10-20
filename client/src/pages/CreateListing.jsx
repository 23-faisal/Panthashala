import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { auth, db, storage } from "../config/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";

const CreateListing = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      type: "rent",
      name: "",
      beds: 1,
      baths: 1,
      parking: false,
      furnished: false,
      address: "",
      description: "",
      images: "",
      offer: true,
      regularPrice: 0,
      discountedPrice: 0,
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const watchType = watch("type");
  const watchOffer = watch("offer");
  const watchRegularPrice = parseFloat(watch("regularPrice")) || 0;

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const user = auth.currentUser;
      // Remove the images field from the data object
      const { images, ...listingData } = data;

      // Add the current user's UID to the listing data
      listingData.createdBy = user.uid;

      // Attempt to save listing data to Firestore without images
      const collectionRef = collection(db, "listings");
      const docRef = await addDoc(collectionRef, listingData);

      if (!docRef.id) {
        // If we can't get a document ID, treat this as a failure
        throw new Error("Failed to upload data to the database.");
      }

      // Upload each image to Firebase Storage and get URLs
      const imageUploadPromises = Array.from(images).map((file) => {
        const storageRef = ref(
          storage,
          `images/${Date.now()}-${Math.floor(Math.random() * 100000000)}-${
            file.name
          }`
        );
        const uploadTask = uploadBytesResumable(storageRef, file);

        return new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            null,
            (error) => reject(error),
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              resolve(downloadURL);
            }
          );
        });
      });

      // Wait for all image uploads to complete
      const imageUrls = await Promise.all(imageUploadPromises);

      // Step 3: Update Firestore document with image URLs
      const docToUpdate = doc(db, "listings", docRef.id);
      await updateDoc(docToUpdate, {
        imgUrls: imageUrls, // Add the image URLs to the document
      });

      // Reset form and show success message
      toast.success("Listing created successfully!");

      reset();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="px-4 mb-10">
      <div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-10 capitalize text-center">
          Create Listing
        </h1>

        <div className="w-full sm:w-2/3 md:w-1/3 mx-auto mt-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {/* Sell or rent */}
            <div>
              <Label className="font-semibold text-lg mb-2">Sell or Rent</Label>
              <div className="flex items-center justify-between gap-4 mt-2">
                <Button
                  className={`w-full font-medium uppercase shadow-md transition duration-150 ${
                    watchType === "sale"
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  }`}
                  type="button"
                  onClick={() => setValue("type", "sale")}
                >
                  Sale
                </Button>
                <Button
                  className={`w-full font-medium uppercase shadow-md transition duration-150 ${
                    watchType === "rent"
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  }`}
                  type="button"
                  onClick={() => setValue("type", "rent")}
                >
                  Rent
                </Button>
              </div>
            </div>

            {/* Name */}
            <div>
              <Label className="font-semibold text-lg">Name</Label>
              <Input
                {...register("name", {
                  required: "Name is required",
                  minLength: { value: 10, message: "Minimum length is 10" },
                  maxLength: { value: 32, message: "Maximum length is 32" },
                })}
                className="mt-2"
                placeholder="Name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Beds & Baths */}
            <div className="flex items-center gap-4">
              <div>
                <Label className="font-semibold text-lg">Beds</Label>
                <Input
                  {...register("beds", {
                    required: "Beds are required",
                    min: { value: 1, message: "Minimum value is 1" },
                    max: { value: 50, message: "Maximum value is 50" },
                  })}
                  className="mt-2"
                  type="number"
                  placeholder="Beds"
                />
                {errors.beds && (
                  <p className="text-red-500 text-sm">{errors.beds.message}</p>
                )}
              </div>
              <div>
                <Label className="font-semibold text-lg">Baths</Label>
                <Input
                  {...register("baths", {
                    required: "Baths are required",
                    min: { value: 1, message: "Minimum value is 1" },
                    max: { value: 50, message: "Maximum value is 50" },
                  })}
                  className="mt-2"
                  type="number"
                  placeholder="Baths"
                />
                {errors.baths && (
                  <p className="text-red-500 text-sm">{errors.baths.message}</p>
                )}
              </div>
            </div>

            {/* Parking */}
            <div>
              <Label className="font-semibold text-lg mb-2">Parking Spot</Label>
              <div className="flex items-center justify-between gap-4 mt-2">
                <Button
                  className={`w-full font-medium uppercase shadow-md transition duration-150 ${
                    watch("parking")
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  }`}
                  type="button"
                  onClick={() => setValue("parking", true)}
                >
                  Yes
                </Button>
                <Button
                  className={`w-full font-medium uppercase shadow-md transition duration-150 ${
                    !watch("parking")
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  }`}
                  type="button"
                  onClick={() => setValue("parking", false)}
                >
                  No
                </Button>
              </div>
            </div>

            {/* Furnished */}
            <div>
              <Label className="font-semibold text-lg mb-2">Furnished</Label>
              <div className="flex items-center justify-between gap-4 mt-2">
                <Button
                  className={`w-full font-medium uppercase shadow-md transition duration-150 ${
                    watch("furnished")
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  }`}
                  type="button"
                  onClick={() => setValue("furnished", true)}
                >
                  Yes
                </Button>
                <Button
                  className={`w-full font-medium uppercase shadow-md transition duration-150 ${
                    !watch("furnished")
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  }`}
                  type="button"
                  onClick={() => setValue("furnished", false)}
                >
                  No
                </Button>
              </div>
            </div>

            {/* Address */}
            <div>
              <Label className="font-semibold text-lg">Address</Label>
              <Textarea
                {...register("address", { required: "Address is required" })}
                className="mt-2 py-2"
                placeholder="Address"
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address.message}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <Label className="font-semibold text-lg">Description</Label>
              <Textarea
                {...register("description", {
                  required: "Description is required",
                })}
                className="mt-2 py-12"
                placeholder="Description"
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Offer */}
            <div>
              <Label className="font-semibold text-lg mb-2">Offer</Label>
              <div className="flex items-center justify-between gap-4 mt-2">
                <Button
                  className={`w-full font-medium uppercase shadow-md transition duration-150 ${
                    watchOffer ? "bg-black text-white" : "bg-white text-black"
                  }`}
                  type="button"
                  onClick={() => setValue("offer", true)}
                >
                  Yes
                </Button>
                <Button
                  className={`w-full font-medium uppercase shadow-md transition duration-150 ${
                    !watchOffer ? "bg-black text-white" : "bg-white text-black"
                  }`}
                  type="button"
                  onClick={() => setValue("offer", false)}
                >
                  No
                </Button>
              </div>
            </div>

            {/* Regular Price */}
            <div>
              <Label className="font-semibold text-lg mb-2">
                Regular Price
              </Label>
              <div className="flex gap-2">
                <Input
                  {...register("regularPrice", {
                    required: "Regular price is required",
                    min: {
                      value: 50,
                      message: "Regular price must be more than 50",
                    },
                    validate: (value) =>
                      parseFloat(value) > 0 ||
                      "Regular price must be more than 50",
                  })}
                  className="mt-2"
                  type="number"
                  placeholder="Regular Price"
                />
                {watchType === "rent" && (
                  <p className=" mt-4 font-bold">$/month</p>
                )}
              </div>
              {errors?.regularPrice && (
                <p className="text-sm mt-1 text-red-500">
                  {errors?.regularPrice?.message}
                </p>
              )}
            </div>

            {/* Discounted Price */}
            {watchOffer && (
              <div>
                <Label className="font-semibold text-lg mb-2">
                  Discounted Price
                </Label>
                <div className="flex gap-2">
                  <Input
                    {...register("discountedPrice", {
                      required: "Discounted price is required",
                      min: {
                        value: 1,
                        message: "Discounted price must be at least 1",
                      },
                      max: {
                        value: watchRegularPrice,
                        message:
                          "Discounted price must be less than the regular price",
                      },
                      validate: (value) =>
                        parseFloat(value) < parseFloat(watchRegularPrice) ||
                        "Discounted price must be less than the regular price",
                    })}
                    className="mt-2"
                    type="number"
                    placeholder="Discounted Price"
                  />
                  {watchType === "rent" && (
                    <p className=" mt-4 font-bold">$/month</p>
                  )}
                </div>{" "}
                {errors?.discountedPrice && (
                  <p className="text-sm mt-1 text-red-500">
                    {errors?.discountedPrice?.message}
                  </p>
                )}
              </div>
            )}

            {/* Image Upload */}
            <div>
              <Label className="font-semibold text-lg mb-2">
                Upload Images
              </Label>
              <Input
                {...register("images", {
                  required: "Image is required",
                  validate: {
                    required: (files) =>
                      files.length > 0 || "At least 1 image is required",
                    maxLength: (files) =>
                      files.length <= 6 ||
                      "You can upload a maximum of 6 images",
                  },
                })}
                className="mt-2"
                type="file"
                accept=".jpg,.jpeg,.png"
                multiple
              />
              {errors?.images && (
                <p className="text-sm mt-1 text-red-500">
                  {errors?.images?.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              disabled={isSubmitting}
              type="submit"
              className="mt-4 bg-black w-full"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                </span>
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreateListing;
