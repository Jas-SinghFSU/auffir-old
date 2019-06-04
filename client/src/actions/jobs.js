import axios from "axios";
import {
  GET_JOBS,
  GET_JOB,
  JOBS_ERROR,
  ADD_JOB,
  CLEAR_JOBS,
  CLEAR_JOB
} from "./types";
import { setAlert } from "./alert";

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
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "is-danger", 6000)));
    }

    dispatch({
      type: JOBS_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

// Get Job Posting by ID
export const getJobById = postID => async dispatch => {
  try {
    const res = await axios.get(`/api/postings/${postID}`);

    dispatch({
      type: CLEAR_JOB
    });

    dispatch({
      type: GET_JOB,
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

// Empty job posting state(s)
export const emptyJobPostings = request => dispatch => {
  switch (request) {
    case "all":
      dispatch({
        type: CLEAR_JOBS
      });
    case "this":
      dispatch({
        type: CLEAR_JOB
      });
    default:
      dispatch({
        type: CLEAR_JOBS
      });
  }
};
