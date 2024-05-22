import React from "react";
import "./index.scss";
import { Field, Formik } from "formik";
import * as yup from "yup";
import CustomeInput from "../../../components/Common/CustomeInput";
import { updateUserBasicInfo } from "../../../functions/user";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BasicInfo = ({ currentUser }) => {
  const {
    first_name,
    last_name,
    email,
    phoneno,
    dob,
    username,
    age,
    gender,
    father_name,
  } = currentUser;
  const FormSchema = yup.object().shape({
    profile_first_name: yup
      .string()
      .min(3, "Must be 3 characters or more")
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    profile_last_name: yup
      .string()
      .min(3, "Must be 3 characters or more")
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    profile_father_name: yup.string().required("Required"),
    profile_dob: yup.string().required("Required"),
    profile_age: yup.string().required("Required"),
  });

  const handleBasicInfoFormSubmit = (values) => {
    const basicInfoData = { ...values, user_id: currentUser._id };
    updateUserBasicInfo(basicInfoData)
      .then((res) => {
        console.log(res);
        toast.success("Basic Info Updated Successfully");
      })
      .catch((err) => {});
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{
          profile_first_name: first_name,
          profile_last_name: last_name,
          profile_father_name: father_name || "",
          profile_email: email,
          profile_phoneno: phoneno,
          profile_dob: dob ? new Date(dob).toISOString().slice(0, 10) : "",
          profile_age: age,
          profile_username: username,
          profile_gender: gender,
        }}
        validationSchema={FormSchema}
        onSubmit={(values) => {
          console.log(values);
          handleBasicInfoFormSubmit(values);
        }}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
        }) => (
          <form action="" className="profile_basic_info_form">
            <div className="form_group">
              <Field
                component={CustomeInput}
                type="text"
                id="profile_first_name"
                name="profile_first_name"
                label_name=""
                value={values.profile_first_name}
                handleChange={handleChange}
              />
              <Field
                component={CustomeInput}
                type="text"
                id="profile_last_name"
                name="profile_last_name"
                label_name=""
                value={values.profile_last_name}
                handleChange={handleChange}
              />
            </div>
            <Field
              component={CustomeInput}
              type="text"
              placeholder="Father's Full Name"
              id="profile_father_name"
              name="profile_father_name"
              label_name=""
              value={values.profile_father_name}
              handleChange={handleChange}
            />
            <Field
              component={CustomeInput}
              type="text"
              id="profile_email"
              name="profile_email"
              label_name=""
              value={values.profile_email}
              handleChange={handleChange}
              readOnly
            />
            <Field
              component={CustomeInput}
              type="text"
              id="profile_phoneno"
              name="profile_phoneno"
              label_name=""
              value={values.profile_phoneno}
              handleChange={handleChange}
              readOnly
            />
            <div className="form_group">
              <Field
                component={CustomeInput}
                type="date"
                id="profile_dob"
                name="profile_dob"
                label_name=""
                value={values.profile_dob}
                handleChange={handleChange}
              />
              <Field
                component={CustomeInput}
                type="text"
                id="profile_age"
                name="profile_age"
                label_name=""
                value={values.profile_age}
                handleChange={handleChange}
              />
            </div>
            <div className="form_group">
              <div className="form_input">
                <input
                  type="radio"
                  id="profile_gender_male"
                  name="profile_gender"
                  checked={values.profile_gender === "Male"}
                />
                <label htmlFor="profile_gender_male">Male</label>
              </div>
              <div className="form_input">
                <input
                  type="radio"
                  id="profile_gender_female"
                  name="profile_gender"
                  checked={values.profile_gender === "Female"}
                />
                <label htmlFor="profile_gender_female">Female</label>
              </div>
            </div>
            <div
              className="profile_update_btn"
              onClick={handleSubmit}
              style={{ cursor: "pointer" }}
            >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Update
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default BasicInfo;
