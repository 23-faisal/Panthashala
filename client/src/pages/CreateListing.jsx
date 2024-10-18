import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const CreateListing = () => {
  const [formData, setFormData] = useState({
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
  });

  const {
    type,
    name,
    beds,
    baths,
    parking,
    furnished,
    address,
    description,
    images,
    offer,
    regularPrice,
    discountedPrice,
  } = formData;

  const OnChange = () => {};
  return (
    <section className="px-4 mb-10 ">
      <div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-10 capitalize text-center">
          Create Listing
        </h1>

        {/* form */}

        <div className="w-full sm:w-2/3 md:w-1/3 mx-auto mt-6">
          <form className="flex flex-col gap-4">
            {/* Sell or rent */}

            <div>
              <Label className="font-semibold text-lg mb-2">Sell or Rent</Label>
              <div className="flex items-center justify-between gap-4 mt-2">
                <Button
                  className={`w-full font-medium uppercase shadow-md bg-white text-black hover:shadow-lg focus:shadow-lg active:shadow-lg transition ease-in-out duration-150 ${
                    type === "sale"
                      ? "bg-black text-white hover:bg-black hover:text-white"
                      : " hover:bg-white text-black"
                  } `}
                  type="button"
                  id="type"
                  value="sale"
                >
                  Sale
                </Button>
                <Button
                  className={`w-full font-medium uppercase shadow-md bg-white text-black hover:shadow-lg focus:shadow-lg active:shadow-lg transition ease-in-out duration-150  ${
                    type === "rent"
                      ? "bg-black text-white hover:bg-black hover:text-white"
                      : " hover:bg-white text-black"
                  }  `}
                  type="button"
                  id="type"
                  value="rent"
                >
                  Rent
                </Button>
              </div>
            </div>

            {/* Name */}

            <div>
              <Label className="font-semibold text-lg ">Name</Label>
              <Input
                OnChange={OnChange}
                className="mt-2  "
                id="name"
                value={name}
                placeholder="Name"
                maxLength="32"
                minLength="10"
                required
              />
            </div>

            {/* beds & baths */}
            <div className="flex items-center gap-4 w-1/2">
              <div>
                <Label className="font-semibold text-lg ">Beds</Label>
                <Input
                  OnChange={OnChange}
                  className="mt-2"
                  id="beds"
                  value={beds}
                  type="number"
                  placeholder="Beds"
                  min="1"
                  max="50"
                />
              </div>
              <div>
                <Label className="font-semibold text-lg ">Baths</Label>
                <Input
                  OnChange={OnChange}
                  className="mt-2"
                  id="baths"
                  value={baths}
                  type="number"
                  placeholder="Baths"
                  min="1"
                  max="50"
                />
              </div>
            </div>

            {/* parking */}

            <div>
              <Label className="font-semibold text-lg mb-2">Parking Spot</Label>
              <div className="flex items-center justify-between gap-4 mt-2">
                <Button
                  className={`w-full font-medium uppercase shadow-md bg-white text-black hover:shadow-lg focus:shadow-lg active:shadow-lg transition ease-in-out duration-150  ${
                    parking
                      ? "bg-black text-white hover:bg-black hover:text-white"
                      : " hover:bg-white text-black"
                  } `}
                  type="button"
                  id="parking"
                  value="parking"
                >
                  Yes
                </Button>
                <Button
                  className={`w-full font-medium uppercase shadow-md bg-white text-black hover:shadow-lg focus:shadow-lg active:shadow-lg transition ease-in-out duration-150  ${
                    !parking
                      ? "bg-black text-white hover:bg-black hover:text-white"
                      : " hover:bg-white text-black"
                  }  `}
                  type="button"
                  id="parking"
                  value="parking"
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
                  className={`w-full font-medium uppercase shadow-md bg-white text-black hover:shadow-lg focus:shadow-lg active:shadow-lg transition ease-in-out duration-150 ${
                    furnished
                      ? "bg-black text-white hover:bg-black hover:text-white"
                      : " hover:bg-white text-black"
                  } `}
                  type="button"
                  id="furnished"
                  value="furnished"
                >
                  Yes
                </Button>
                <Button
                  className={`w-full font-medium uppercase shadow-md bg-white text-black hover:shadow-lg focus:shadow-lg active:shadow-lg transition ease-in-out duration-150  ${
                    !furnished
                      ? "bg-black text-white hover:bg-black hover:text-white"
                      : " hover:bg-white text-black"
                  }  `}
                  type="button"
                  id="furnished"
                  value="furnished"
                >
                  No
                </Button>
              </div>
            </div>

            {/* address */}
            <div>
              <Label className="font-semibold text-lg ">Address</Label>
              <Textarea
                OnChange={OnChange}
                className="mt-2 py-6"
                id="address"
                value={address}
                placeholder="Address"
                maxLength="150"
                minLength="10"
                required
              />
            </div>

            {/* description */}
            <div>
              <Label className="font-semibold text-lg ">Description</Label>
              <Textarea
                OnChange={OnChange}
                className="mt-2 py-6"
                id="description"
                value={description}
                placeholder="Description"
                maxLength="150"
                minLength="10"
                required
              />
            </div>

            {/* Offer */}

            <div>
              <Label className="font-semibold text-lg mb-2">Offer</Label>
              <div className="flex items-center justify-between gap-4 mt-2">
                <Button
                  className={`w-full font-medium uppercase shadow-md bg-white text-black hover:shadow-lg focus:shadow-lg active:shadow-lg transition ease-in-out duration-150 ${
                    offer
                      ? "bg-black text-white hover:bg-black hover:text-white"
                      : " hover:bg-white text-black"
                  } `}
                  type="button"
                  id="offer"
                  value="offer"
                >
                  Yes
                </Button>
                <Button
                  className={`w-full font-medium uppercase shadow-md bg-white text-black hover:shadow-lg focus:shadow-lg active:shadow-lg transition ease-in-out duration-150  ${
                    !offer
                      ? "bg-black text-white hover:bg-black hover:text-white"
                      : " hover:bg-white text-black"
                  }  `}
                  type="button"
                  id="offer"
                  value="offer"
                >
                  No
                </Button>
              </div>
            </div>

            {/* Price  */}

            <div>
              <Label className="font-semibold text-lg mb-2">
                Regular Price
              </Label>
              <div className="flex items-center gap-4">
                <Input
                  OnChange={OnChange}
                  className="mt-2 w-1/2"
                  id="regularPrice"
                  value={regularPrice}
                  type="number"
                  placeholder="Regular price"
                  min="50"
                  max="1000000000"
                  required
                />
                {type === "rent" ? (
                  <p className="text-md font-bold  mt-2">$/month</p>
                ) : (
                  <></>
                )}
              </div>
            </div>

            {/* Discounted Price */}

            {offer ? (
              <div>
                <Label className="font-semibold text-lg mb-2">
                  Discounted Price
                </Label>
                <div className="flex items-center gap-4">
                  <Input
                    OnChange={OnChange}
                    className="mt-2 w-1/2"
                    id="discountedPrice"
                    value={discountedPrice}
                    type="number"
                    placeholder="Discounted Price"
                    min="50"
                    max="1000000000"
                    required
                  />
                  {type === "rent" ? (
                    <p className="text-md font-bold  mt-2">$/month</p>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            ) : (
              <></>
            )}

            {/* upload picture */}

            <div>
              <Label className="font-semibold text-lg ">Upload Images</Label>
              <p className="text-sm text-slate-70 mt-1">
                The first image will be the cover image* (max 6)
              </p>
              <Input
                OnChange={OnChange}
                className="mt-2  cursor-pointer py-2 text-gray-700 bg-white transition ease-in-out duration-150 "
                id="images"
                value={images}
                type="file"
                placeholder="Images"
                accept=".jpg, .jpeg, .png"
                multiple
                required
              />
            </div>

            {/* Submit Button */}

            <div>
              <Button className="w-full bg-black  mt-4 " type="submit">
                Submit
              </Button>
            </div>

            {/*  */}
          </form>
        </div>

        {/*  */}
      </div>
    </section>
  );
};

export default CreateListing;
