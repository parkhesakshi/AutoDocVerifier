import React, { useEffect } from "react";
import "./index.scss";
import scanning from "../../assets/gif/Scanning.gif";
import uploading from "../../assets/gif/Uploading.gif";
import successgif from "../../assets/gif/successGIF.gif";
import AboutUs from "./AboutUs";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { usercurrent } from "../../functions/user";
import { userLogin } from "../../reducers/userReducer";

const Home = () => {
  const [text] = useTypewriter({
    words: ["Seamless !", "Time Efficient !", "Securely !"],
    loop: 0,
  });
  const dispatch = useDispatch();
  const { authenticated } = useSelector((state) => state.user);
  const token = localStorage.getItem("usertoken");
  const navigate = useNavigate();
  useEffect(() => {
    if (token && !authenticated) {
      usercurrent(token)
        .then((res) => {
          if (res.data.success) {
            dispatch(
              userLogin({
                userid: res.data.id,
                usertoken: res.data.token,
                username: res.data.username,
                useremail: res.data.useremail,
                authenticated: true,
              })
            );
            navigate("/verification");
          }
        })
        .catch((err) => {
          if (err.response.data.notExist) {
            localStorage.clear();
          }
        });
    }
  }, [token]);

  const handlegetstarted = () => {
    if (authenticated) {
      navigate("/verification");
    }
  };
  return (
    <div className="home_page">
      <div id="hero">
        <div className="hero_content">
          <h1> Make Your Document</h1>
          <h1>
            Verification <span>{text} </span>
            <Cursor cursorColor="#00aa55" />
          </h1>
          <div className="getstarted_btn">
            <p> Get Started</p>
            <span class="material-icons">arrow_right_alt</span>
          </div>
        </div>

        <div className="hero_img">
          <img
            src="https://res.cloudinary.com/abhisonar0130/image/upload/v1675191190/AutoDocVerifier/Assets/Home_Page_yfhtoy.png"
            alt="#"
          />
          <img src={uploading} alt="" className="hero_gif uploading_gif" />
          {/* <img src={scanning} alt="" className="hero_gif scanning_gif" /> */}
          <img src={successgif} alt="" className="hero_gif success_gif" />
        </div>
        <div class="custom-shape-divider-bottom-1675363037">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              class="shape-fill"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              class="shape-fill"
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              class="shape-fill"
            ></path>
          </svg>
        </div>
      </div>
      <AboutUs />
      <div id="how_it_works">
        <h1 className="section_title">How it works</h1>
        <div className="how_it_works_content">
          <p>Follow the steps to verify your document</p>
          <div class="container">
            <div class="card_box">
              <span data-label="Step 1"></span>
              <p className="step_content">
                Register yourself at AutoDocVerifier and get your documents
                verified.
              </p>
            </div>
            <div class="card_box">
              <span data-label="Step 2"></span>
              <p className="step_content">
                You will be able to login with your registered email and
                password.
              </p>
            </div>
            <div class="card_box">
              <span data-label="Step 3"></span>
              <p className="step_content">
                Go to "DocVerifier" and upload your documents, now click on
                "Verify" button to verify your documents.
              </p>
            </div>
            <div class="card_box">
              <span data-label="Step 4"></span>
              <p className="step_content">
                After clicking on "Verify" button, you will be able to see the
                verification status of your documents.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
