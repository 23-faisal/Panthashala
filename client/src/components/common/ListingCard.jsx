import { Bath, Bed, MapPin } from "lucide-react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { useState } from "react";
import { toast } from "react-toastify";
import EditListingDialog from "./EditListingDialog";

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
const ListingCard = ({ listing, onDeleteSuccess }) => {
  const [open, setOpen] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false); // Manage the dialog state

  const deleteListingById = async (id) => {
    const docRef = doc(db, "listings", id);
    try {
      await deleteDoc(docRef);
      onDeleteSuccess(); // Notify parent component of successful deletion
      setOpen(false); // Close the dialog after deletion
      toast.success("Items deleted successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <Card className="border shadow-md rounded-lg bg-slate-100 shadow-teal-50 hover:shadow-lg transition-all ease-in-out duration-150 hover:shadow-slate-300 ">
      <Link to={`/category/${listing.id}`}>
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
      </Link>
      <CardFooter>
        <div className="flex items-center justify-end gap-4">
          <Button variant="outline" onClick={() => setOpenEditDialog(true)}>
            Edit
          </Button>

          <div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant="destructive">Delete</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you want delete this?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    this post and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => deleteListingById(listing.id)}
                  >
                    Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          {/* Edit Listing Dialog */}
          <EditListingDialog
            listing={listing}
            open={openEditDialog}
            setOpen={setOpenEditDialog}
            onEditSuccess={onDeleteSuccess} // Refetch data after successful edit
          />
        </div>
      </CardFooter>
      {/* Edit Listing Dialog */}
    </Card>
  );
};

export default ListingCard;
