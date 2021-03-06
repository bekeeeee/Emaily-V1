import { FETCH_SURVEYS, DELETE_SURVEY ,FETCH_DRAFT} from "../actions/types";

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_SURVEYS:
      return action.payload;
    case DELETE_SURVEY:
      return action.payload;
    default:
      return state;
  }
}
