import {
  AUTHENTICATE_USER_REQUEST,
  AUTHENTICATE_USER_FAILED,
  AUTHENTICATE_USER_SUCCESS,
  REGISTER_USER_REQUEST,
  REGISTER_USER_FAILED,
  SIGN_OUT_REQUEST,
} from 'actionTypes';

const userState = {
  isLoading: false,
  user: null,
  errorMessage: null,
};

const userReducer = (state, action) => {
  switch (action.type) {
    case AUTHENTICATE_USER_REQUEST:
    case REGISTER_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case AUTHENTICATE_USER_FAILED:
    case REGISTER_USER_FAILED:
      return {
        ...state,
        isLoading: false,
        ...action.payload,
      };
    case AUTHENTICATE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ...action.payload,
      };
    case SIGN_OUT_REQUEST:
      return userState;
    default:
      return state;
  }
};

export default userReducer;
export { userState };
