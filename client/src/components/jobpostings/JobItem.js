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
  // For minimizing the description to 200 characters and ending the description after a full word
  const miniDescLength = 200;
  var newDescription = description;
  newDescription = newDescription.replace(
    /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
    " "
  );
  var miniDescription = newDescription.substring(0, miniDescLength);

  for (var i = miniDescLength; description.charAt(i).match("[a-zA-Z]+"); i++) {
    miniDescription += description[i];
  }
  if (description.length > 200) {
    miniDescription += "...";
  }
  // End of description minimizer

  return (
    <div className='jobItem'>
      <div className='card'>
        <header className='card-content jobs'>
          <Link to={`/jobpost/view/${_id}`}>
            <p className='title jobTitle link'>{title}</p>
          </Link>
          <p className='title company'>{company && company}</p>
          <p className='title location'>
            {location.city && <Fragment>{location.city}</Fragment>}
            {location.state && <Fragment>{", " + location.state}</Fragment>}
            {location.country && <Fragment>{", " + location.country}</Fragment>}
          </p>
        </header>
        <div className='card-content jobItemContent'>
          <div className='content jobItemBody'>
            <span>
              <strong>Description: </strong>
            </span>
            <br />
            <span>{miniDescription}</span>
            <br />
            {employmentType && (
              <Fragment>
                <span>
                  <strong>Length: </strong>
                </span>
                <br />
                <span>{employmentType}</span>
                <br />
              </Fragment>
            )}

            <span>
              <strong>Posted On: </strong>
            </span>
            <br />
            <Moment format='MM/DD/YYYY'>{date}</Moment>
            {" at "}
            <Moment format='hh:mm A'>{date}</Moment>
          </div>
        </div>
        <footer className='card-footer'>
          <Link to='#' className='card-footer-item'>
            Save
          </Link>
          <Link to={`/jobpost/view/${_id}`} className='card-footer-item'>
            View
          </Link>
        </footer>
      </div>
    </div>
  );
};

JobItem.propTypes = {
  job: PropTypes.object.isRequired
};

export default JobItem;
