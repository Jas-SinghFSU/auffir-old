import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "../../actions/auth";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const { username, password } = formData;

  const onChange = function(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async function(e) {
    e.preventDefault();
    login(username, password);
  };

  if (isAuthenticated) {
    return <Redirect to='/jobpostings' />;
  }
  return (
    <div className='contentContainer'>
      <div id='login'>
        <div className='login-card'>
          <div className='card-title'>
            <h1 className='title is-3'>Log In</h1>
          </div>

          <div className='content'>
            <form className='form' onSubmit={e => onSubmit(e)}>
              <input
                id='username'
                type='username'
                name='username'
                title='username'
                placeholder='Username'
                value={username}
                onChange={e => onChange(e)}
                required
                autoFocus
              />
              <input
                id='password'
                type='password'
                name='password'
                title='password'
                placeholder='Password'
                value={password}
                onChange={e => onChange(e)}
                required
              />

              <div className='level options'>
                <Link className='btn btn-link level-right' to='/register'>
                  Create Account
                </Link>
              </div>

              <button type='submit' className='btn btn-primary'>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  isAuthenticated: PropTypes.bool,
  login: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
