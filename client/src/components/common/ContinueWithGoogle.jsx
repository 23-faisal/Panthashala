import React from "react";
import GoogleImage from "@/assets/google.png";
import { Button } from "../ui/button";

const ContinueWithGoogle = () => {
  return (
    <div>
      <Button className="w-full uppercase bg-red-600 hover:bg-red-700 active:bg-red-800 ">
        <img className="w-6 h-6 " src={GoogleImage} alt="google image" />
        <span>Continue with Google</span>
      </Button>
    </div>
  );
};

export default ContinueWithGoogle;
