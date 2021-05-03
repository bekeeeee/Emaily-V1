import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import validateEmails from "../../utils/validateEmails";
import SurvyField from "./SurveyField";
import formFields from "./formFields";
import { withRouter } from "react-router-dom";

class SurveyForm extends Component {
  renderFields() {
    return formFields.map(({ label, name }) => (
      <div key={name}>
        <Field label={label} type="text" name={name} component={SurvyField} />
      </div>
    ));
  }


  
  render() {
    return (
      <div>
        <form>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button
            onClick={this.props.onSave}
            className="teal btn-flat  white-text"
            style={{ marginLeft: "20px" }}
          >
            Save
            <i className="material-icons right">done</i>
          </button>

          <button
            onClick={this.props.handleSubmit(this.props.onSurveySubmit)}
            className="teal btn-flat right white-text"
          >
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
        <Link to="/drafts" className="red btn-flat white-text">
            Drafts
          </Link>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  errors.recipients = validateEmails(values.recipients || "");

  formFields.forEach(({ name }) => {
    if (!values[name]) {
      errors[name] = "You must provide a value";
    }
  });
  return errors;
}
export default reduxForm({
  form: "surveyForm",
  validate,
  destroyOnUnmount: false,
})(withRouter(SurveyForm));
