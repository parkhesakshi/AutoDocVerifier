import React, { useEffect, useState } from "react";
import "./index.scss";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Tab, Nav } from "react-bootstrap";
import BasicInfo from "./BasicInfo";
import IdentityAndAddress from "./IdentityandAddress";
import Password from "./Password";
import { getUserById } from "../../functions/user";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import { userUpdatePicture } from "../../reducers/userReducer";

const Profile = () => {
  const { userid } = useSelector((state) => state.user);
  const [currentUser, setCurrentUser] = useState({});
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    console.log(userid);
    getCurrentUser();
  }, [userid]);

  const getCurrentUser = () => {
    if (userid) {
      getUserById(userid)
        .then((res) => {
          console.log(res.data);
          setCurrentUser(res.data);
        })
        .catch((err) => console.log(err));
    }
  };

  const FileUploadAndResize = (e) => {
    // resize
    let files = e.target.files;
    if (files) {
      setUploading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            // send back to server to upload to cloudinary
            axios
              .post(
                `${process.env.REACT_APP_BACKEND_URL}/api/upload-user-profile-pic`,
                {
                  profile_pic: uri,
                  user_id: userid,
                }
              )
              .then((res) => {
                console.log("IMAGE UPLOAD RES DATA", res);
                setUploading(false);
                getCurrentUser();
                dispatch(
                  userUpdatePicture({ userpicture: currentUser.picture })
                );
                // set url to images[] in the parent component state - ProductCreateForm
              })
              .catch((err) => {
                setUploading(false);

                console.log("CLOUDINARY UPLOAD ERROR:", err);
              });
          },
          "base64"
        );
      }
    }
  };

  return (
    <div className="profile_container">
      <div className="profile_container_top"></div>
      <div className="profile_container_bottom"></div>
      <Tab.Container
        id="profile_tab"
        className="profile_container_card"
        defaultActiveKey="first"
      >
        <div className="profile_container_row  d-flex">
          <div className="profile_container_col">
            <div className="user_profile">
              <div className="user_profile_image">
                <input
                  onChange={FileUploadAndResize}
                  type="file"
                  id="user_profile_pic_input"
                  hidden
                  name="user_profile_pic_input"
                />
                <label htmlFor="user_profile_pic_input">
                  {uploading && (
                    <RotatingLines
                      strokeColor="grey"
                      strokeWidth="5"
                      animationDuration="0.75"
                      width="30"
                      visible={true}
                    />
                  )}
                  <img src={currentUser.picture} alt="" />
                </label>
              </div>
              <div className="user_profile_name">
                {currentUser.first_name} {currentUser.last_name}
              </div>
            </div>
            <Nav className="flex-column profile_nav">
              <Nav.Item>
                <Nav.Link eventKey="first">Basic Info</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">Identity & Address</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="third">Password</Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
          <div className="profile_container_content">
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <BasicInfo currentUser={currentUser} />
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <IdentityAndAddress currentUser={currentUser} />
              </Tab.Pane>
              <Tab.Pane eventKey="third">
                <Password currentUser={currentUser} />
              </Tab.Pane>
            </Tab.Content>
          </div>
        </div>
      </Tab.Container>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default Profile;
