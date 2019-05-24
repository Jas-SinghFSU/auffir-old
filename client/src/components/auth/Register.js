import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { register } from "../../actions/auth";
import { setAlert } from "../../actions/alert";

const Register = ({ register, isAuthenticated, setAlert }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    password2: "",
    firstname: "",
    lastname: ""
  });

  const { username, password, password2, firstname, lastname } = formData;

  const onChange = function(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async function(e) {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "is-danger", 3000);
    } else {
      register(firstname, lastname, username, password);
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/jobpostings' />;
  }
  return (
    <div className='contentContainer'>
      <div id='login'>
        <div className='login-card'>
          <div className='card-title'>
            <h1 className='title is-3'>Register</h1>
          </div>

          <div className='content'>
            <form className='form' onSubmit={e => onSubmit(e)}>
              <div className='field-body'>
                <div className='field'>
                  <input
                    id='username'
                    type='text'
                    name='firstname'
                    title='firstname'
                    placeholder='firstname'
                    value={firstname}
                    onChange={e => onChange(e)}
                    required
                    autoFocus
                  />
                </div>
                <div className='field'>
                  <input
                    id='username'
                    type='text'
                    name='lastname'
                    title='lastname'
                    placeholder='lastname'
                    value={lastname}
                    onChange={e => onChange(e)}
                    required
                    autoFocus
                  />
                </div>
              </div>

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

              <input
                id='password'
                type='password'
                name='password2'
                title='password2'
                placeholder='Confirm Password'
                value={password2}
                onChange={e => onChange(e)}
                required
              />

              <div className='level options'>
                <Link className='btn btn-link level-right' to='/login'>
                  Login
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

Register.propTypes = {
  isAuthenticated: PropTypes.bool,
  register: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { register, setAlert }
)(Register);
