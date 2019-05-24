import React from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const Landing = () => {
  return (
    <div className='landing'>
      <div className='dark-tint'>
        <div className='landing-text'>
          <h1 className='x-large'>Auffir</h1>
          <p className='lead'>
            Job finding made easy
            <br />
            Job listing made easier
          </p>
          <div className='buttons'>
            <Link to='/jobpostings' className='button is-primary'>
              <span className='icon'>
                <i className='far fa-list-alt' />
              </span>
              <span>Find Jobs</span>
            </Link>
            <Link to='/jobpost/create' className='button is-white'>
              <span className='icon'>
                <i className='fas fa-file-signature' />
              </span>
              <span> List Jobs</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

Landing.propTypes = {};

export default Landing;
