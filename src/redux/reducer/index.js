import { combineReducers } from "redux";
import ResourceReducer from "./ResourceReducer.js";
import ResourceDetailReducer from "./ResourceDetailReducer.js";
const rootReducer = combineReducers({
    ResourceReducer,
    ResourceDetailReducer
});

export default rootReducer;
