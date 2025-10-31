import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import BuyTicketPage from "./components/BuyTicketPopup/BuyTicketPage";
import DrawGames from "./pages/DrawGames";
import Profile from "./pages/Profile";
import ResultPage from "./pages/ResultPage";
import CheckMyTickets from "./pages/CheckMyTickets";
import Offers from "./pages/Offers";
import ClaimPrize from "./pages/ClaimPrize";
import ResponsibleGambling from "./pages/ResponsibleGambling";
import RegisterPage from "./pages/Register";
import Settings from "./pages/Settings";
import Terms from "./pages/Terms";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ContactUs from "./pages/ContactUs";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/ContactUs"));
const Login = lazy(() => import("./pages/Login")); // not inside Layout

function App() {
  return (
    <Router>
      {/* Suspense provides fallback while pages load */}
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen text-blue-700 text-lg font-semibold">
            Loading...
          </div>
        }
      >
        <Routes>
          {/* ✅ Login route (not under Layout) */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />


          {/* ✅ Routes inside Layout */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/check-ticket" element={<CheckMyTickets />} />
            <Route path="/buy-ticket" element={<BuyTicketPage />} />
            <Route path="/draw-games" element={<DrawGames />} />
            <Route path="/my-profile" element={<Profile />} />
            <Route path="/result" element={<ResultPage />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/claim-prize" element={<ClaimPrize />} />
            <Route path="/responsible-gambling" element={<ResponsibleGambling />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/terms-and-conditions" element={<Terms />} />
            <Route path="/privacy-statement" element={<PrivacyPolicy />} />
            <Route path="/contact-us" element={<ContactUs />} />


          {/* Optional 404 fallback */}
          <Route
            path="*"
            element={
              <div className="flex items-center justify-center h-screen text-red-600 font-bold">
                404 - Page Not Found
              </div>
            }
          />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
