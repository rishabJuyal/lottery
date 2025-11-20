import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layouts/Layout";
// import AddMoney from "./pages/AddMoney";
// import Withdraw from "./pages/Withdraw";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
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

// ✅ ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("authToken"); // Example auth check
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <div className="w-full max-w-md mx-auto">

    <Router>
      <Suspense
        // fallback={
        //   // <div className="flex items-center justify-center h-screen text-blue-700 text-lg font-semibold">
        //   //   Loading...
        //   // </div>
        // }
      >
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route path="draw-games" element={<DrawGames />} />
            <Route path="offers" element={<Offers />} />
            <Route path="claim-prize" element={<ClaimPrize />} />
            <Route path="responsible-gambling" element={<ResponsibleGambling />} />
            <Route path="terms" element={<Terms />} />
            <Route path="privacy" element={<PrivacyPolicy />} />
            <Route path="contact-us" element={<ContactUs />} />
            <Route path="result" element={<ResultPage />} />

            {/* Protected routes */}
            <Route
              path="check-ticket"
              element={
                <ProtectedRoute>
                  <CheckMyTickets />
                </ProtectedRoute>
              }
            />
            {/* <Route
              path="buy-ticket"
              element={
                <ProtectedRoute>
                  <BuyTicketPage />
                </ProtectedRoute>
              }
            /> */}
            <Route
              path="my-profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
            {/* <Route
              path="add-money"
              element={
                <ProtectedRoute>
                  <AddMoney />
                </ProtectedRoute>
              }
            /> */}
            {/* <Route
              path="withdraw"
              element={
                <ProtectedRoute>
                  <Withdraw />
                </ProtectedRoute>
              }
            /> */}

            {/* 404 fallback */}
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
    
    </div>
  );
}

export default App;
