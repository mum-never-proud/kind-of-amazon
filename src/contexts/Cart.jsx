import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import cartReducer, { cartState } from 'reducers/cart';

const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [dispatch, state] = useReducer(cartReducer, cartState);

  return (
    <CartContext.Provider value={[dispatch, state]}>
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.object]).isRequired,
};

export { CartContext };
export default CartProvider;
