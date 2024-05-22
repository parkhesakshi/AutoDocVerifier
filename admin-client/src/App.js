import React, { useState, useEffect } from "react";
import "./App.scss";
import AOS from "aos";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  withRouter,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Login from "./components/Authentication/Login";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import { adminLoginReducer } from "./reducers/adminReducer";
import UserInfo from "./pages/UserInfo";

const App = () => {
  const [screenLoading, setScreenLoading] = useState(false);
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authenticated } = useSelector((state) => state.admin);

  useEffect(() => {
    // window.addEventListener("load", () => {
    //   setTimeout(() => {
    //     setScreenLoading(false);
    //   }, 3800);
    //   // setScreenLoading();
    // });
    if (localStorage.getItem("admintoken")) {
      dispatch(
        adminLoginReducer({
          adminid: localStorage.getItem("adminid"),
          admintoken: localStorage.getItem("admintoken"),
          adminname: localStorage.getItem("adminname"),
          adminemail: localStorage.getItem("adminemail"),
          authenticated: true,
        })
      );
      // navigate("/dashboard");
    }
  }, []);
  return (
    <>
      {
        screenLoading ? (
          <Loader />
        ) : // <div className="body_screen">
        authenticated ? (
          <>
            <div className="admin_screen">
              <Navbar />
              <div className="admin_empty_screen"></div>
              <div className="admin_switch_screen">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/users/:id" element={<UserInfo />} />
                </Routes>
              </div>
            </div>
          </>
        ) : (
          <>
            <Routes>
              <Route path="/" element={<Login />} />
              {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
            </Routes>
          </>
        )

        // {/* </div> */}
      }
    </>
  );
};
AOS.init();
export default App;
