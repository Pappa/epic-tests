import React, { Component } from "react";
import { connect } from "react-redux";
import logo from "./logo.svg";
import "./App.css";
import { autocompleteStartAction } from "./autocomplete/autocomplete.actions";

const mapDispatchToProps = {
  autocompleteStart: autocompleteStartAction
};

const mapStateToProps = state => ({});

class App extends Component {
  render() {
    const { autocompleteStart } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          <button onClick={autocompleteStart}>Click</button>
        </p>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
