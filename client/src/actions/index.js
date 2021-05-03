import axios from "axios";
import { FETCH_USER, FETCH_SURVEYS, DELETE_SURVEY, FETCH_DRAFT } from "./types";

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get("/api/user/current");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = (token) => async (dispatch) => {
  const res = await axios.post("/api/stripe", token);
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const saveSurvey = (values, history) => async (dispatch) => {
  await axios.post("/api/surveys/draft", values);
  const res = await axios.get("/api/surveys");

  history.push("/drafts");
  dispatch({ type: FETCH_USER, payload: res.data });
};
export const submitSurvey = (values, history) => async (dispatch) => {
  const res = await axios.post("/api/surveys", values);
  history.push("/surveys");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchSurveys = () => async (dispatch) => {
  const res = await axios.get("/api/surveys");
  dispatch({ type: FETCH_SURVEYS, payload: res.data });
};

export const fetchDrafts = () => async (dispatch) => {
  const res = await axios.get("/api/surveys/draft");
  dispatch({ type: FETCH_DRAFT, payload: res.data });
};

export const deleteSurvey = (id) => async (dispatch) => {
  await axios.delete(`/api/surveys/${id}`);
  // const res = await axios.get(`/api/surveys/id`);
  const res = await axios.get("/api/surveys");

  dispatch({ type: DELETE_SURVEY, payload: res.data });
};
