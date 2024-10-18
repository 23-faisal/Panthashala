import { userAuthStore } from "@/store/userStore";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const { loggedIn } = userAuthStore();

  return loggedIn ? (
    <Outlet />
  ) : (
    <>
      <Navigate to="/sign-in" />{" "}
    </>
  );
};

export default PrivateRoute;
