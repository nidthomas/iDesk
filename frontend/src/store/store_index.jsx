import { createStore } from "redux";
import rootReducer from "../reducers/reducer_index";

const store = createStore(rootReducer);
export default store;
