import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import { store } from "./utility";
import App from "./App";

import "./assets/css/styles.scss";

render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
