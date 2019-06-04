import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getJobById } from "../../actions/jobs";

const ViewJob = ({ jobs: { loading, job }, getJobById, match }) => {
  useEffect(() => {
    getJobById(match.params.id);
  }, [getJobById, match.params.id]);

  return loading || !job ? (
    <Fragment>
      <progress className='progress is-small is-primary' max='100'>
        15%
      </progress>
    </Fragment>
  ) : (
    <Fragment>
      <div className='contentContainer'>
        <div className='viewJob jobTitle'>
          <span className='title'>{job.title}</span>
        </div>
        <div className='viewJob jobCompany'>
          <span className='subtitle'>{"@ " + job.company}</span>
        </div>
        <div className='viewJob jobLocation'>
          {job.location.city && <Fragment>{job.location.city}</Fragment>}
          {job.location.state && (
            <Fragment>{", " + job.location.state}</Fragment>
          )}
          {job.location.country && (
            <Fragment>{", " + job.location.country}</Fragment>
          )}
        </div>
        <hr />
        <div
          className='viewJob jobLocation'
          dangerouslySetInnerHTML={{ __html: job.description }}
        />
      </div>
      <hr />
    </Fragment>
  );
};

ViewJob.propTypes = {
  jobs: PropTypes.object.isRequired,
  getJobById: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  jobs: state.jobs
});

export default connect(
  mapStateToProps,
  { getJobById }
)(ViewJob);
