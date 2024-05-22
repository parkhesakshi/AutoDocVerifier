const nodemailer = require("nodemailer");

const { EMAIL, APP_ID, APP_SECRET, APP_REFRESH, HOST, EMAIL_PASSWORD } =
  process.env;

exports.sendVerificationEmail = (email, name, url) => {
  const smtp = nodemailer.createTransport({
    host: HOST,
    port: 465,
    secure: true,
    auth: {
      user: EMAIL,
      pass: EMAIL_PASSWORD,
    },
  });
  const mailOptions = {
    from: EMAIL,
    to: email,
    subject: "AutoDocVerifier Email Verification",
    html: `    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      @import url("https://fonts.googleapis.com/css2?family=Roboto+Serif:opsz,wght@8..144,100;8..144,200;8..144,300;8..144,400;8..144,500;8..144,600;8..144,700;8..144,800;8..144,900&display=swap");
      * {
        font-family: "Roboto Serif";
      }
      @media screen and (max-width: 600px) {
        table {
          width: 95% !important;
        }
      }
    </style>
  </head>
  <body>
    <div
      style="
        background-color: #f6f6f6;
        font-family: Ubuntu;
        position: relative;
        width: 100%;
        height: 100%;
        padding: 30px 0px 10px 0px;
      "
    >
      <table
        style="
          width: 40%;
          height: 35rem;
          padding: 10px;
          margin: 20px auto;
          border-spacing: 0px;
        "
      >
        <tr>
          <td
            style="
              display: grid;
              grid-template-columns: auto;
              height: 100%;
              padding: 5px;
              background-color: #ffffff;
            "
          >
            <img
              style="height: 80px; width: 130px; margin: 0px auto"
              src="https://res.cloudinary.com/abhisonar0130/image/upload/v1674407184/AutoDocVerifier/Assets/logo_df0k8h.png"
              alt="logo"
            />
          </td>
        </tr>
        <tr>
          <td
            style="
              display: grid;
              grid-template-columns: auto;
              justify-items: center;
              height:18rem;
              padding: 5px;
              background-color: #ffffff;
            "
          >
            <h2 style="margin: 10px 0px 5px 0px; text-align: center">
              Thanking for signing up,
            </h2>
            <h2 style="margin: 0px 0px 5px 0px; text-align: center">${name}</h2>
            <p
              style="
                margin: 0px 0px 5px 0px;
                margin-top: 12px;
                text-align: center;
              "
            >
              Please verify your email by clicking the button below.
            </p>
            <p
              style="
                margin: 0px 0px 5px 0px;
                color: #ffbe00;
                font-weight: bold;
                text-align: center;
              "
            >
              Thank you!
            </p>
            <a
              href=${url}
              style="
                margin: 0px auto;
                text-decoration: none;
                height: fit-content;
                padding: 20px 30px;
                background-color: #00aa55;
                color: #ffffff;
              "
              >Verify Email Now</a
            >
          </td>
        </tr>
        <tr>
          <td
            style="
              display: grid;
              grid-template-columns: auto;
              height: 100%;
              padding: 10px;
              background-color: #7d7d7d;
            "
          >
            <p style="text-align: center; color: #ffffff; margin-top: 5px">
              Here's what happens next:
            </p>
            <p
              style="
                text-align: center;
                color: rgb(201, 196, 196);
                margin: 5px 5px;
              "
            >
              1. You will be redirected to the login page.
            </p>
            <p
              style="
                text-align: center;
                color: rgb(201, 196, 196);
                margin: 5px 5px;
              "
            >
              2. You will be able to login with your email and password.
            </p>
            <p
              style="
                text-align: center;
                color: rgb(201, 196, 196);
                margin: 5px 5px;
              "
            >
              3. You will be able to access all the features of AutoDocVerifier.
            </p>
            <p
              style="
                text-align: center;
                color: rgb(201, 196, 196);
                margin: 5px 5px;
              "
            >
              4. Go to "DocVerifier" section, upload the document
            </p>
            <p
              style="
                text-align: center;
                color: rgb(201, 196, 196);
                margin: 5px 5px;
              "
            >
              5. You will be able to see the verification status of the
              document.
            </p>
          </td>
        </tr>
      </table>
    </div>
  </body>
</html>
`,
  };
  smtp.sendMail(mailOptions, (err, res) => {
    if (err) return err;
    return res;
  });
};

module.exports.sendResetPasswordEmail = (email, url) => {
  const smtp = nodemailer.createTransport({
    host: HOST,
    port: 465,
    secure: true,
    auth: {
      user: EMAIL,
      pass: EMAIL_PASSWORD,
    },
  });
  const mailOptions = {
    from: EMAIL,
    to: email,
    subject: "AutoDocVerifier Password Reset",
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      @import url("https://fonts.googleapis.com/css2?family=Roboto+Serif:opsz,wght@8..144,100;8..144,200;8..144,300;8..144,400;8..144,500;8..144,600;8..144,700;8..144,800;8..144,900&display=swap");
      * {
        font-family: "Roboto Serif";
      }
      @media screen and (max-width: 600px) {
        table {
          width: 95% !important;
        }
      }
    </style>
  </head>
  <body>
    <div
      style="
        background-color: #f6f6f6;
        font-family: Ubuntu;
        position: relative;
        width: 100%;
        height: 100%;
        padding: 30px 0px 10px 0px;
      "
    >
      <table
        style="
          width: 40%;
          height: 35rem;
          padding: 10px;
          margin: 20px auto;
          border-spacing: 0px;
        "
      >
        <tr>
          <td
            style="
              display: grid;
              grid-template-columns: auto;
              height: 100%;
              padding: 5px;
              background-color: #ffffff;
            "
          >
            <img
              style="height: 80px; width: 130px; margin: 0px auto"
              src="https://res.cloudinary.com/abhisonar0130/image/upload/v1674407184/AutoDocVerifier/Assets/logo_df0k8h.png"
              alt="logo"
            />
          </td>
        </tr>
        <tr>
          <td
            style="
              display: grid;
              grid-template-columns: auto;
              justify-items: center;
              height: 20rem;
              padding: 5px;
              background-color: #ffffff;
            "
          >
            <h2 style="margin: 10px 0px 5px 0px; text-align: center">
              You have requested to reset your password
            </h2>

            <p
              style="
                margin: 0px 0px 5px 0px;
                margin-top: 12px;
                text-align: center;
              "
            >
              We cannot simply send you your old password. A unique link to
              reset your password has been generated for you. To reset your
              password, click the following link.
            </p>
            <p
              style="
                margin: 0px 0px 5px 0px;
                color: #ffbe00;
                font-weight: bold;
                text-align: center;
              "
            >
              Thank you!
            </p>
            <a
              href=${url}
              style="
                margin: 0px auto;
                text-decoration: none;
                height: fit-content;
                padding: 20px 30px;
                background-color: #00aa55;
                color: #ffffff;
              "
              >Reset Password</a
            >
          </td>
        </tr>

      </table>
    </div>
  </body>
</html>
`,
  };
  smtp.sendMail(mailOptions, (err, res) => {
    if (err) return err;
    return res;
  });
};
