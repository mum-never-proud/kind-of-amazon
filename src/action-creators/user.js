import {
  AUTHENTICATE_USER_REQUEST,
  AUTHENTICATE_USER_FAILED,
  AUTHENTICATE_USER_SUCCESS,
  REGISTER_USER_REQUEST,
  REGISTER_USER_FAILED,
  SIGN_OUT_REQUEST,
} from 'actionTypes';

export const authenticateUserRequest = () => ({
  type: AUTHENTICATE_USER_REQUEST,
  payload: { errorMessage: null },
});

export const authenticateUserFailed = (err) => ({
  type: AUTHENTICATE_USER_FAILED,
  payload: { errorMessage: err.message },
});

export const authenticateUserSuccess = (user) => ({
  type: AUTHENTICATE_USER_SUCCESS,
  payload: { user },
});

export const signOutUserCompleted = () => ({ type: SIGN_OUT_REQUEST });

export const registerUserRequest = () => ({
  type: REGISTER_USER_REQUEST,
  payload: { errorMessage: null },
});

export const registerUserFailed = (err) => ({
  type: REGISTER_USER_FAILED,
  payload: { errorMessage: err.message },
});
