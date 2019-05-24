import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const JobItem = ({
  job: {
    _id,
    contact,
    location,
    skills,
    experience,
    employmentType,
    industryType,
    author,
    title,
    description,
    company,
    date
  }
}) => {
  return (
    <div className='jobItem'>
      <div className='card'>
        <header className='card-content jobs'>
          <p className='title jobTitle'>{title}</p>
          <p className='title company'>{company && company}</p>
          <p className='title location'>
            {location.city && <Fragment>{location.city}</Fragment>}
            {location.state && <Fragment>{", " + location.state}</Fragment>}
            {location.country && <Fragment>{", " + location.country}</Fragment>}
          </p>
        </header>
        <div className='card-content'>
          <div className='content'>
            <span>
              <strong>Description: </strong>
            </span>
            <br />
            <span>{description}</span>

            <br />
            <br />
            {employmentType && (
              <Fragment>
                <span>
                  <strong>Length: </strong>
                </span>
                <br />
                <span>{employmentType}</span>
                <br />
                <br />
              </Fragment>
            )}

            <span>
              <strong>Posted At: </strong>
            </span>
            <br />
            <Moment format='MM/DD/YYYY'>{date}</Moment>
            {" at "}
            <Moment format='hh:mm A'>{date}</Moment>
          </div>
        </div>
        <footer className='card-footer'>
          <a href='#' className='card-footer-item'>
            Save
          </a>
          <a href='#' className='card-footer-item'>
            View
          </a>
        </footer>
      </div>
    </div>
  );
};

JobItem.propTypes = {
  job: PropTypes.object.isRequired
};

export default JobItem;
