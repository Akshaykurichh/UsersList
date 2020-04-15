import axios from "axios";
import {
  LOGIN_SUCCESS,
  LOGIN_PENDING,
  LOGIN_FAILURE,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_PENDING,
  FETCH_USERS_FAILURE,
} from "../constants";
import { END_POINTS } from "../../config";
import { isEmpty } from "lodash";
import { batch } from "react-redux";

const getPayloadToSubmitData = (login, password) => {
  return {
    accountId: login,
    pswd: password,
  };
};
export const actions = {
  userLogin: (login, password, history) => async (dispatch) => {
    dispatch({ type: LOGIN_PENDING });
    const payLoad = getPayloadToSubmitData(login, password);
    try {
      const data = await axios.post(END_POINTS.LOGIN_URL, payLoad, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const date = new Date();
      const ttl = 10000;
      let response = data.data.token;
      var authKey = {
        value: response,
        expiry: date.getTime() + ttl,
      };
      console.log("entry");
      //We can store it in .env file too based on our build approach.
      localStorage.setItem("authKey", JSON.stringify(authKey));
      localStorage.setItem("username", login);
      localStorage.setItem("password", password);

      console.log(response);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data,
      });
      history.push("/users");
      dispatch(actions.usersList(history));
    } catch (error) {
      dispatch({ type: LOGIN_FAILURE, payload: error.message });
    }
  },
  usersList: (history) => async (dispatch) => {
    dispatch({ type: FETCH_USERS_PENDING });
    const bearerToken = JSON.parse(localStorage.getItem("authKey"));
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");

    //it is added to handle the scenario as if we have cleared localStorage.
    const now = new Date();
    console.log("bearer is:", now.getTime() > bearerToken.expiry);
    if (isEmpty(bearerToken) && now.getTime() > bearerToken.expiry) {
      if (isEmpty(username) && isEmpty(password)) {
        dispatch({ type: LOGIN_FAILURE, payload: "bearer token is empty." });
      } else {
        dispatch(actions.userLogin(username, password));
      }
    } else {
      try {
        const data = await axios.get(END_POINTS.USERS_URL, {
          headers: {
            Authorization: `Bearer ${bearerToken.value}`,
            "Content-Type": "application/json",
          },
        });

        let response = data;
        //localStorage.setItem("authKey", response);
        console.log(response);
        dispatch({
          type: FETCH_USERS_SUCCESS,
          payload: data,
        });
      } catch (error) {
        dispatch({ type: FETCH_USERS_FAILURE, payload: error.message });
      }
    }
  },
};
