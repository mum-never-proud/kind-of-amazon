import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import shopReducer, { shopState } from 'reducers/shop';

const ShopContext = createContext();
const ShopProvider = ({ children }) => {
  const [dispatch, state] = useReducer(shopReducer, shopState);

  return (
    <ShopContext.Provider value={[dispatch, state]}>
      {children}
    </ShopContext.Provider>
  );
};

ShopProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.object]).isRequired,
};

export { ShopContext };
export default ShopProvider;
