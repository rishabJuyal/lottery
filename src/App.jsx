import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import BuyTicketPage from "./components/BuyTicketPopup/BuyTicketPage";
import DrawGames from "./pages/DrawGames";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
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

          {/* ✅ Routes inside Layout */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/check-ticket" element={<BuyTicketPage />} />
            <Route path="/draw-games" element={<DrawGames />} />
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
