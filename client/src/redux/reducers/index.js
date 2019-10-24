import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import User from "./user";
import Project from "./project";
import Issue from "./issue";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["Project"]
};

const rootReducer = combineReducers({
  User,
  Project,
  Issue
});

export default persistReducer(persistConfig, rootReducer);
// export default rootReducer;
