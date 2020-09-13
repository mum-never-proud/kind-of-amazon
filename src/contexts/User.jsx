import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import userReducer, { userState } from 'reducers/user';

const UserContext = createContext();
const UserProvider = ({ children }) => {
  const [dispatch, state] = useReducer(userReducer, userState);

  return (
    <UserContext.Provider value={[dispatch, state]}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.object]).isRequired,
};

export { UserContext };
export default UserProvider;
