import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { postJob } from "../../actions/jobs";

const CreateJob = props => {
  const [formData, setFormData] = useState({
    company: "",
    state: "",
    city: "",
    country: "",
    zipcode: "",
    phone: "",
    email: "",
    description: "",
    employmenttype: "",
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
    title
  } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className='contentContainer'>
      <div class='field'>
        <label class='label'>*Job Title</label>
        <div class='control has-icons-left has-icons-right'>
          <span class='icon is-small is-left'>
            <i class='fas fa-heading' />
          </span>
          <input
            class='input'
            type='text'
            placeholder='*Job Title'
            name='title'
            value={title}
            onChange={e => onChange(e)}
          />
          <span class='icon is-small is-right'>
            <i class='fas fa-check' />
          </span>
        </div>
      </div>

      <div class='field'>
        <label class='label'>*Company Name</label>
        <div class='control has-icons-left has-icons-right'>
          <span class='icon is-small is-left'>
            <i class='fas fa-store-alt' />
          </span>
          <input
            class='input'
            type='text'
            placeholder='*Company Name'
            name='company'
            value={company}
            onChange={e => onChange(e)}
          />
          <span class='icon is-small is-right'>
            <i class='fas fa-check' />
          </span>
        </div>
      </div>

      <div class='field'>
        <label class='label'>Email</label>
        <div class='control has-icons-left has-icons-right'>
          <input
            class={"input" /*is-danger*/}
            type='email'
            placeholder='Email input'
            name='email'
            value={email}
            onChange={e => onChange(e)}
          />
          <span class='icon is-small is-left'>
            <i class='fas fa-envelope' />
          </span>
          <span class='icon is-small is-right'>
            <i class='fas fa-exclamation-triangle' />
          </span>
        </div>
        {/*<p class='help is-danger'>This email is invalid</p>*/}
      </div>

      <div class='field'>
        <label class='label'>*Phone</label>
        <div class='control has-icons-left has-icons-right'>
          <input
            class='input'
            type='email'
            placeholder='*(123) 456-78990'
            name='phone'
            value={phone}
            onChange={e => onChange(e)}
          />
          <span class='icon is-small is-left'>
            <i class='fas fa-phone' />
          </span>
          <span class='icon is-small is-right'>
            <i class='fas fa-exclamation-triangle' />
          </span>
        </div>
      </div>

      <div class='field'>
        <label class='label'>Employment Type</label>
        <div class='control has-icons-left'>
          <div class='select is-primary'>
            <select>
              <option selected>Full-Time</option>
              <option>Part-Time</option>
              <option>Temporary</option>
              <option>Seasonal</option>
            </select>
          </div>
          <div class='icon is-small is-left'>
            <i class='fas fa-business-time' />
          </div>
        </div>
      </div>

      <div class='field'>
        <label class='label'>*Job Description</label>
        <div class='control'>
          <textarea
            class='textarea'
            placeholder='*Description'
            name='description'
            value={description}
            onChange={e => onChange(e)}
          />
        </div>
      </div>

      <div className='field-body'>
        <div class='field'>
          <label class='label'>City</label>
          <div class='control has-icons-left has-icons-right'>
            <input
              class='input'
              type='text'
              placeholder='City'
              name='city'
              value={city}
              onChange={e => onChange(e)}
            />
            <span class='icon is-small is-left'>
              <i class='fas fa-city' />
            </span>
            <span class='icon is-small is-right'>
              <i class='fas fa-exclamation-triangle' />
            </span>
          </div>
        </div>

        <div class='field'>
          <label class='label'>State</label>
          <div class='control has-icons-left has-icons-right'>
            <input
              class='input'
              type='text'
              placeholder='State'
              name='state'
              value={state}
              onChange={e => onChange(e)}
            />
            <span class='icon is-small is-left'>
              <i class='fas fa-map-marker-alt' />
            </span>
            <span class='icon is-small is-right'>
              <i class='fas fa-exclamation-triangle' />
            </span>
          </div>
        </div>
      </div>

      <div className='field-body'>
        <div class='field'>
          <label class='label'>Zip Code</label>
          <div class='control has-icons-left has-icons-right'>
            <input
              class='input'
              type='text'
              placeholder='Zip Code'
              name='zipcode'
              value={zipcode}
              onChange={e => onChange(e)}
            />
            <span class='icon is-small is-left'>
              <i class='fas fa-sort-numeric-down' />
            </span>
            <span class='icon is-small is-right'>
              <i class='fas fa-exclamation-triangle' />
            </span>
          </div>
        </div>

        <div class='field'>
          <label class='label'>Country</label>
          <div class='control has-icons-left has-icons-right'>
            <input
              class='input'
              type='text'
              placeholder='Country'
              name='country'
              value={country}
              onChange={e => onChange(e)}
            />
            <span class='icon is-small is-left'>
              <i class='fas fa-globe-americas' />
            </span>
            <span class='icon is-small is-right'>
              <i class='fas fa-exclamation-triangle' />
            </span>
          </div>
        </div>
      </div>

      <div class='field is-grouped'>
        <div class='control'>
          <button class='button is-link'>Submit</button>
        </div>
        <div class='control'>
          <button class='button is-text'>Cancel</button>
        </div>
      </div>
    </div>
  );
};

CreateJob.propTypes = {};

export default CreateJob;
