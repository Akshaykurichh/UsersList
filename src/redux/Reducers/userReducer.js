import {
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_PENDING,
  FETCH_USERS_FAILURE,
} from "../constants";
export const name = "loginDetails";

const initialState = {
  token: "",
  users: [],
  loggedIn: false,
  searchQuery: "",
  loading: false,
  empty: true,
  error: false,
  errorMessage: "",
  totalCount: 0,
  activeFilter: -1,
  filters: [],
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    //cases to handle people
    case LOGIN_PENDING:
      return {
        ...state,
        loading: true,
        empty: false,
        error: false,
        errorMessage: "",
      };
    case LOGIN_SUCCESS:
      console.log(action.payload.data.token);
      return {
        ...state,
        loading: false,
        error: true,
        token: action.payload.data.token,
        loggedIn: true,
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        loggedIn: false,
        errorMessage: action.payload,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: true,
        users: action.payload.data,
      };
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload,
      };
    case FETCH_USERS_PENDING:
      return {
        ...state,
        loading: true,
        empty: false,
        error: false,
        errorMessage: "",
      };
    default:
      return state;
  }
}
export const selectors = {
  getToken: (state) => state[name].token,
  getLoading: (state) => state[name].loading,
  getUsers: (state) => state[name].users,
  getLoggedIn: (state) => state[name].loggedIn,
  getErrorMessage: (state) => state[name].errorMessage,
};
