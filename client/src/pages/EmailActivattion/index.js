import React, { useEffect, useState } from "react";
import "./index.scss";
import { NavLink, useParams } from "react-router-dom";
import { useractivation } from "../../functions/user";
import { DotLoader } from "react-spinners";
const EmailActivation = () => {
  const [emailActivated, setEmailActivated] = useState(false);
  const [alreadyActivated, setalreadyActivated] = useState(false);
  const { token } = useParams();
  const [message, setmessage] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      useractivation(token)
        .then((res) => {
          setLoading(false);
          if (res.data.emailActivated) {
            console.log(res.data);
            setEmailActivated(true);
            setmessage(res.data.message);
          }
        })
        .catch((err) => {
          setLoading(false);
          if (err.response.data.alreadyActivated) {
            setmessage(err.response.data.message);
            setLoading(false);
            setalreadyActivated(true);
          }
        });
    }, 3000);
  }, []);

  const handleEmailActivation = () => {
    if (emailActivated) {
      return (
        <>
          <p>{message}</p>
          <NavLink to="/" className="back_to_login_btn">
            Back to Login
          </NavLink>
        </>
      );
    }
    if (alreadyActivated) {
      return (
        <>
          <p>{message}</p>
          <NavLink to="/" className="back_to_login_btn">
            Back to Login
          </NavLink>
        </>
      );
    }
  };

  return (
    <div className="email_activation">
      {/* {handleEmailActivation()} */}
      {loading ? (
        <>
          <DotLoader color="#00aa55" />
          <p>Your email is activating.... Please wait for a moment</p>
          <p style={{ opacity: 0.5 }}>do not close the window</p>
        </>
      ) : (
        handleEmailActivation()
      )}
    </div>
  );
};

export default EmailActivation;
