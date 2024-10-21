import { Bath, Bed, MapPin } from "lucide-react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

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
const ListingCard = ({ listing }) => {
   
  return (
    <Link to={`/category/${listing.id}`}>
      <Card className="border shadow-md rounded-lg bg-slate-100 shadow-teal-50 hover:shadow-lg transition-all ease-in-out duration-150 hover:shadow-slate-300 ">
        <CardContent>
          <div className="mt-6 relative">
            <img
              className="h-48 w-full object-cover rounded-md hover:scale-105  transition ease-in-out duration-150"
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
    </Link>
  );
};

export default ListingCard;
