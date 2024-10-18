import { Input } from "@/components/ui/input";
import { auth } from "@/config/firebase";
import { userAuthStore } from "@/store/userStore";
import { signOut as firebaseSignOut } from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const { user, logout } = userAuthStore();
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

  const signOut = () => {
    firebaseSignOut(auth);
    logout();
    toast.success(`${currentUser.displayName} signed out successfully`);
    navigate("/sign-in");
  };

  const SubmitForm = () => {};

  return (
    <section className="px-4 ">
      <div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-10 capitalize text-center">
          Profile
        </h1>
        <div className="mt-6">
          <form
            onSubmit={handleSubmit(SubmitForm)}
            className="w-full sm:w-2/3 md:w-1/2   mx-auto "
            action=""
          >
            <div className="mb-3">
              <Input
                type="text"
                placeholder="Username"
                {...register("username", { required: "Username is required" })}
                readOnly={!isEditing}
                className={isEditing ? "" : "bg-gray-200"}
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
                {...register("email", { required: "Email is required" })}
                readOnly
                className="bg-gray-200"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="flex items-center flex-col sm:flex-row gap-2 sm:justify-between pt-2 ">
              <div className="flex items-center gap-1">
                <p>Do you want to change the name?</p>
                {isEditing ? (
                  <p
                    className="cursor-pointer text-green-500"
                    onClick={() => setIsEditing(false)}
                  >
                    Save
                  </p>
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
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
