import React, { Component } from "react";
import { connect } from "react-redux";
import logo from "./logo.svg";
import "./App.css";
import {
  autocompleteStartAction,
  autocompleteCancelAction
} from "./autocomplete/autocomplete.actions";

const mapDispatchToProps = {
  autocompleteStart: autocompleteStartAction,
  autocompleteCancel: autocompleteCancelAction
};

const mapStateToProps = state => ({});

class App extends Component {
  render() {
    const { autocompleteStart, autocompleteCancel } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p className="App-intro">
          <button onClick={autocompleteStart}>start</button>{" "}
          <button onClick={autocompleteCancel}>cancel</button>
        </p>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
