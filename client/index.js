import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
// Redux store
import { store, persistor } from "./src/redux/store";
// Components
import App from "./src/App";

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);
