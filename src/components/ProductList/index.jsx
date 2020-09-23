import React, { useContext } from 'react';
import { ShopContext } from 'contexts/Shop';
import { addProduct, removeProduct } from 'actions/shop';
import PropTypes from 'prop-types';
import ProductCard from 'components/ProductCard';
import './style.css';

const ProductList = ({ availableProducts, selectedProducts }) => {
  const [, dispatch] = useContext(ShopContext);
  const products = Object.values(availableProducts);

  return (
    <div className="product-list">
      {
        products.length === 0
          ? <div>Nothing to see here</div>
          : (
            products.map((product) => (
              <ProductCard
                key={product.sku}
                product={product}
                variant="secondary"
                selectedQuantity={selectedProducts[product.sku] || 0}
                onAddToCart={() => addProduct(dispatch)(product.sku)}
                onProductIncrement={() => addProduct(dispatch)(product.sku)}
                onProductDecrement={() => removeProduct(dispatch)(product.sku)}
              />
            ))
          )
      }
    </div>
  );
};

ProductList.defaultProps = {
  selectedProducts: [],
};

ProductList.propTypes = {
  availableProducts: PropTypes.instanceOf(Object).isRequired,
  selectedProducts: PropTypes.instanceOf(Object),
};

export default ProductList;
