import React from "react";
import "./index.scss";
import automated from "../../../assets/AboutUs/Automated.png";
import error from "../../../assets/AboutUs/Error.png";
import fake from "../../../assets/AboutUs/Fake.png";
import speed from "../../../assets/AboutUs/Speed.png";

const AboutUs = () => {
  return (
    <div id="about_us">
      <h1 className="section_title">About Us</h1>
      <div className="about_us_content">
        <p className="about_us_para">
          The traditional and manual document verification process is very time
          consuming and many manual error can happen during this process. This
          is the platform where the aforementioned drawbacks are fixed.
        </p>
        <div className="about_us_cards">
          <div
            className="about_us_card"
            // data-aos="zoom-in"
            // data-aos-delay="300"
            // // data-aos-offset="0"
          >
            <img src={automated} alt="" />
            <h3 className="about_us_card_title ">Automated Verification</h3>
            <p className="about_us_card_content av">
              To develop a automated verification system to make traditional
              method seamless.
            </p>
          </div>
          <div
            className="about_us_card"
            // data-aos="zoom-in"
            // data-aos-delay="600"
            // data-aos-offset="0"
          >
            <img src={fake} alt="" />
            <h3 className="about_us_card_title">Prevent Frauds</h3>
            <p className="about_us_card_content pf">
              To automatically recognize errors, duplicates and fraudulent
              documents.
            </p>
          </div>
          <div
            className="about_us_card"
            // data-aos="zoom-in"
            // data-aos-delay="900"
            // data-aos-offset="0"
          >
            <img src={speed} alt="" />
            <h3 className="about_us_card_title">Improve Speed</h3>
            <p className="about_us_card_content is">
              To process documents automatically within seconds to improve
              turnaround time.
            </p>
          </div>
          <div
            className="about_us_card"
            // data-aos="zoom-in"
            // data-aos-delay="1200"
            // data-aos-offset="0"
          >
            <img src={error} alt="" />
            <h3 className="about_us_card_title">Reduce Errors</h3>
            <p className="about_us_card_content re">
              To prevent manual errors with automated document verification.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
