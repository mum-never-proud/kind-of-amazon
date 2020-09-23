import {
  ADD_PRODUCT_IN_CART,
  REMOVE_PRODUCT_FROM_CART,
  CLEAR_CART,
  ADD_FILTER,
  CLEAR_FILTER,
} from 'actionTypes';
import availableProducts from 'data/products.json';
import filters from 'constants/filter-function';
import indexProducts from 'utils/index-products';

const updateProductQuantity = (product, updateFn) => ({
  ...product,
  availableQuantity: updateFn(product.availableQuantity),
});
const getFilteredProductIds = (products) => (appliedFilters) => {
  const productIds = Object.keys(products);
  const filterNames = Object.keys(appliedFilters);

  return productIds.filter((key) => filterNames
    .every((filterName) => filters[filterName](appliedFilters[filterName], products[key])));
};
const indexedProducts = indexProducts(availableProducts);
const shopState = {
  availableProducts: indexedProducts,
  filteredProductIds: Object.keys(indexedProducts),
  filters: {},
  selectedProducts: {},
};

const shopReducer = (state, action) => {
  switch (action.type) {
    case ADD_PRODUCT_IN_CART: {
      const selectedProducts = {
        ...state.selectedProducts,
        [action.payload]: (state.selectedProducts[action.payload] || 0) + 1,
      };
      const updatedProduct = updateProductQuantity(
        state.availableProducts[action.payload],
        (quantity) => quantity - 1,
      );

      return {
        ...state,
        selectedProducts,
        availableProducts: {
          ...state.availableProducts,
          [action.payload]: updatedProduct,
        },
      };
    }
    case REMOVE_PRODUCT_FROM_CART: {
      const selectedProducts = {
        ...state.selectedProducts,
        [action.payload]: state.selectedProducts[action.payload] - 1,
      };
      const updatedProduct = updateProductQuantity(
        state.availableProducts[action.payload],
        (quantity) => quantity + 1,
      );

      if (selectedProducts[action.payload] <= 0) {
        delete selectedProducts[action.payload];
      }

      return {
        ...state,
        selectedProducts,
        availableProducts: {
          ...state.availableProducts,
          [action.payload]: updatedProduct,
        },
      };
    }
    case CLEAR_CART:
      return {
        ...state,
        selectedProducts: {},
      };
    case ADD_FILTER: {
      const appliedFilters = { ...state.filters, ...action.payload };

      return {
        ...state,
        filters: appliedFilters,
        filteredProductIds: getFilteredProductIds(state.availableProducts)(appliedFilters),
      };
    }
    case CLEAR_FILTER: {
      const { filters: appliedFilters } = state;

      delete appliedFilters[action.payload];

      return {
        ...state,
        filters: appliedFilters,
        filteredProductIds: getFilteredProductIds(state.availableProducts)(appliedFilters),
      };
    }
    default:
      return state;
  }
};

export default shopReducer;
export { shopState };
