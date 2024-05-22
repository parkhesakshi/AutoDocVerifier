import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import google_logo from "../../assets/icons/google_logo.png";
import { Formik, Field } from "formik";
import * as yup from "yup";
import CustomeInput from "../Common/CustomeInput";

const Login = ({
  setAuthenticated,
  setShow,
  handleLoginChange,
  handleLoginSubmit,
  handleResetPasswordSubmit,
  setResetEmail,
  resetEmailSent,
}) => {
  const [resetPassword, setResetPassword] = useState(false);
  const navigate = useNavigate();
  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  const LoginFormSchema = yup.object().shape({
    login_email: yup
      .string()
      .email("Invalid email address")
      .required("Required"),
    login_password: yup.string().required("Required"),
  });
  const handleShownAuth = (e) => {
    e.preventDefault();
    setAuthenticated(true);
    setShow(false);
    navigate("/dashboard");
  };
  return (
    <div className="form-container sign-in-container d-flex flex-column align-items-center mt-5">
      <img src={Logo} alt="" className="brand-logo mb-4" />
      {!resetPassword ? (
        <Formik
          initialValues={{
            login_email: "",
            login_password: "",
          }}
          validationSchema={LoginFormSchema}
          onSubmit={(values) => {
            console.log(values);
            handleLoginSubmit(values);
          }}
        >
          {({
            errors,
            touched,
            handleChange,
            handleSubmit,
            handleBlur,
            values,
          }) => (
            <form action="#" onSubmit={handleLoginSubmit}>
              <h1>SIGN IN</h1>

              <span style={{ marginBottom: "6px", fontWeight: "bold" }}>
                OR
              </span>
              <Field
                component={CustomeInput}
                type="text"
                id="login_email"
                name="login_email"
                label_name="Email"
                handleChange={handleChange}
              />
              <Field
                component={CustomeInput}
                type="password"
                id="login_password"
                name="login_password"
                label_name="Password"
                handleChange={handleChange}
              />
              <a href="#" onClick={() => setResetPassword(true)}>
                Forgot your password?
              </a>
              <button
                type="button"
                className="authentication-btn mt-3"
                onClick={handleSubmit}
              >
                <span></span>
                <span></span>
                <span></span>
                <span></span>Sign In
              </button>
            </form>
          )}
        </Formik>
      ) : (
        <form onSubmit={handleResetPasswordSubmit}>
          <span
            class="material-icons back_arrow"
            onClick={() => setResetPassword(false)}
          >
            arrow_back_ios
          </span>
          <h1>Forgot Password?</h1>
          <p>Enter the email address associated with your account</p>
          <div className="form-input" style={{ marginBottom: "8px" }}>
            <input
              type="email"
              id="login_email"
              name="login_email"
              onChange={(e) => {
                setResetEmail(e.target.value);
                console.log(e.target.value);
              }}
              required
            />
            <label htmlFor="login_email" className="input_label">
              Email
            </label>
          </div>
          {resetEmailSent && (
            <p>Please check your email for password reset link</p>
          )}
          <button type="submit" className="authentication-btn mt-5">
            <span></span>
            <span></span>
            <span></span>
            <span></span>Reset Password
          </button>
        </form>
      )}
    </div>
  );
};

export default Login;
