import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSurveys, deleteSurvey } from "../../actions";

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }
  onDeleteSurvey(id) {
    // this.props.surveys = this.props.surveys.filter(
    //   (survey) => survey._id != id
    // );
    this.props.deleteSurvey(id)
  }
  renderSurveys() {
    console.log("props", this.props.surveys);
    return this.props.surveys.map((survey) => {
      return (
        <div className="card darken-1" key={survey._id}>
          <div className="card-content">
            <span className="card-title">{survey.title}</span>
            <p> {survey.body}</p>
            <p className="right">
              Sent On: {new Date(survey.dateSent).toLocaleDateString()}
            </p>
          </div>
          <div className="card-action">
            <a>Yes:{survey.yes}</a>
            <a>No:{survey.no}</a>
            <button
              onClick={() => this.onDeleteSurvey(survey._id)}
              className="waves-effect waves-light red btn-small right"
            >
              Delete
            </button>
          </div>
        </div>
      );
    });
  }
  render() {
    return <div>{this.renderSurveys()}</div>;
  }
}
function mapStateToProps({ surveys }) {
  return { surveys };
}
export default connect(mapStateToProps, { fetchSurveys, deleteSurvey })(
  SurveyList
);
