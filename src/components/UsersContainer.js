import React, { Component } from "react";
import UsersList from "./UsersList";
import Login from "./Login";
import { selectors as loginSelectors } from "../redux/Reducers/userReducer";
import { actions } from "../redux/Actions/userActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Loader } from "./shared/Loader";
import { isEmpty } from "lodash";
import { withRouter } from "react-router-dom";

export class UsersContainer extends Component {
  componentDidUpdate() {
    //this.props.history.push("/users");
    console.log(this.props);
  }
  render() {
    const { isLoggedIn, loading, errorMessage, users } = this.props;
    return (
      <div>
        {!isLoggedIn && !loading && <Login {...this.props} />}
        {isEmpty(errorMessage) && isLoggedIn && users.length > 0 && (
          <UsersList {...this.props} />
        )}
        <Loader hidden={!loading} />
        {!isEmpty(errorMessage) && <Login {...this.props} />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: loginSelectors.getToken(state),
  loading: loginSelectors.getLoading(state),
  users: loginSelectors.getUsers(state),
  isLoggedIn: loginSelectors.getLoggedIn(state),
  errorMessage: loginSelectors.getErrorMessage(state),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...actions }, dispatch),
});

export const LoginContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UsersContainer)
);
