import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Login from "./Login";
import "./index.scss";
import SignUp from "./SignUp";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { usersignUp, userresetpassword } from "../../functions/user";

import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../reducers/userReducer";
const userState = {
  // this is the initial state of the sign up form
  first_name: "",
  last_name: "",
  email: "",
  phoneno: "",
  dob: "",
  username: "",
  password: "",
};
const LoginState = {
  // this is the initial state of the login form
  login_email: "",
  login_password: "",
};
const Authentication = ({
  // this is the Authentication component which is used to show the authentication modal and handle the sign up and login form submit
  show,
  setShow,
  handleClose,
  handleShow,
  setAuthenticated,
  setShowSuccessModal,
  history,
}) => {
  const [showSignUpPanel, setShowSignUpPanel] = useState(false);
  const [resetEmail, setResetEmail] = useState(null);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();

  const handleSignUpSubmit = (signUpValues) => {
    // this is the function to handle the sign up form submit
    // e.preventDefault();
    usersignUp(signUpValues) // this is the function to sign up the user
      .then((res) => {
        if (res.data.success) {
          // if the user is successfully signed up
          setShowSuccessModal(true); // show the success modal
          setShow(false); // close the authentication modal
        }
      })
      .catch((err) => console.log(err.response)); // if there is an error, log it
  };
  const handleLoginSubmit = async (loginValues) => {
    // this is the function to handle the login form submit
    await axios // this is the axios call to the backend to login the user
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/login`, loginValues)
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          // if the user is successfully logged in
          localStorage.setItem("usertoken", res.data.token); // store the user token in the local storage
          localStorage.setItem("useremail", res.data.useremail); // store the user email in the local storage
          dispatch(
            // dispatch the user details to the redux store
            userLogin({
              userid: res.data.id,
              usertoken: res.data.token,
              username: res.data.username,
              useremail: res.data.useremail,
              userpicture: res.data.picture,
              authenticated: true,
            })
          );
        }
        setShow(false); // close the authentication modal

        navigate("/verification"); // navigate to the verification page after the user is logged in
      })
      .catch((err) => console.log(err.response));
  };

  const handleResetPasswordSubmit = (e) => {
    // this is the function to handle the reset password form submit
    console.log("reset password");
    e.preventDefault(); // prevent the default behaviour of the form
    userresetpassword(resetEmail) // this is the function to reset the password of the user
      .then((res) => {
        if (res.data.success) {
          // if the user is successfully reset the password
          setResetEmailSent(true); // set the reset email sent state to true
        }
      })
      .catch((err) => console.log(err.response));
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered className="auth_modal">
        <Modal.Body>
          <div
            className={
              showSignUpPanel ? "container right-panel-active" : "container"
            }
            id="container"
          >
            <SignUp handleSignUpSubmit={handleSignUpSubmit} />

            <Login // this is the login component
              setAuthenticated={setAuthenticated}
              setShow={setShow}
              handleLoginSubmit={handleLoginSubmit}
              handleResetPasswordSubmit={handleResetPasswordSubmit}
              setResetEmail={setResetEmail}
              resetEmailSent={resetEmailSent}
            />

            <div className="overlay-container">
              <div className="overlay">
                <div className="overlay-panel overlay-left">
                  <h1>Welcome Back!</h1>
                  <p>
                    To keep connected with us please login with your personal
                    info
                  </p>
                  <button
                    className="ghost"
                    id="signIn"
                    onClick={() => setShowSignUpPanel(false)} // this is the function that is used to show the sign in panel when the sign in button is clicked
                  >
                    Sign In
                  </button>
                </div>
                <div className="overlay-panel overlay-right">
                  <h1>Hello, Friend!</h1>
                  <p>Enter your personal details and start journey with us</p>
                  <button
                    className="ghost"
                    id="signUp"
                    onClick={() => setShowSignUpPanel(true)} // this is the function that is used to show the sign up panel when the sign up button is clicked
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Authentication;
