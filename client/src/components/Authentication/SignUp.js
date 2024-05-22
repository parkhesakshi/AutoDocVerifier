import React from "react";
import { Field, Formik } from "formik";
import * as yup from "yup";
import Logo from "../../assets/logo.png";
import google_logo from "../../assets/icons/google_logo.png";
import CustomeInput from "../Common/CustomeInput";

const SignUp = ({ handleSignUpSubmit }) => {
  const FormSchema = yup.object().shape({
    username: yup
      .string()
      .min(3, "Must be 3 characters or more")
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    first_name: yup
      .string()
      .min(3, "Must be 3 characters or more")
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    last_name: yup
      .string()
      .min(3, "Must be 3 characters or more")
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    dob: yup.string().required("Required"),
    gender: yup.string().required("Required"),
    phoneno: yup
      .string()
      .min(10, "Must be 10 characters or more")
      .max(10, "Must be 10 characters or less")
      .required("Required"),
    email: yup.string().email("Invalid email address").required("Required"),
    password: yup
      .string()
      .min(8, "Password must be 8 characters long")
      .matches(/[0-9]/, "Password requires a number")
      .matches(/[a-z]/, "Password requires a lowercase letter")
      .matches(/[A-Z]/, "Password requires an uppercase letter")
      .matches(/[^\w]/, "Password requires a symbol")
      .required("Required"),
  });

  return (
    <div className="form-container sign-up-container mt-4 d-flex flex-column align-items-center">
      <img src={Logo} alt="" className="brand-logo" />
      <Formik
        initialValues={{
          username: "",
          first_name: "",
          last_name: "",
          dob: "",
          gender: "",
          phoneno: "",
          email: "",
          password: "",
        }}
        validationSchema={FormSchema}
        onSubmit={(values) => {
          console.log(values);
          handleSignUpSubmit(values);
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
          <form>
            <h1>Create Account</h1>
            <div className="social-container">
              <a href="#" className="social">
                <img src={google_logo} alt="" />
              </a>
            </div>
            <span style={{ marginBottom: "6px", fontWeight: "bold" }}>OR</span>
            {/* <div>{JSON.stringify(values)}</div> */}
            <div className="d-flex w-100 mb-2">
              <Field
                component={CustomeInput}
                type="text"
                id="first_name"
                name="first_name"
                label_name="First Name"
                handleChange={handleChange}
              />
              <Field
                component={CustomeInput}
                type="text"
                id="last_name"
                name="last_name"
                label_name="Last Name"
                handleChange={handleChange}
              />
            </div>
            <Field
              component={CustomeInput}
              type="email"
              id="email"
              name="email"
              label_name="Email"
              handleChange={handleChange}
            />
            <Field
              component={CustomeInput}
              type="tel"
              id="phoneno"
              name="phoneno"
              label_name="Phone Number"
              handleChange={handleChange}
            />
            <div className="d-flex w-100 mb-2">
              <Field
                component={CustomeInput}
                type="date"
                id="dob"
                name="dob"
                handleChange={handleChange}
              />
              <div className="form-input d-flex align-items-center justify-content-evenly">
                <input
                  type="radio"
                  className="gender male"
                  id="gender-male"
                  name="gender"
                  value="Male"
                  onChange={(e) => handleChange("gender")(e.target.value)}
                />
                <label htmlFor="gender-male">
                  <img src="https://img.icons8.com/3d-fluency/40/null/user-male.png" />
                  <span className="material-icons">check</span>
                </label>
                <input
                  type="radio"
                  className="gender male"
                  id="gender-female"
                  name="gender"
                  value="Female"
                  onChange={(e) => handleChange("gender")(e.target.value)}
                />
                <label htmlFor="gender-female">
                  <img src="https://img.icons8.com/3d-fluency/40/null/user-female.png" />
                  <span className="material-icons">check</span>
                </label>
              </div>
            </div>
            <Field
              component={CustomeInput}
              type="text"
              id="username"
              name="username"
              label_name="Username"
              handleChange={handleChange}
            />
            <Field
              component={CustomeInput}
              type="password"
              id="password"
              name="password"
              label_name="Password"
              handleChange={handleChange}
            />
            <button
              type="button"
              className="authentication-btn mt-2"
              onClick={handleSubmit}
            >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Sign Up
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
