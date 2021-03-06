//import { routerMiddleware } from "connected-react-router";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { combineReducers, applyMiddleware, compose } from "redux";
import { createStore } from "redux";
import history from "./history";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import {
  name as loginName,
  reducer as loginReducer,
} from "./Reducers/userReducer";
import { useReducer } from "react";
// warn us if we accidently mutate REDUX state
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [
  thunkMiddleware,
  //routerMiddleware(history),
  createLogger({ collapsed: true }),
];

const store = createStore(
  combineReducers({
    router: connectRouter(history),
    [loginName]: loginReducer,
  }),
  composeEnhancers(
    applyMiddleware(...middleware, reduxImmutableStateInvariant())
  )
);

export default store;
