import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./index.scss";
import Logo from "../../assets/logo.png";
import Profile_Logo from "../../assets/profile_logo.png";
import { useDispatch, useSelector } from "react-redux";
import { adminLogoutReducer } from "../../reducers/adminReducer";

const Navbar = () => {
  const { authenticated, adminname } = useSelector((state) => state.admin);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userpic = localStorage.getItem("adminpicture");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleCloseMenuonMobile = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    dispatch(adminLogoutReducer());
    navigate("/");
  };
  return (
    <div className="navbar">
      <div className="navbar_logo">
        <img src={Logo} alt="" />
      </div>
      <div className="navbar_menu">
        <div className="admin_profile">
          <img src={userpic} alt="" />
          <p>{adminname}</p>
        </div>
        <ul className={`navbar_list ${isMenuOpen ? "active" : ""}`}>
          <li className="navbar_list_items">
            <NavLink to={"/dashboard"} onClick={handleCloseMenuonMobile}>
              <span class="material-symbols-outlined">dashboard</span>
              <p>Dashboard</p>
            </NavLink>
          </li>
          <li className="navbar_list_items">
            <NavLink to={"/users"} onClick={handleCloseMenuonMobile}>
              <span class="material-symbols-outlined">group</span>
              <p>Users</p>
            </NavLink>
          </li>
        </ul>
        <div className="navbar_list_items navbar_logout" onClick={handleLogout}>
          <span class="material-symbols-outlined">power_settings_new</span>
        </div>
      </div>
      <div
        className="navbar_hamburger"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <span class="material-symbols-outlined">sort</span>
      </div>
    </div>
  );
};

export default Navbar;
