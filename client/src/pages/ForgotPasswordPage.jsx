import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ContinueWithGoogle from "@/components/common/ContinueWithGoogle";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };
  return (
    <section className="max-w-6xl mx-auto px-4 flex flex-col items-center justify-center">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-10 capitalize">
        Forgot Password
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

            <div className="flex flex-col md:flex-row text-sm  md:justify-between items-center w-full  ">
              <p className="flex items-center gap-1">
                <span>Don't have an account?</span>
                <span
                  onClick={() => navigate("/sign-up")}
                  className="text-blue-500 cursor-pointer"
                >
                  Sign Up
                </span>
              </p>
              <p
                onClick={() => navigate("/sign-in")}
                className="text-green-500  cursor-pointer"
              >
                Sign In
              </p>
            </div>
            <Button
              className="w-full uppercase bg-blue-600 hover:bg-blue-700 active:bg-blue-800 "
              type="submit"
            >
              Send Reset Password
            </Button>
          </form>
          <Separator className="my-6" />
          <ContinueWithGoogle />
        </div>
      </div>
    </section>
  );
};

export default ForgotPasswordPage;
