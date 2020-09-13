import {
  ADD_OR_INCREMENT_PRODUCT_IN_CART,
  REMOVE_OR_DECREMENT_PRODUCT_IN_CART,
  CLEAR_CART,
} from 'actionTypes';

export const addOrIncrementProduct = (sku) => ({
  type: ADD_OR_INCREMENT_PRODUCT_IN_CART,
  payload: sku,
});

export const removeOrDecrementProduct = (sku) => ({
  type: REMOVE_OR_DECREMENT_PRODUCT_IN_CART,
  payload: sku,
});

export const clearCart = () => ({ type: CLEAR_CART });
