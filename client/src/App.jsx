import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import OffersPage from "./pages/OffersPage";

import PageNotFoundPage from "./pages/PageNotFoundPage";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import PrivateRoute from "./components/common/PrivateRoute";
import { userAuthStore } from "./store/userStore";
import CreateListing from "./pages/CreateListing";
import HotelDetailsPage from "./pages/HotelDetailsPage";

function App() {
  const { loggedIn } = userAuthStore();
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar will always stay at the top */}
      <Navbar />

      {/* Main content area will expand to fill the available space */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/offers" element={<OffersPage />} />
          <Route path="/category/:id" element={<HotelDetailsPage />} />

          {/* Private route */}
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          {/* Private route */}
          <Route path="/create-listing" element={<PrivateRoute />}>
            <Route path="/create-listing" element={<CreateListing />} />
          </Route>
          {!loggedIn && (
            <>
              <Route path="/sign-in" element={<SignInPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            </>
          )}
          <Route path="/*" element={<PageNotFoundPage />} />
        </Routes>
      </main>

      {/* Footer will stick to the bottom if content is short */}
      <Footer />
    </div>
  );
}

export default App;
