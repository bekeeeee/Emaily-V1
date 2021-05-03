import React from "react";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import formFields from "./formFields";
import * as actions from "../../actions/index";
const SurveyFormReview = ({ formValues, onCancel, submitSurvey, history }) => {
 
  function reviewFields() {
    return formFields.map(({ name, label }) => {
      return (
        <div key={name}>
          <label>{label}</label>
          <div>{formValues[name]}</div>
        </div>
      );
    });
  }
  return (
    <div>
      <h4>Confirm the Form Please</h4>
      {reviewFields()}
      <button
        className="yellow darken-3 white-text btn-flat"
        onClick={onCancel}
      >
        Back
      </button>
      <button
        onClick={() => submitSurvey(formValues, history)}
        className="green btn-flat whit-text right"
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
