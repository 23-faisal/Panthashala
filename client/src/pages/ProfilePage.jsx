import MyListing from "@/components/common/MyListing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth, db } from "@/config/firebase";
import { userAuthStore } from "@/store/userStore";
import { signOut as firebaseSignOut, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { House } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, setUser, logout } = userAuthStore();
  const currentUser = user;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: currentUser?.displayName,
      email: currentUser?.email,
    },
  });

  const signOut = async () => {
    await firebaseSignOut(auth);
    logout();
    toast.success(`${currentUser.displayName} signed out successfully`);
    navigate("/sign-in");
  };

  const SubmitForm = async (data) => {
    const newUsername = data.username;

    try {
      setLoading(true);
      // Update username in Firebase Authentication
      await updateProfile(auth.currentUser, {
        displayName: newUsername,
      });

      // Update user in Zustand store and local storage
      const updatedUser = { ...currentUser, displayName: newUsername };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // Update Firestore document
      const userDocRef = doc(db, "users", currentUser.uid); // Assuming uid is used as document ID
      await updateDoc(userDocRef, {
        displayName: newUsername,
      });

      toast.success("Username updated successfully!");
    } catch (error) {
      console.error("Error updating username:", error);
      toast.error("Failed to update username.");
    } finally {
      setLoading(false);
      setIsEditing(false);
      navigate("/profile");
    }
  };

  return (
    <section className="px-4 mt-4">
      <div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-10 capitalize text-center">
          Profile
        </h1>
        <div className="mt-6">
          <form
            className="w-full sm:w-2/3 md:w-1/2 mx-auto"
            onSubmit={handleSubmit(SubmitForm)}
          >
            <div className="mb-3">
              <Input
                type="text"
                placeholder="Username"
                {...register("username", { required: "Username is required" })}
                readOnly={!isEditing}
                className={isEditing ? " bg-red-100" : " bg-gray-200"}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div className="mb-2">
              <Input
                type="email"
                placeholder="Email"
                value={currentUser.email}
                readOnly
                className="bg-gray-200"
              />
            </div>

            <div className="flex items-center flex-col  sm:flex-row gap-2 sm:justify-between pt-2 ">
              <div className="flex items-center gap-1">
                <p>Do you want to change the name?</p>
                {isEditing ? (
                  <button
                    disabled={loading}
                    type="submit"
                    className="cursor-pointer text-green-500"
                  >
                    Apply
                  </button>
                ) : (
                  <p
                    className="cursor-pointer text-blue-500"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit
                  </p>
                )}
              </div>
              <div>
                <p
                  onClick={signOut}
                  className="text-red-500 hover:text-red-600 cursor-pointer transition ease-in-out duration-75 "
                >
                  Sign Out
                </p>
              </div>
            </div>
          </form>

          {/* Sell or rent button */}
          <div className="w-full sm:w-2/3 md:w-1/2 mx-auto mt-4">
            <Button
              onClick={() => navigate("/create-listing")}
              className="flex items-center justify-center gap-2 w-full sm:py-6 sm:text-lg   bg-blue-600 shadow-md hover:bg-blue-700 hover:shadow-lg active:bg-blue-800 transition ease-in-out duration-75 text-md  "
            >
              <House className="w-6 h-6   " />
              <span>Sell or Rent your room</span>
            </Button>
          </div>

          {/*  */}

          <div className="mt-16  ">
            <MyListing />
          </div>

          {/*  */}
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
