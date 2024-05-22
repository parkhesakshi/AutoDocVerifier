import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Initial state of the user slice
  userid: "",
  usertoken: "",
  username: "",
  useremail: "",
  userpicture: "",
  authenticated: false,
};
const userSlice = createSlice({
  // Create a slice of the user state
  name: "user",
  initialState,
  reducers: {
    // Reducers for the user slice of the state
    userLogin: (state, action) => {
      // Reducer for user login
      state.userid = action.payload.userid; // Set the user id to the payload id
      state.usertoken = action.payload.usertoken;
      state.username = action.payload.username;
      state.useremail = action.payload.useremail;
      state.userpicture = action.payload.userpicture;
      state.authenticated = action.payload.authenticated;
    },
    userLogout: (state, action) => {
      // Reducer for user logout
      state.userid = "";
      state.usertoken = "";
      state.username = "";
      state.useremail = "";
      state.userpicture = "";
      state.authenticated = false;
    },

    userUpdate: (state, action) => {
      // Reducer for user update
      state.userid = action.payload.userid; // Set the user id to the payload id
      state.usertoken = action.payload.usertoken;
      state.username = action.payload.username;
      state.useremail = action.payload.useremail;
      state.userpicture = action.payload.userpicture;
      state.authenticated = action.payload.authenticated;
    },

    userUpdatePicture: (state, action) => {
      // Reducer for user update picture
      state.userpicture = action.payload.userpicture;
    },
  },
});

export const { userLogin, userLogout, userUpdate, userUpdatePicture } =
  userSlice.actions; // Export the reducers

export default userSlice.reducer;
