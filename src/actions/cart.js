/* eslint-disable max-len */
import {
  addOrIncrementProduct,
  removeOrDecrementProduct,
  clearCart,
} from 'actionCreators/cart';

export const addOrIncrementProductInCart = (dispatch) => (sku) => dispatch(addOrIncrementProduct(sku));
export const removeOrDecrementProductInCart = (dispatch) => (sku) => dispatch(removeOrDecrementProduct(sku));
export const emptyCart = (dispatch) => () => dispatch(clearCart());
