import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "../routing/PrivateRoute";
import JobPostings from "../jobpostings/JobPostings";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Alert from "../layout/Alert";
import CreateJob from "../jobpostings/CreateJob";
import ViewJob from "../jobpostings/ViewJob";
import { emptyJobPostings } from "../../actions/jobs";

const Routes = () => {
  return (
    <section className='container'>
      {" "}
      <Alert />
      <Switch>
        <Route exact path='/jobpostings' component={JobPostings} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/jobpost/view/:id' component={ViewJob} />
        <PrivateRoute exact path='/jobpost/create' component={CreateJob} />
      </Switch>
    </section>
  );
};

export default Routes;
