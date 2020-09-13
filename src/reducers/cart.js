import {
  ADD_OR_INCREMENT_PRODUCT_IN_CART,
  REMOVE_OR_DECREMENT_PRODUCT_IN_CART,
  CLEAR_CART,
} from 'actionTypes';
import availableProducts from 'data/products';
import availableProductQuantites from 'data/warehouse';

const cartState = {
  availableProducts,
  productQuantites: availableProductQuantites,
  selectedProducts: {},
};
const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_OR_INCREMENT_PRODUCT_IN_CART: {
      const selectedProducts = {
        ...state.selectedProducts,
        [action.payload]: (state.selectedProducts[action.payload] || 0) + 1,
      };
      const productQuantites = {
        ...state.productQuantites,
        [action.payload]: state.productQuantites[action.payload] - 1,
      };

      return {
        ...state,
        selectedProducts,
        productQuantites,
      };
    }
    case REMOVE_OR_DECREMENT_PRODUCT_IN_CART: {
      const selectedProducts = {
        ...state.selectedProducts,
        [action.payload]: state.selectedProducts[action.payload] - 1,
      };
      const productQuantites = {
        ...state.productQuantites,
        [action.payload]: state.productQuantites[action.payload] + 1,
      };

      if (selectedProducts[action.payload] <= 0) {
        delete selectedProducts[action.payload];
      }

      return {
        ...state,
        selectedProducts,
        productQuantites,
      };
    }
    case CLEAR_CART:
      return {
        ...state,
        selectedProducts: {},
      };
    default:
      return state;
  }
};

export default cartReducer;
export { cartState };
