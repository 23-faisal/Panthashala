import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

import { Bath, Bed, Forward, MapPin } from "lucide-react";
import Spinner from "@/components/common/Spinner";

import ImageSlider from "@/components/common/Slider";
import { useState } from "react";

const fetchListingById = async (id) => {
  const docRef = doc(db, "listings", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error("Listing not found");
  }

  return { id: docSnap.id, ...docSnap.data() };
};

const HotelDetailsPage = () => {
  const { id } = useParams();
  const [copyLink, setCopyLink] = useState(false);

  const {
    data: listing,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["listing", id],
    queryFn: () => fetchListingById(id),
    enabled: !!id,
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="px-4 max-w-6xl mx-auto my-10">
      <h1 className="text-2xl md:text-3xl  font-bold ">{listing.name}</h1>
      <p className="   mt-2 text-slate-700 flex gap-2">
        <MapPin className="text-green-500 h-6 w-6" />
        {listing.address}
      </p>
      <div className="mt-4 relative">
        <ImageSlider images={listing.imgUrls} />
        <div
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            setCopyLink(true);
            setTimeout(() => {
              setCopyLink(false);
            }, 2000);
          }}
          className="bg-white cursor-pointer absolute top-5 right-5 rounded-full flex  items-center"
        >
          <Forward className="h-10 w-10  text-teal-500 font-extrabold " />
        </div>
        <div className="absolute top-8 right-8 0  ">
          {copyLink && <p className="mt-10 text-slate-700 bg-slate-200 px-4 py-2 rounded-md ">Link Copied</p>}
        </div>
      </div>
      <div className="mt-10">
        <p className="font-bold text-lg ">Facilities: </p>
        <div className="flex gap-4 mt-2">
          <p className="flex items-center gap-2">
            <Bed className="h-6 w-6 text-teal-500" />
            {listing.beds} Bed
          </p>
          <p className="flex items-center gap-2">
            <Bath className="h-6 w-6 text-teal-500" />
            {listing.baths} Bath
          </p>
        </div>
      </div>
      <div className="mt-4 ">
        <div>
          <p className="font-bold text-lg ">Price:</p>
          <p className="text-md font-semibold  ">
            {" "}
            ৳ {listing.regularPrice} / day
          </p>
        </div>
        <div className="mt-6">
          <p className="font-bold text-lg ">Description: </p>
          <p className="mt-2 ">{listing.description}</p>
        </div>
      </div>
    </div>
  );
};

export default HotelDetailsPage;
