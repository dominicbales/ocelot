import rootReducer from "./reducers/index";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
// import {} from 'redux-devtools-extension/developmentOnly'
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage
};

// const persistedReducer = persistReducer(persistConfig, rootReducer);
const middlewares = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  // persistedReducer,
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
  // compose(
  //   applyMiddleware(...middlewares),
  //     window.__REDUX_DEVTOOLS_EXTENSION__ &&
  //     window.__REDUX_DEVTOOLS_EXTENSION__()
  // )
);

// export let persistor = persistStore(store);
