import { combineReducers } from "@reduxjs/toolkit";
import adminReducer from "./adminReducer";
const rootReducer = combineReducers({
  admin: adminReducer,
});

export default rootReducer;
