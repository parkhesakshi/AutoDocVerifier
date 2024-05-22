import axios from "axios";

export const getAllUsers = async () => {
  return await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/api/get-all-users`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("admintoken")}`,
      },
    }
  );
};

export const getUserById = async (userid) => {
  return await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/api/get-user-by-id-token`,
    { userid },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("admintoken")}`,
      },
    }
  );
};
