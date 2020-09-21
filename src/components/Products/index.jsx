import React, { useContext } from 'react';
import { CartContext } from 'contexts/Cart';
import { addOrIncrementProductInCart, removeOrDecrementProductInCart } from 'actions/cart';
import ProductCard from 'components/ProductCard';

const Products = () => {
  const [
    {
      availableProducts,
      productQuantites,
      selectedProducts,
    },
    dispatch,
  ] = useContext(CartContext);

  return (
    <div className="products">
      {
        Object.values(availableProducts).map((product) => (
          <ProductCard
            key={product.sku}
            product={product}
            variant="secondary"
            availableQuantity={productQuantites[product.sku]}
            selectedQuantity={selectedProducts[product.sku] || 0}
            onAddToCart={() => addOrIncrementProductInCart(dispatch)(product.sku)}
            onProductIncrement={() => addOrIncrementProductInCart(dispatch)(product.sku)}
            onProductDecrement={() => removeOrDecrementProductInCart(dispatch)(product.sku)}
          />
        ))
      }
    </div>
  );
};

export default Products;
