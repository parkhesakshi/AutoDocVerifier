import React, { useEffect } from "react";
import "./login.scss";
import { Formik, Field } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import CustomeInput from "./CustomeInput";
import { adminLogin } from "../../functions/admin";
import { adminLoginReducer } from "../../reducers/adminReducer";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("admintoken")) {
      dispatch(
        adminLoginReducer({
          adminid: localStorage.getItem("adminid"),
          admintoken: localStorage.getItem("admintoken"),
          adminname: localStorage.getItem("adminname"),
          adminemail: localStorage.getItem("adminemail"),
          adminpicture: localStorage.getItem("adminpicture"),
          authenticated: true,
        })
      );
    }
  }, []);
  const LoginFormSchema = yup.object().shape({
    admin_login_email: yup
      .string()
      .email("Invalid email address")
      .required("Required"),
    admin_login_password: yup.string().required("Required"),
  });

  const handleAdminLoginSubmit = (values) => {
    adminLogin(values)
      .then((res) => {
        if (res.data.success) {
          dispatch(
            adminLoginReducer({
              adminid: res.data.id,
              admintoken: res.data.token,
              adminname: res.data.first_name + " " + res.data.last_name,
              adminemail: res.data.email,
              adminpicture: res.data.picture,
              authenticated: true,
            })
          );
          localStorage.setItem("adminid", res.data.id);
          localStorage.setItem("admintoken", res.data.token);
          localStorage.setItem(
            "adminname",
            res.data.first_name + " " + res.data.last_name
          );
          localStorage.setItem("adminemail", res.data.email);
          localStorage.setItem("adminpicture", res.data.picture);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="admin_login_container">
      <Formik
        initialValues={{
          admin_login_email: "",
          admin_login_password: "",
        }}
        validationSchema={LoginFormSchema}
        onSubmit={(values) => {
          handleAdminLoginSubmit(values);
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
          <form className="admin_login_form">
            <div className="admin_login_form_top">
              <div className="admin_login_form_logo">
                <span class="material-symbols-outlined">
                  supervisor_account
                </span>
              </div>
              <div className="admin_login_form_content">
                <Field
                  component={CustomeInput}
                  type="text"
                  id="admin_login_email"
                  name="admin_login_email"
                  icon_name="person"
                  placeholder="Email"
                  handleChange={handleChange}
                />
                <Field
                  component={CustomeInput}
                  type="password"
                  id="admin_login_password"
                  name="admin_login_password"
                  icon_name="lock"
                  placeholder="Password"
                  handleChange={handleChange}
                />
              </div>
            </div>
            <div className="admin_login_form_bottom" onClick={handleSubmit}>
              <p>Login</p>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
