import axios from "axios";

export const getDocuments = async (userID) => {
  return axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/getDocuments`, {
    // this is the axios call to the backend to get the documents of the user from the database using the user id as the parameter to the function in the backend
    userID,
  });
};

export const getDocCodes = async () => {
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/get-doc-codes`);
};
