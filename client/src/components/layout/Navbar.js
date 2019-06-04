import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import auth from "../../reducers/auth";
import { logout } from "../../actions/auth";

const Navbar = ({ logout, isAuthenticated, loading, profile }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <nav
      className='navbar is-primary is-fixed-top'
      role='navigation'
      aria-label='main navigation'
    >
      <div className='container'>
        <div className='navbar-brand'>
          <Link className='navbar-item' to='/'>
            <h3 className='navbarLogo'>Auffir</h3>
          </Link>

          <a
            role='button'
            className={
              isActive
                ? "navbar-burger burger is-active"
                : "navbar-burger burger"
            }
            aria-label='menu'
            aria-expanded='false'
            data-target='navbarPrimaryLinks'
            onClick={() => setIsActive(!isActive)}
          >
            <span aria-hidden='true' />
            <span aria-hidden='true' />
            <span aria-hidden='true' />
          </a>
        </div>

        <div
          id='navbarPrimaryLinks'
          className={isActive ? "navbar-menu is-active" : "navbar-menu"}
        >
          <div className='navbar-start'>
            <Link className='navbar-item' to='/'>
              Home
            </Link>
            <Link className='navbar-item' to='/jobpostings'>
              Find Jobs
            </Link>
            <Link className='navbar-item' to='/jobpost/create'>
              Post Job
            </Link>
          </div>

          <div className='navbar-end'>
            <div className='navbar-item'>
              {profile && (
                <Fragment>
                  <div className=''>{"Welcome, " + profile.firstName}</div>
                </Fragment>
              )}
            </div>
            <div className='navbar-item'>
              {!loading && (
                <div className='navButtons'>
                  {isAuthenticated ? (
                    <Fragment>
                      <Link
                        className={isActive ? "navbar-item" : "button is-light"}
                        to='/'
                        onClick={logout}
                      >
                        <strong>Logout</strong>
                      </Link>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <Link
                        className={
                          isActive ? "navbar-item" : "button is-primary"
                        }
                        to='/register'
                      >
                        <strong>Sign up</strong>
                      </Link>
                      <Link
                        className={isActive ? "navbar-item" : "button is-light"}
                        to='/login'
                      >
                        <strong>Log in</strong>
                      </Link>
                    </Fragment>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool,
  logout: PropTypes.func.isRequired,
  profile: PropTypes.object
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  profile: state.auth.profile,
  loading: state.auth.loading
});

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
