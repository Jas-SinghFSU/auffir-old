//This file stores all the different types of data in the redux "store" for usage
//combineReduces takes all the different reduces and combines them into one redux object
import { combineReducers } from "redux";
import jobs from "./jobs";
import auth from "./auth";
import alert from "./alert";

export default combineReducers({
  auth,
  jobs,
  alert
});
