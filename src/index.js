import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
import { compose, createStore, combineReducers, applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-observable";
import * as reducers from "./reducers";

const composeMiddleware =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers(reducers);
const epicMiddleware = createEpicMiddleware({});

const store = createStore(
  rootReducer,
  {},
  composeMiddleware(applyMiddleware(epicMiddleware))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
