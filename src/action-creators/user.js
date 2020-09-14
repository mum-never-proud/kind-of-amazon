import {
  AUTHENTICATE_USER_IN_PROGRESS,
  AUTHENTICATE_USER_FAILED,
  AUTHENTICATE_USER_COMPLETED,
  AUTHENTICATE_USER_SUCCESS,
  ORDER_CONFIRMED,
  REGISTER_USER_IN_PROGRESS,
  REGISTER_USER_FAILED,
  REGISTER_USER_COMPLETED,
  SIGN_OUT,
} from 'actionTypes';

export const authenticateUserInProgress = () => ({
  type: AUTHENTICATE_USER_IN_PROGRESS,
  payload: { errorMessage: null },
});

export const authenticateUserFailed = (err) => ({
  type: AUTHENTICATE_USER_FAILED,
  payload: { errorMessage: err.message },
});

export const authenticateUserCompleted = () => ({ type: AUTHENTICATE_USER_COMPLETED });

export const authenticateUserSuccess = (user) => ({
  type: AUTHENTICATE_USER_SUCCESS,
  payload: { user },
});

export const signOutUserCompleted = () => ({ type: SIGN_OUT });

export const orderConfirmed = (orders) => ({ type: ORDER_CONFIRMED, payload: orders });

export const registerUserInProgress = () => ({
  type: REGISTER_USER_IN_PROGRESS,
  payload: { errorMessage: null },
});

export const registerUserFailed = (err) => ({
  type: REGISTER_USER_FAILED,
  payload: { errorMessage: err.message },
});

export const registerUserCompleted = () => ({ type: REGISTER_USER_COMPLETED });
