import React, { useEffect } from "react";
import "./index.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();

  useEffect(() => {
    if (
      user.usertoken === "" ||
      user.usertoken === undefined ||
      user.usertoken === null
    ) {
      navigate("/");
    }
  }, []);
  return <div>Settings</div>;
};

export default Settings;
