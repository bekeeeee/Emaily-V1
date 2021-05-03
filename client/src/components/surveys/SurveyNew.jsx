import React, { Component } from "react";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";
import SurveySaveReview from "./SurveysDraftReview";

import { reduxForm } from "redux-form";

class SurveyNew extends Component {
  state = { showFormReview: false, showDraftReview: false };
  renderContent() {
    if (this.state.showFormReview) {
      return (
        <SurveyFormReview
          onCancel={() =>
            this.setState({ showFormReview: false, showDraftReview: false })
          }
        />
      );
    } else if (this.state.showDraftReview) {
      return (
        <SurveySaveReview
          onCancel={() =>
            this.setState({ showDraftReview: false, showFormReview: false })
          }
        />
      );
    }
    return (
      <SurveyForm
        onSave={() =>
          this.setState({ showDraftReview: true, showFormReview: false })
        }
        onSurveySubmit={() => this.setState({ showFormReview: true })}
      />
    );
  }
  render() {
    return <div>{this.renderContent()}</div>;
  }
}
export default reduxForm({
  form: "surveyForm",
})(SurveyNew);
