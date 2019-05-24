import axios from "axios";
import { GET_JOBS, GET_JOB, JOBS_ERROR, ADD_JOB } from "./types";

// Get Jobs
export const getJobs = () => async dispatch => {
  try {
    const res = await axios.get("/api/postings");

    dispatch({
      type: GET_JOBS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: JOBS_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

// Create Job Posting
export const postJob = formData => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.post("/api/postings", formData, config);

    dispatch({
      type: ADD_JOB,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: JOBS_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};
