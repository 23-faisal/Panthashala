import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ContinueWithGoogle from "@/components/common/ContinueWithGoogle";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "@/config/firebase";
import { toast } from "react-toastify";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    const { username, email, password } = data;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      await updateProfile(auth.currentUser, {
        displayName: username,
      });

      // Save the user to the firestore

      await setDoc(doc(db, "users", user.uid), {
        displayName: username,
        email,
        uid: user.uid,
        photoURL: "",
        createdAt: serverTimestamp(),
      });
      toast.success(`${username} signed up successfully!`);
      navigate("/sign-in");
    } catch (error) {
      toast.error(`Sign-up failed: ${error.message}`);
    }
  };
  return (
    <section className="max-w-6xl mx-auto px-4 flex flex-col items-center justify-center">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-10 capitalize">
        Sign Up
      </h1>
      <div className="w-full flex sm:flex-col md:flex-row items-center justify-center sm:justify-between sm:gap-10 mt-10">
        <div className="w-full  md:w-1/3 lg:w-2/3 hidden sm:block">
          <img
            className="w-full h-auto shadow-lg rounded-lg "
            src="https://images.unsplash.com/photo-1724482606633-fa74fe4f5de1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="hotel"
          />
        </div>
        <div className="w-full md:w-2/3 lg:w-1/3">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex items-center flex-col gap-4"
          >
            <div className="w-full ">
              <Input
                {...register("username", { required: "Username is required" })}
                className=""
                type="text"
                placeholder="Username"
              />
              {errors?.username ? (
                <p className="text-sm text-red-500 mt-1">
                  {errors?.username?.message}
                </p>
              ) : (
                <></>
              )}
            </div>
            <div className="w-full ">
              <Input
                {...register("email", { required: "Email is required" })}
                className=""
                type="email"
                placeholder="Email"
              />
              {errors?.email ? (
                <p className="text-sm text-red-500 mt-1">
                  {errors?.email?.message}
                </p>
              ) : (
                <></>
              )}
            </div>
            <div className="relative w-full ">
              <Input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                className="px-2  "
                type={showPassword ? "text" : "password"}
                placeholder="Password"
              />
              {errors?.password ? (
                <p className="text-sm text-red-500 mt-1">
                  {errors?.password?.message}
                </p>
              ) : (
                <></>
              )}
              {showPassword ? (
                <EyeClosed
                  onClick={() => setShowPassword(!showPassword)}
                  className="h-4 w-4 absolute right-3 top-3 cursor-pointer  "
                />
              ) : (
                <Eye
                  onClick={() => setShowPassword(!showPassword)}
                  className="h-4 w-4 absolute right-3 top-3  cursor-pointer "
                />
              )}
            </div>
            <div className="flex flex-col md:flex-row text-sm  md:justify-between items-center w-full  ">
              <p className="flex items-center gap-1">
                <span>Already have an account?</span>
                <span
                  onClick={() => navigate("/sign-in")}
                  className="text-blue-500 cursor-pointer"
                >
                  Sign In
                </span>
              </p>
              {/* <p
                onClick={() => navigate("/forgot-password")}
                className="text-red-500  cursor-pointer"
              >
                Forgot Password?
              </p> */}
            </div>
            <Button
              className="w-full uppercase bg-blue-600 hover:bg-blue-700 active:bg-blue-800 "
              type="submit"
            >
              Sign Up
            </Button>
          </form>
          <Separator className="my-6" />
          <ContinueWithGoogle />
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;
