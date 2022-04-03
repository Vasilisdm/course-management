import { combineReducers } from "redux";
import courses from "./courseReducer";
import authors from "./authorReducer";
import apiCallsInProgress from "./apiStatusReducers";

const rootReducer = combineReducers({
    courses: courses,
    authors: authors,
    apiCallsInProgress: apiCallsInProgress,
});

export default rootReducer;
