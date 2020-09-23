import {
  ADD_PRODUCT_IN_CART,
  REMOVE_PRODUCT_FROM_CART,
  CLEAR_CART,
  ADD_FILTER,
  CLEAR_FILTER,
} from 'actionTypes';

export const addProduct = (dispatch) => (sku) => dispatch({
  type: ADD_PRODUCT_IN_CART,
  payload: sku,
});

export const removeProduct = (dispatch) => (sku) => dispatch({
  type: REMOVE_PRODUCT_FROM_CART,
  payload: sku,
});

export const addFilter = (dispatch) => (filter) => dispatch({
  type: ADD_FILTER,
  payload: filter,
});

export const clearFilter = (dispatch) => (filterName) => dispatch({
  type: CLEAR_FILTER,
  payload: filterName,
});

export const emptyCart = (dispatch) => () => dispatch({ type: CLEAR_CART });
