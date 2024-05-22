import React, { useState } from "react";
import "../BasicInfo/index.scss";
import axios from "axios";
import { Field, Formik } from "formik";
import * as yup from "yup";
import { DebounceInput } from "react-debounce-input";
import { FadeLoader } from "react-spinners";
import CustomeInput from "../../../components/Common/CustomeInput";
import {
  updateUserBasicInfo,
  updateUserIdentityAndAddressInfo,
} from "../../../functions/user";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const IndentityAndAddress = ({ currentUser }) => {
  const {
    addharno,
    pan,
    address1,
    address2,
    address_city,
    address_landmark,
    address_pincode,
    address_state,
    address_district,
  } = currentUser;
  console.log(currentUser);
  const [pinCode, setPinCode] = useState(null);
  const [city, setCity] = useState(null);
  const [district, setDistrict] = useState(null);
  const [state, setState] = useState(null);

  const getInfoByPincode = async (pincode) => {
    if (!pincode) {
      return;
    }
    if (pincode.length < 6) {
      return;
    }
    await axios
      .get(`https://api.postalpincode.in/pincode/${pincode}`)
      .then((res) => {
        console.log("PINCODE", res.data);
        setPinCode(pincode);
        setCity(res.data[0].PostOffice[0].Block);
        setDistrict(res.data[0].PostOffice[0].District);
        setState(res.data[0].PostOffice[0].State);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleIdentityAndAddressFormSubmit = (values) => {
    const identityAndAddressData = { ...values, user_id: currentUser._id };
    updateUserIdentityAndAddressInfo(identityAndAddressData)
      .then((res) => {
        console.log(res);
        toast.success("Identity and Address Info Updated Successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{
          profile_addharcard_number: addharno || "",
          profile_pan_number: pan || "",
          profile_address1: address1 || "",
          profile_address2: address2 || "",
          profile_address_landmark: address_landmark || "",
          profile_address_pincode: address_pincode || pinCode || "",
          profile_address_city: address_city || city || "",
          profile_address_district: address_district || district || "",
          profile_address_state: address_state || state || "",
        }}
        onSubmit={(values) => {
          console.log(values);
          handleIdentityAndAddressFormSubmit(values);
        }}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
        }) => (
          <form action="" className="profile_identity_address_form">
            <h5>User Identity</h5>
            <div className="form_group">
              <Field
                component={CustomeInput}
                type="text"
                id="profile_addharcard_number"
                name="profile_addharcard_number"
                placeholder="Addhar Number"
                minLength="12"
                maxLength="12"
                value={values.profile_addharcard_number}
                handleChange={handleChange}
              />

              <Field
                component={CustomeInput}
                type="text"
                id="profile_pan_number"
                name="profile_pan_number"
                placeholder="PAN(Optional)"
                minLength="10"
                maxLength="10"
                value={values.profile_pan_number}
                handleChange={handleChange}
              />
            </div>
            <h5>Address</h5>

            <Field
              component={CustomeInput}
              type="text"
              id="profile_address1"
              name="profile_address1"
              placeholder="Floor/building/apartment"
              value={values.profile_address1}
              handleChange={handleChange}
            />

            <Field
              component={CustomeInput}
              type="text"
              id="profile_address2"
              name="profile_address2"
              placeholder="Street/area/locality"
              value={values.profile_address2}
              handleChange={handleChange}
            />

            <Field
              component={CustomeInput}
              type="text"
              id="profile_address_landmark"
              name="profile_address_landmark"
              placeholder="Landmark"
              value={values.profile_address_landmark}
              handleChange={handleChange}
            />

            <div className="form_group">
              <div className="form-input">
                <input
                  type="text"
                  minLength={2}
                  id="profile_address_pincode"
                  name="profile_address_pincode"
                  placeholder="Pin Code"
                  debounceTimeout={1000}
                  onChange={(event) => {
                    handleChange("profile_address_pincode")(event.target.value);
                  }}
                  value={values.profile_address_pincode}
                />
                {/* <DebounceInput
                minLength={2}
                type="text"
                id="profile_address_pincode"
                name="profile_address_pincode"
                placeholder="Pin Code"
                debounceTimeout={1000}
                onChange={(event) => {
                  getInfoByPincode(event.target.value);
                  console.log(event.target.value);
                  handleChange("profile_address_pincode")(event.target.value);
                  console.log("adslf", values.profile_address_pincode);
                  // setFieldValue("profile_address_pincode", event.target.value);
                }}
                value={values.profile_address_pincode}
              /> */}
              </div>

              <Field
                component={CustomeInput}
                type="text"
                id="profile_address_city"
                name="profile_address_city"
                placeholder="City"
                value={values.profile_address_city}
                handleChange={handleChange}
              />
            </div>
            <div className="form_group">
              <Field
                component={CustomeInput}
                type="text"
                id="profile_address_district"
                name="profile_address_district"
                placeholder="District"
                value={values.profile_address_district}
                handleChange={handleChange}
              />

              <Field
                component={CustomeInput}
                type="text"
                id="profile_address_state"
                name="profile_address_state"
                placeholder="State"
                value={values.profile_address_state}
                handleChange={handleChange}
              />
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

export default IndentityAndAddress;
