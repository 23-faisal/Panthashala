import { db } from "@/config/firebase";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, where } from "firebase/firestore";
import Spinner from "./Spinner";
import { userAuthStore } from "@/store/userStore";
import { Bath, Bed, MapPin } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

// Function to fetch data from Firestore filtered by createdBy UID
const fetchListings = async (userId) => {
  const listingsCollection = collection(db, "listings");

  // Create a query that filters listings by the `createdBy` field
  const listingsQuery = query(
    listingsCollection,
    where("createdBy", "==", userId)
  );

  const listingsSnapshot = await getDocs(listingsQuery);
  const listingsData = listingsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return listingsData;
};

// Function to calculate the difference in days from a given date to today
const calculateDaysAgo = (timestamp) => {
  if (!timestamp) return "Unknown";

  const date = timestamp.toDate(); // Convert Firestore timestamp to JavaScript Date
  const today = new Date();

  const diffInTime = today.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInTime / (1000 * 60 * 60 * 24));

  if (diffInDays > 0) {
    return `${diffInDays} days ago`;
  } else {
    return `Today`;
  }
};

const MyListing = () => {
  const { user } = userAuthStore(); // Get the current user from the store

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["myListings", user?.uid], // Use user UID as part of the query key
    queryFn: () => fetchListings(user?.uid), // Fetch listings for the current user
    placeholderData: keepPreviousData,
    enabled: !!user?.uid,
  });

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  // Error state
  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="px-4 max-w-6xl mx-auto mb-10">
      <h1 className="text-center font-semibold text-2xl">My Listing</h1>
      <div className="mt-6">
        {/* Render the list of user-created listings here */}
        {data.length === 0 ? (
          <p className="mt-10 text-center ">No listings found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((listing) => (
              <Card
                key={listing.id}
                className="border shadow-md rounded-lg bg-slate-100 shadow-teal-50 hover:shadow-lg transition-all ease-in-out duration-150 hover:shadow-slate-300 "
              >
                <CardContent>
                  <div className="mt-6 relative">
                    <img
                      className="h-48 w-full object-cover rounded-md"
                      src={listing.imgUrls[0]}
                      alt={listing.id}
                    />
                    <div className="absolute top-2 left-0">
                      <p className="bg-blue-500 px-6 py-1 text-sm rounded-r-md text-white ">
                        {calculateDaysAgo(listing.createdAt)}
                      </p>
                    </div>
                  </div>
                  <p className="flex gap-2 items-center text-sm text-teal-500 mt-2">
                    <MapPin className="h-10 w-10 font-extrabold text-primary" />
                    {listing.address.slice(0, 60)}
                  </p>
                  <h2 className="font-semibold text-lg mt-4">
                    {listing.name.slice(0, 30)}
                  </h2>

                  <div className="flex  gap-4 items-center my-2">
                    <p className="flex items-center gap-2  text-slate-900 font-semibold ">
                      {" "}
                      <Bed className="h-6 w-6 text-teal-500" />
                      {listing.beds} Bed
                    </p>
                    <p className="flex items-center gap-2  text-slate-900 font-semibold ">
                      {" "}
                      <Bath className="h-6 w-6 text-teal-500" />
                      {listing.baths} Bath
                    </p>
                  </div>
                  <p className="mt-1">Price: ৳ {listing.regularPrice} / day</p>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center justify-end gap-4">
                    <Button variant="outline">Edit</Button>
                    <Button variant="destructive">Delete</Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListing;
