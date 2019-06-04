import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getJobById, emptyJobPostings } from "../../actions/jobs";
import {
  formatPhoneNumber,
  formatPhoneNumberIntl
} from "react-phone-number-input";

const ViewJob = ({
  jobs: { loading, job },
  getJobById,
  emptyJobPostings,
  match
}) => {
  var phoneNumber = "";
  useEffect(() => {
    getJobById(match.params.id);
    return () => {
      emptyJobPostings("this");
    };
  }, [getJobById, match.params.id]);

  if (job) {
    phoneNumber = job.contact.phone;
    if (phoneNumber.length == 12 && phoneNumber[1] == "1")
      phoneNumber = formatPhoneNumber(phoneNumber);
    else if (phoneNumber.length == 10) {
      phoneNumber = [
        "(" + phoneNumber.slice(0, 3),
        ") ",
        phoneNumber.slice(3, 6),
        "-",
        phoneNumber.slice(6, 10)
      ].join("");
    } else {
      phoneNumber = formatPhoneNumberIntl(phoneNumber);
    }
  }

  return loading || !job ? (
    <Fragment>
      <div className='contentContainer'>
        <progress className='progress is-small is-primary' max='100'>
          15%
        </progress>
      </div>
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
          {job.location.zipcode && (
            <Fragment>{" " + job.location.zipcode}</Fragment>
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
      <div className='viewJob jobInfo'>
        <div className='viewJob jobInfo subtitle'>
          <strong>Contact</strong>
        </div>
        <div className='viewJob jobInfo phone'>{"Phone: " + phoneNumber}</div>
        {job.contact.email && (
          <Fragment>
            <div className='viewJob jobInfo email'>
              {"Email: " + job.contact.email}
            </div>
          </Fragment>
        )}
        <br />
      </div>

      <div className='viewJob jobInfo'>
        <div className='viewJob jobInfo subtitle'>
          <strong>Employment Type</strong>
        </div>
        <div className='viewJob jobInfo phone'>{job.employmentType}</div>
        <br />
      </div>

      <div className='viewJob jobInfo'>
        <div className='viewJob jobInfo subtitle'>
          <strong>Industry</strong>
        </div>
        <div className='viewJob jobInfo industry'>
          {job.industryType ? job.industryType : "N/A"}
        </div>
        <br />
      </div>
    </Fragment>
  );
};

ViewJob.propTypes = {
  jobs: PropTypes.object.isRequired,
  getJobById: PropTypes.func.isRequired,
  emptyJobPostings: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  jobs: state.jobs
});

export default connect(
  mapStateToProps,
  { getJobById, emptyJobPostings }
)(ViewJob);
