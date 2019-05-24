import {
  GET_JOBS,
  GET_JOB,
  JOBS_ERROR,
  CLEAR_JOBS,
  ADD_JOB
} from "../actions/types";

const initialState = {
  jobs: [],
  job: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_JOBS:
      return {
        ...state,
        jobs: payload,
        loading: false
      };
    case ADD_JOB:
      return {
        ...state,
        jobs: [payload, ...state.jobs],
        loading: false
      };
    case JOBS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case CLEAR_JOBS:
      return {
        jobs: [],
        job: null,
        loading: false
      };
    default:
      return state;
  }
}
