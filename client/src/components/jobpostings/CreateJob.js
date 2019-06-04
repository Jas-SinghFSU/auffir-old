import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { postJob } from "../../actions/jobs";
import ReactQuill from "react-quill";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { jobFormData } from "./formdata";

const CreateJob = ({ postJob }) => {
  const [formData, setFormData] = useState({
    company: "",
    state: "",
    city: "",
    country: "",
    zipcode: "",
    phone: "",
    email: "",
    description: "",
    employmenttype: "Full-Time",
    title: ""
  });

  const {
    company,
    state,
    city,
    country,
    zipcode,
    phone,
    email,
    description,
    employmenttype,
    title,
    industrytype,
    occupationtype
  } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onChangeDescription = value => {
    setFormData({ ...formData, description: value });
  };
  const onChangePhone = value => {
    setFormData({ ...formData, phone: value });
  };
  const onSubmit = e => {
    postJob(formData);
  };
  return (
    <div className='contentContainer'>
      <div className='field'>
        <label className='label'>*Job Title</label>
        <div className='control has-icons-left has-icons-right'>
          <span className='icon is-small is-left'>
            <i className='fas fa-heading' />
          </span>
          <input
            className='input'
            type='text'
            placeholder='*Job Title'
            name='title'
            value={title}
            onChange={e => onChange(e)}
          />
          <span className='icon is-small is-right'>
            <i className='fas fa-check' />
          </span>
        </div>
      </div>

      <div className='field'>
        <label className='label'>*Company Name</label>
        <div className='control has-icons-left has-icons-right'>
          <span className='icon is-small is-left'>
            <i className='fas fa-store-alt' />
          </span>
          <input
            className='input'
            type='text'
            placeholder='*Company Name'
            name='company'
            value={company}
            onChange={e => onChange(e)}
          />
          <span className='icon is-small is-right'>
            <i className='fas fa-check' />
          </span>
        </div>
      </div>

      <div className='field'>
        <label className='label'>Email</label>
        <div className='control has-icons-left has-icons-right'>
          <input
            className={"input" /*is-danger*/}
            type='email'
            placeholder='Email'
            name='email'
            value={email}
            onChange={e => onChange(e)}
          />
          <span className='icon is-small is-left'>
            <i className='fas fa-envelope' />
          </span>
          <span className='icon is-small is-right'>
            <i className='fas fa-exclamation-triangle' />
          </span>
        </div>
        {/*<p className='help is-danger'>This email is invalid</p>*/}
      </div>

      <div className='field'>
        <label className='label'>*Phone</label>
        <div className='control has-icons-left has-icons-right'>
          <PhoneInput
            className='inputPhone'
            country='US'
            value={phone}
            onChange={onChangePhone}
          />
          <span className='icon is-small is-right'>
            <i className='fas fa-exclamation-triangle' />
          </span>
        </div>
      </div>
      <div className='field-body types'>
        <div className='field'>
          <label className='label'>Employment Type</label>
          <div className='control has-icons-left'>
            <div className='select is-primary'>
              <select
                name='employmenttype'
                value={employmenttype}
                onChange={e => onChange(e)}
              >
                <option defaultValue='Full-Time'>Full-Time</option>
                <option value='Part-Time'>Part-Time</option>
                <option value='Temporary'>Temporary</option>
                <option value='Seasonal'>Seasonal</option>
              </select>
            </div>
            <div className='icon is-small is-left'>
              <i className='fas fa-business-time' />
            </div>
          </div>
        </div>

        <div className='field'>
          <label className='label'>Job Industry</label>
          <div className='control has-icons-left'>
            <div className='select is-primary'>
              <select
                name='industrytype'
                value={industrytype}
                onChange={e => onChange(e)}
              >
                {jobFormData.industries.map(industry => (
                  <option value={industry}>{industry}</option>
                ))}
              </select>
            </div>
            <div className='icon is-small is-left'>
              <i className='fas fa-business-time' />
            </div>
          </div>
        </div>

        <div className='field'>
          <label className='label'>Occupation</label>
          <div className='control has-icons-left'>
            <div className='select is-primary'>
              <select
                name='occupationtype'
                value={occupationtype}
                onChange={e => onChange(e)}
              >
                {jobFormData.occupations.map(occupation => (
                  <option value={occupation}>{occupation}</option>
                ))}
              </select>
            </div>
            <div className='icon is-small is-left'>
              <i className='fas fa-business-time' />
            </div>
          </div>
        </div>
      </div>
      <div className='field'>
        <label className='label'>*Job Description</label>
        <div className='control'>
          <ReactQuill
            className='textareaa'
            placeholder='*Description'
            name='description'
            value={description}
            onChange={onChangeDescription}
          />
        </div>
      </div>

      <div className='field-body locations'>
        <div className='field'>
          <label className='label'>City</label>
          <div className='control has-icons-left has-icons-right'>
            <input
              className='input'
              type='text'
              placeholder='City'
              name='city'
              value={city}
              onChange={e => onChange(e)}
            />
            <span className='icon is-small is-left'>
              <i className='fas fa-city' />
            </span>
            <span className='icon is-small is-right'>
              <i className='fas fa-exclamation-triangle' />
            </span>
          </div>
        </div>

        <div className='field'>
          <label className='label'>State</label>
          <div className='control has-icons-left has-icons-right'>
            <input
              className='input'
              type='text'
              placeholder='State'
              name='state'
              value={state}
              onChange={e => onChange(e)}
            />
            <span className='icon is-small is-left'>
              <i className='fas fa-map-marker-alt' />
            </span>
            <span className='icon is-small is-right'>
              <i className='fas fa-exclamation-triangle' />
            </span>
          </div>
        </div>
      </div>

      <div className='field-body locations'>
        <div className='field'>
          <label className='label'>Zip Code</label>
          <div className='control has-icons-left has-icons-right'>
            <input
              className='input'
              type='text'
              placeholder='Zip Code'
              name='zipcode'
              value={zipcode}
              onChange={e => onChange(e)}
            />
            <span className='icon is-small is-left'>
              <i className='fas fa-sort-numeric-down' />
            </span>
            <span className='icon is-small is-right'>
              <i className='fas fa-exclamation-triangle' />
            </span>
          </div>
        </div>

        <div className='field'>
          <label className='label'>Country</label>
          <div className='control has-icons-left has-icons-right'>
            <input
              className='input'
              type='text'
              placeholder='Country'
              name='country'
              value={country}
              onChange={e => onChange(e)}
            />
            <span className='icon is-small is-left'>
              <i className='fas fa-globe-americas' />
            </span>
            <span className='icon is-small is-right'>
              <i className='fas fa-exclamation-triangle' />
            </span>
          </div>
        </div>
      </div>

      <div className='field is-grouped submitPost'>
        <div className='control'>
          <button className='button is-link' onClick={e => onSubmit()}>
            Submit
          </button>
        </div>
        <div className='control'>
          <button className='button is-text'>Cancel</button>
        </div>
      </div>
    </div>
  );
};

CreateJob.propTypes = {
  postJob: PropTypes.func.isRequired,
  jobFormData: PropTypes.object.isRequired
};

export default connect(
  null,
  { postJob, jobFormData }
)(CreateJob);
