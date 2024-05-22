import React from "react";
import "../BasicInfo/index.scss";
import { Field, Formik } from "formik";
import * as yup from "yup";
import CustomeInput from "../../../components/Common/CustomeInput";

const Password = () => {
  const FormSchema = yup.object().shape({
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
    <Formik
      enableReinitialize={true}
      initialValues={{
        current_password: "",
        new_password: "",
        confirm_password: "",
      }}
      validationSchema={FormSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ values, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
        <form action="" className="profile_password_form">
          <Field
            component={CustomeInput}
            type="text"
            placeholder="Current Password"
            id="current_password"
            name="current_password"
            label_name=""
            handleChange={handleChange}
          />
          <Field
            component={CustomeInput}
            type="text"
            placeholder="New Password"
            id="new_password"
            name="new_password"
            label_name=""
            handleChange={handleChange}
          />
          <Field
            component={CustomeInput}
            type="text"
            placeholder="Confirm Password"
            id="confirm_password"
            name="confirm_password"
            label_name=""
            handleChange={handleChange}
          />
          <div
            className="profile_update_btn"
            onClick={handleSubmit}
            style={{ cursor: "pointer" }}
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Save Password
          </div>
        </form>
      )}
    </Formik>
  );
};

export default Password;
