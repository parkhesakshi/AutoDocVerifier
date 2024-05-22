import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Initial state of the admin slice
  adminid: "",
  admintoken: "",
  adminname: "",
  adminemail: "",
  adminpicture: "",
  authenticated: false,
};
const adminSlice = createSlice({
  // Create a slice of theadmin state
  name: "admin",
  initialState,
  reducers: {
    // Reducers for theadmin slice of the state
    adminLoginReducer: (state, action) => {
      // Reducer foradmin login
      state.adminid = action.payload.adminid; // Set theadmin id to the payload id
      state.admintoken = action.payload.admintoken;
      state.adminname = action.payload.adminname;
      state.adminemail = action.payload.adminemail;
      state.adminpicture = action.payload.adminpicture;
      state.authenticated = action.payload.authenticated;
    },
    adminLogoutReducer: (state, action) => {
      // Reducer foradmin logout
      state.adminid = "";
      state.admintoken = "";
      state.adminname = "";
      state.adminemail = "";
      state.adminpicture = "";
      state.authenticated = false;
    },
  },
});

export const { adminLoginReducer, adminLogoutReducer } = adminSlice.actions; // Export the reducers

export default adminSlice.reducer;
