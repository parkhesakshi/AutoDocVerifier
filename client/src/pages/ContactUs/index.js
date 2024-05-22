import React from "react";
import "./index.scss";
import contactus from "../../assets/ContactUs/contact-us.png";
const ContactUs = () => {
  return (
    <div className="contact-us">
      <div className="contact-us-bg">
        <div class="custom-shape-divider-bottom-1675889872">
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
      <div className="contact-us-container">
        <div className="contact-us_header">
          <h1 className="contact-us_header_title">Have Some Question?</h1>
          <p className="contact-us_header_subtitle">
            Thank you for your interest. Please fill out the form below or email
            us at help@autodocverifier.com and we will get back to you promptly
            regarding your request.
          </p>
        </div>
        <div className="contact-us_content">
          <div className="contact-us_content_left">
            <img src={contactus} alt="" />
            <div className="contact-us_content_left_get_in_touch">
              <h1 className="contact-us_content_left_get_in_touch_title">
                Get in touch
              </h1>
              <div className="get_in_touch_list">
                <span class="material-icons">mail</span>
                <p>help@autodocverifier.com</p>
              </div>
            </div>
          </div>
          <form className="contact-us_content_right">
            <div className="form-input" style={{ marginBottom: "8px" }}>
              <input
                type="text"
                id="contact_us_first_name"
                name="contact_us_first_name"
                // onChange={handleLoginChange}
              />
              <label htmlFor="contact_us_first_name" className="input_label">
                First Name
              </label>
            </div>
            <div className="form-input" style={{ marginBottom: "8px" }}>
              <input
                type="text"
                id="contact_us_last_name"
                name="contact_us_last_name"
                // onChange={handleLoginChange}
              />
              <label htmlFor="contact_us_last_name" className="input_label">
                Last Name
              </label>
            </div>
            <div className="form-input" style={{ marginBottom: "8px" }}>
              <input
                type="tel"
                minLength={10}
                maxLength={10}
                id="contact_us_mobile"
                name="contact_us_mobile"
                // onChange={handleLoginChange}
              />
              <label htmlFor="contact_us_mobile" className="input_label">
                Mobile No
              </label>
            </div>
            <div className="form-input" style={{ marginBottom: "8px" }}>
              <input
                type="email"
                id="contact_us_email"
                name="contact_us_email"
                // onChange={handleLoginChange}
              />
              <label htmlFor="contact_us_email" className="input_label">
                Email
              </label>
            </div>
            <div className="form-input" style={{ marginBottom: "8px" }}>
              <input
                type="text"
                id="contact_us_message"
                name="contact_us_message"
                // onChange={handleLoginChange}
              />
              <label htmlFor="contact_us_message" className="input_label">
                Message
              </label>
            </div>
            <button type="submit" className="authentication-btn mt-2">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
