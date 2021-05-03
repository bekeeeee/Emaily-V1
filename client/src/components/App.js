import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import NotFound from "./NotFound";

import SurveyNew from "./surveys/SurveyNew";
import SurveysDrafts from "./surveys/SurveysDrafts";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header />
          <Route exact path="/" component={Landing} />
          <Route exact path="/surveys" component={Dashboard} />
          <Route exact path="/drafts" component={SurveysDrafts} />

          <Route path="/surveys/new" component={SurveyNew} />
          {/* <Route path="/*" component={NotFound} /> */}
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
