import React, { useState, useEffect } from "react";
import "./App.scss";
import AOS from "aos";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  withRouter,
  Navigate,
} from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Verify from "./pages/Verification";
import Settings from "./pages/Settings";
import Footer from "./components/Footer";
import Verification from "./pages/Verification";
import EmailActivation from "./pages/EmailActivattion";
import ResetPassword from "./pages/ResetPassword";
import ContactUs from "./pages/ContactUs";
import PrivateRoute from "./routes/PrivateRoute";
import PageNotFound from "./pages/PageNotFound";

const App = () => {
  const [screenLoading, setScreenLoading] = useState(true);
  const [auth, setAuth] = useState(false);
  const mobielView = useMediaQuery({
    query: "(max-width:500px)",
  });
  useEffect(() => {
    window.addEventListener("load", () => {
      setTimeout(() => {
        setScreenLoading(false);
      }, 3800);
      // setScreenLoading();
    });
  }, []);
  return (
    <>
      {screenLoading ? (
        <Loader />
      ) : (
        <div className="body_screen">
          <Router>
            <Navbar />
            <div className="router_screen">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/user-profile" element={<Profile />} />
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  }
                />
                <Route path="*" element={<Navigate to="/404-error" />} />
                <Route path="/404-error" element={<PageNotFound />} />
                <Route
                  path="/verification"
                  element={
                    <PrivateRoute>
                      <Verification />
                    </PrivateRoute>
                  }
                />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/activate/:token" element={<EmailActivation />} />
                <Route
                  path="/reset-password/:token"
                  element={<ResetPassword />}
                />
              </Routes>
            </div>
            <Footer />
          </Router>
        </div>
      )}
    </>
  );
};
AOS.init();
export default App;
