import { signIn, signUp, signOut } from 'services/user';
import {
  authenticateUserInProgress,
  authenticateUserFailed,
  authenticateUserSuccess,
  registerUserInProgress,
  registerUserFailed,
  signOutUserCompleted,
  orderConfirmed,
} from 'actionCreators/user';

export const authenticateUser = (dispatch) => (userDetails) => {
  dispatch(authenticateUserInProgress());
  signIn(userDetails)
    .then((user) => dispatch(authenticateUserSuccess(user)))
    .catch((err) => dispatch(authenticateUserFailed(err)));
};

export const signOutUser = (dispatch) => () => {
  signOut()
    .then(() => dispatch(signOutUserCompleted()));
};

export const registerUser = (dispatch) => (userDetails) => {
  dispatch(registerUserInProgress());
  signUp(userDetails)
    .then(() => authenticateUser(dispatch)(userDetails))
    .catch((err) => dispatch(registerUserFailed(err)));
};

export const confirmOrder = (dispatch) => (orders) => dispatch(orderConfirmed(orders));
