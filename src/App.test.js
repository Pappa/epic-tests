import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const store = {
    subscribe: jest.fn(),
    dispatch: jest.fn(),
    getState: jest.fn()
  };
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
