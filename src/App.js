import React from "react";
import logo from "./logo.svg";
import history from "./redux/history";
import { Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import Login from "./components/Login";
import { LoginContainer } from "./components/UsersContainer";
import UsersList from "./components/UsersList";
import store from "./redux/store";

function App() {
  return (
    <div className="App">
      {/* <header className="App-header"> */}
      {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      {/* </header> */}
      <Provider store={store}>
        <Router history={history}>
          <LoginContainer />
        </Router>
      </Provider>
    </div>
  );
}

export default App;
