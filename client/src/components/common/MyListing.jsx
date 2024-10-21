import { db } from "@/config/firebase";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, where } from "firebase/firestore";
import Spinner from "./Spinner";
import { userAuthStore } from "@/store/userStore";
import { Bath, Bed, MapPin } from "lucide-react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import ListingCard from "./ListingCard";

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

const MyListing = () => {
  const { user } = userAuthStore(); // Get the current user from the store

  const { data, isLoading, isError, error, refetch } = useQuery({
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
              <div key={listing.id}>
                <ListingCard listing={listing} onDeleteSuccess={refetch} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListing;
