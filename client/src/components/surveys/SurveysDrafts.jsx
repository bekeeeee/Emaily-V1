import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchDrafts, deleteSurvey } from "../../actions";
import formFields from "./formFields";

class SurveysDrafts extends Component {
  componentDidMount() {
    this.props.fetchDrafts();
  }
  onDeleteSurvey(id) {
    this.props.deleteSurvey(id);
  }
  renderSurveys() {
    // console.log("props", this.props.surveys);
    return this.props.drafts.map((survey) => {
      return (
        <div className="card darken-1">
          {formFields.map(({ name, label }) => {
            if (survey[name])
              return (
                <div className="card-content" key={survey._id}>
                  <label>{label}</label>
                  <div>{survey[name]}</div>
                </div>
              );
            return null;
          })}
          <button
            // onClick={() => this.onDeleteSurvey(survey._id)}
            className="waves-effect waves-light red btn-small right"
          >
            Delete
          </button>
        </div>
      );
    });
  }
  render() {
    return <div>{this.renderSurveys()}</div>;
  }
}
function mapStateToProps({ drafts }) {
  return { drafts };
}
export default connect(mapStateToProps, { fetchDrafts, deleteSurvey })(
  SurveysDrafts
);
