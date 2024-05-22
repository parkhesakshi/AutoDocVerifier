import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../../functions/getUserData";
import "./UserInfo.scss";
import { ScaleLoader } from "react-spinners";
const UserInfo = () => {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState({});

  const [userInfoLoading, setUserInfoLoading] = useState(false);

  useEffect(() => {
    getUserInfo();
  }, [id]);

  const getUserInfo = () => {
    setUserInfoLoading(true);
    setTimeout(() => {
      getUserById(id)
        .then((res) => {
          if (res.status === 200) {
            setUserInfoLoading(false);
            setUserInfo(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }, 1000);
  };

  const onGoBack = () => {
    window.history.back();
  };
  const getUserDOB = () => {
    const date = new Date(userInfo.dob);
    return `${date.getDate()} ${date.toLocaleDateString("default", {
      month: "short",
    })} ${date.getFullYear()}`;
  };

  const getUserAge = () => {
    const date = new Date(userInfo.dob);
    const today = new Date();
    let age = today.getFullYear() - date.getFullYear();
    const m = today.getMonth() - date.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
      age -= 1;
    }
    return age;
  };

  return (
    <>
      {userInfoLoading && (
        <div className="user_info_loader">
          <ScaleLoader color="#586665" height={20} />
        </div>
      )}
      {!userInfoLoading && (
        <div className="user_info_container" data-aos="zoom-in">
          <div className="go_back" onClick={onGoBack}>
            <span className="material-symbols-outlined">arrow_back</span>
            <h6>Go Back</h6>
          </div>
          <div className="user_info_upper">
            <div className="user_avatar">
              <img src={userInfo.picture} alt="user_avatar" />
            </div>
            <div className="user_information">
              <div className="user_info_top">
                <h5 className="info_title">
                  {userInfo.first_name + " " + userInfo.last_name}
                </h5>
                <p>@{userInfo.username}</p>
              </div>
              <div className="user_info_bottom">
                <div className="user_info">
                  <h5 className="info_lable">Email</h5>
                  <p className="info_value">{userInfo.email}</p>
                </div>
                <div className="user_info">
                  <h5 className="info_lable">Phone No.</h5>
                  <h5 className="info_value">{userInfo.phoneno}</h5>
                </div>
                <div className="user_info">
                  <h5 className="info_lable">Date of Birth</h5>
                  <h5 className="info_value">{getUserDOB()}</h5>
                </div>
                <div className="user_info">
                  <h5 className="info_lable">Age</h5>
                  <h5 className="info_value">{getUserAge()}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserInfo;
