import React from "react";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import formFields from "./formFields";
import * as actions from "../../actions/index";
const SurveyDraftReview = ({ formValues, onCancel, saveSurvey, history }) => {
  function reviewFields() {
    console.log("formValues", formValues);
    return formFields.map(({ name, label }) => {
      if (!formValues) return history.push("/surveys");
      return formValues[name] ? (
        <div key={name}>
          <label>{label}</label>
          <div>{formValues[name]}</div>
        </div>
      ) : null;
    });
  }
  return (
    <div>
      <h4>Confirm the items Please</h4>
      {reviewFields()}
      <button
        className="yellow darken-3 white-text btn-flat"
        onClick={onCancel}
      >
        Back
      </button>
      <button
        onClick={() => saveSurvey(formValues, history)}
        className="green btn-flat whit-text right"
      >
        Save draft
        <i className="material-icons right"></i>
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyDraftReview));
