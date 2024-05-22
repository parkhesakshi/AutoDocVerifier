import React, { useState, useEffect } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

import Authentication from "../Authentication";
import Login from "../Authentication/Login";
import "./index.scss";
import logo from "../../assets/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import SuccessModal from "../Modal/SuccessModal";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../../reducers/userReducer";
import { getUserById } from "../../functions/user";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const handleClose = () => setShow(false);
  const handleSuccessModalClose = () => setShowSuccessModal(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const { authenticated, userid, userpicture } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  useEffect(() => {
    getCurrentUser();
    // setTimeout(() => {
    //   setShow(true);
    // }, 4000);
  }, [userpicture]);
  const getCurrentUser = () => {
    if (userid) {
      getUserById(userid)
        .then((res) => {
          console.log(res.data);
          setCurrentUser(res.data);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleSuccessModal = () => {
    setShowSuccessModal(true);
  };
  const handleLogout = () => {
    dispatch(userLogout());
    localStorage.clear();
    navigate("/");
  };
  return (
    <>
      <div className="navbar">
        <div className="brand">
          <img src={logo} alt="" />
        </div>
        <div className="navbar_container">
          {authenticated ? (
            <div className="navbar_menu">
              <NavLink to="/profile" className="navbar_links">
                <span className="material-icons">person</span>
                <span className="navbar_name">Profile</span>
              </NavLink>

              <NavLink to="/verification" className="navbar_links">
                <span className="material-icons">verified</span>
                <span className="navbar_name">Doc Verifier</span>
              </NavLink>

              <div className="indicator"></div>
            </div>
          ) : (
            <div className="navbar_menu">
              <NavLink to="/" className="navbar_links">
                <span className="material-icons">home</span>
                <span className="navbar_name">Home</span>
              </NavLink>

              <NavLink to="/#about-us" className="navbar_links">
                <span className="material-icons">person</span>
                <span className="navbar_name">About Us</span>
              </NavLink>
              <NavLink to="/contact-us" className="navbar_links">
                <span className="material-icons">apps</span>
                <span className="navbar_name">Contact Us</span>
              </NavLink>
              <div className="indicator"></div>
            </div>
          )}

          {authenticated ? (
            <OverlayTrigger
              trigger="click"
              rootClose
              key={"bottom"}
              placement={"bottom"}
              overlay={
                <Popover id={`popover-positioned-bottom`}>
                  <Popover.Body>
                    <ul className="profile_submenu">
                      <li>
                        <div className="navbar_links" onClick={handleLogout}>
                          <span className="material-icons">logout</span>
                          <span className="navbar_name">Logout</span>
                        </div>
                      </li>
                    </ul>
                  </Popover.Body>
                </Popover>
              }
            >
              <div className="profile_view">
                <img src={currentUser.picture} alt="" className="profile_pic" />
                {/* <h3>Sakshi Parkhe</h3> */}
              </div>
            </OverlayTrigger>
          ) : (
            <div className="profile_view" onClick={() => setShow(true)}>
              <img
                src={
                  "https://img.icons8.com/external-avatar-andi-nur-abdillah/64/null/external-avatar-business-avatar-avatar-andi-nur-abdillah-2.png"
                }
                alt=""
                className="profile_pic"
              />
              <h3 className="navbar_name">Login/SignUp</h3>
            </div>
          )}
        </div>
      </div>
      <Authentication
        show={show}
        setShow={setShow}
        handleClose={handleClose}
        handleShow={handleShow}
        setShowSuccessModal={setShowSuccessModal}
      />
      <SuccessModal
        showSuccessModal={showSuccessModal}
        handleSuccessModalClose={handleSuccessModalClose}
        setShow={setShow}
        setShowSuccessModal={setShowSuccessModal}
      />
    </>
  );
};

export default Navbar;
