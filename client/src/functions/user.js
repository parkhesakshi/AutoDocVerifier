import axios from "axios";

export const usersignUp = async (usersignupValues) => {
  return await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/api/register`, // this is the axios call to the backend to register the user to the database using the user id as the parameter to the function in the backend
    usersignupValues
  );
};

export const userlogin = async (userloginvalues) => {
  return await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/api/login`, // this is the axios call to the backend to login the user to the database using the user id as the parameter to the function in the backend
    userloginvalues
  );
};

export const usercurrent = async (token) => {
  return await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/api/current-user`, // this is the axios call to the backend to get the current user from the database using the user token as the parameter to the function in the backend
    { usertoken: token }
  );
};

export const useractivation = async (token) => {
  return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/activate`, {
    // this is the axios call to the backend to activate the user to the database using the user token as the parameter to the function in the backend
    token,
  });
};

export const userresetpassword = async (email) => {
  return await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/api/reset-password-mail`, // this is the axios call to the backend to reset the password of the user to the database using the user email as the parameter to the function in the backend
    { user_email: email }
  );
};

export const userresetpasswordwithtoken = async (token, password) => {
  return await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/api/reset-password
    `, // this is the axios call to the backend to reset the password of the user to the database using the user token as the parameter to the function in the backend
    { password, token }
  );
};

export const getUserById = async (userid) => {
  return await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/api/get-user-by-id/${userid}`
  );
};

export const updateUserBasicInfo = async (userbasicinfo) => {
  return await axios.put(
    `${process.env.REACT_APP_BACKEND_URL}/api/update-user-basic-info`,
    userbasicinfo
  );
};

export const updateUserIdentityAndAddressInfo = async (useridentityinfo) => {
  return await axios.put(
    `${process.env.REACT_APP_BACKEND_URL}/api/update-user-identity-and-address-info`,
    useridentityinfo
  );
};
