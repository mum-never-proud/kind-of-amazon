import { signIn, signUp, signOut } from 'services/user';
import {
  authenticateUserRequest,
  authenticateUserFailed,
  authenticateUserSuccess,
  registerUserRequest,
  registerUserFailed,
  signOutUserCompleted,
} from 'actionCreators/user';

export const authenticateUser = (dispatch) => (userDetails) => {
  dispatch(authenticateUserRequest());
  signIn(userDetails)
    .then((user) => dispatch(authenticateUserSuccess(user)))
    .catch((err) => dispatch(authenticateUserFailed(err)));
};

export const signOutUser = (dispatch) => () => {
  signOut()
    .then(() => dispatch(signOutUserCompleted()));
};

export const registerUser = (dispatch) => (userDetails) => {
  dispatch(registerUserRequest());
  signUp(userDetails)
    .then(() => authenticateUser(dispatch)(userDetails))
    .catch((err) => dispatch(registerUserFailed(err)));
};
