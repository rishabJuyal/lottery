import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import AddMoney from "./pages/AddMoney";
import Withdraw from "./pages/Withdraw";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/ContactUs"));
const BuyTicketPage = lazy(() => import("./components/BuyTicketPopup/BuyTicketPage"));
const DrawGames = lazy(() => import("./pages/DrawGames"));
const Profile = lazy(() => import("./pages/Profile"));
const CheckMyTickets = lazy(() => import("./pages/CheckMyTickets"));
const Offers = lazy(() => import("./pages/Offers"));
const ClaimPrize = lazy(() => import("./pages/ClaimPrize"));
const ResponsibleGambling = lazy(() => import("./pages/ResponsibleGambling"));
const RegisterPage = lazy(() => import("./pages/Register"));
const Settings = lazy(() => import("./pages/Settings"));
const Terms = lazy(() => import("./pages/Terms"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const ContactUs = lazy(() => import("./pages/ContactUs"));

const Login = lazy(() => import("./pages/Login")); 
const ResultPage = lazy(() => import("./pages/ResultPage"));

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
            <Route path="/add-money" element={<AddMoney />} />
            <Route path="/withdraw" element={<Withdraw />} />

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
