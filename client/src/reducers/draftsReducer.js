import {  DELETE_SURVEY ,FETCH_DRAFT} from "../actions/types";

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_DRAFT:
      return action.payload;
    case DELETE_SURVEY:
      return action.payload;
    default:
      return state;
  }
}
