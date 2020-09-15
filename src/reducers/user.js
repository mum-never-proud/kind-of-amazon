import {
  AUTHENTICATE_USER_IN_PROGRESS,
  AUTHENTICATE_USER_FAILED,
  AUTHENTICATE_USER_SUCCESS,
  REGISTER_USER_IN_PROGRESS,
  REGISTER_USER_FAILED,
  SIGN_OUT,
  ORDER_CONFIRMED,
} from 'actionTypes';

const userState = {
  isLoading: false,
  user: null,
  errorMessage: null,
  pastOrders: [],
};
const userReducer = (state, action) => {
  switch (action.type) {
    case AUTHENTICATE_USER_IN_PROGRESS:
    case REGISTER_USER_IN_PROGRESS:
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
    case SIGN_OUT:
      return userState;
    case ORDER_CONFIRMED:
      return {
        ...state,
        pastOrders: [].concat(action.payload, state.pastOrders),
      };
    default:
      return state;
  }
};

export default userReducer;
export { userState };
