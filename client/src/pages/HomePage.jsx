import { userAuthStore } from "@/store/userStore";

const HomePage = () => {
  const { user, loggedIn } = userAuthStore();
  console.log(user);
  console.log(loggedIn);
  return (
    <div>
      <h1> Welcome to the homepage</h1>
    </div>
  );
};

export default HomePage;
