import axios from "axios";

export const adminLogin = async (adminloginvalues) => {
  return await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/api/admin-login`, // this is the axios call to the backend to login the admin to the database using the admin id as the parameter to the function in the backend
    {
      login_email: adminloginvalues.admin_login_email,
      login_password: adminloginvalues.admin_login_password,
    }
  );
};
