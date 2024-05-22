import React, { useState } from "react";
import "./index.scss";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
  useractivation,
  userresetpasswordwithtoken,
} from "../../functions/user";

const ResetPassword = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [passwordSucessfully, setPasswordSucessfully] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();
  const checkPassword = () => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/;
    if (passwordRegex.test(newPassword)) {
      return true;
    } else {
      return false;
    }
  };

  const checkConfirmedPassword = () => {
    const confirmedPassword = document.getElementById(
      "user_confirmPassword"
    ).value;
    if (confirmedPassword === newPassword) {
      return true;
    } else {
      return false;
    }
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    const newpasswordError = document.querySelector(".newpassword_error");
    const confirmedpasswordError = document.querySelector(
      ".confirmedpassword_error"
    );
    if (checkPassword()) {
      if (checkConfirmedPassword()) {
        confirmedpasswordError.innerHTML = "Password matched";
        confirmedpasswordError.style.color = "green";
        userresetpasswordwithtoken(token, newPassword)
          .then((res) => {
            if (res.data.success) {
              setPasswordSucessfully(res.data.success);
              setTimeout(() => {
                navigate("/");
              }, 2000);
            }
          })
          .catch((err) => {
            console.log(err.response.data);
          });
      } else {
        confirmedpasswordError.innerHTML = "Password does not match";
        confirmedpasswordError.style.color = "red";
      }
    } else {
      newpasswordError.innerHTML = "Password is not valid";
      newpasswordError.style.color = "red";
    }
  };

  return (
    <div className="resetpassword_container">
      <div className="resetpassword_form_container">
        <h3 className="resetpassword_form_title">Reset Password</h3>
        <p className="resetpassword_form_subtitle">
          Password must contains one lowercase, one upparcase, one special
          character and atleast 6 charachters long
        </p>
        <form className="resetpassword_form">
          <div className="form-group">
            <label htmlFor="user_newpassword">New Password</label>
            <input
              onChange={(e) => setNewPassword(e.target.value)}
              type={passwordVisibility ? "text" : "password"}
              name="user_newpassword"
              id="user_newpassword"
            />
            <label className="newpassword_error"></label>
            <span
              class="material-icons password_visibility"
              onClick={() => setPasswordVisibility(!passwordVisibility)}
            >
              {passwordVisibility ? "visibility" : "visibility_off"}
            </span>
          </div>
          <div className="form-group">
            <label htmlFor="user_confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="user_confirmPassword"
              id="user_confirmPassword"
            />
            <label className="confirmedpassword_error"></label>
          </div>
          <p>{passwordSucessfully && "Password Reset Successfully"}</p>
          <div className="set_newpassword_btn" onClick={handleResetPassword}>
            Save Password
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
