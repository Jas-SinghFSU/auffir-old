import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getJobs } from "../../actions/jobs";
import JobItem from "./JobItem";

const JobPostings = ({ getJobs, jobs: { jobs, loading } }) => {
  useEffect(() => {
    getJobs();
  }, [getJobs]);
  return (
    <div className='contentContainer'>
      {loading ? (
        <Fragment>
          <progress className='progress is-small is-primary' max='100'>
            15%
          </progress>
        </Fragment>
      ) : (
        <Fragment>
          <h1 className='title'>Job Postings</h1>
          <div className='jobListContainer'>
            {jobs.map(job => (
              <JobItem key={job._id} job={job} />
            ))}
          </div>
        </Fragment>
      )}
    </div>
  );
};

JobPostings.propTypes = {
  jobs: PropTypes.object.isRequired,
  getJobs: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  jobs: state.jobs
});

export default connect(
  mapStateToProps,
  { getJobs }
)(JobPostings);
