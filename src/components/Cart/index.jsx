import React, { useContext } from 'react';
import { CartContext } from 'contexts/Cart';
import { addOrIncrementProductInCart, removeOrDecrementProductInCart } from 'actions/cart';
import CartDetails from 'components/CartDetails';
import Products from 'components/Products';
import ProductCard from 'components/ProductCard';
import computeCartTotal from 'utils/compute-cart-total';
import './style.css';

const Orders = () => {
  const [
    {
      availableProducts,
      selectedProducts,
      productQuantites,
    },
    dispatch,
  ] = useContext(CartContext);
  const skus = Object.keys(selectedProducts);
  const price = computeCartTotal(selectedProducts, availableProducts);

  return (
    <div className="cart">
      <div className="cart--items">
        <div className="cart--items-info  mr-4">
          <p className="lead">Shopping Cart</p>
          {
            skus.length === 0
              ? (<p>Your Shopping Cart is empty.</p>)
              : (skus.map((sku) => {
                const product = availableProducts[sku];

                return (
                  <ProductCard
                    key={product.sku}
                    product={product}
                    availableQuantity={productQuantites[product.sku]}
                    selectedQuantity={selectedProducts[product.sku] || 0}
                    shouldDisplayOutOfStockText={false}
                    onAddToCart={() => addOrIncrementProductInCart(dispatch)(product.sku)}
                    onProductIncrement={() => addOrIncrementProductInCart(dispatch)(product.sku)}
                    onProductDecrement={() => removeOrDecrementProductInCart(dispatch)(product.sku)}
                  />
                );
              }))
          }
        </div>
        {
          skus.length !== 0 && (
            <div className="cart--form">
              <CartDetails
                itemsCount={Object.values(selectedProducts).reduce((a, b) => a + b, 0)}
                price={price}
              />
            </div>
          )
        }
      </div>
      <div className="cart--recommendation">
        <p className="lead">Recommendations based on your Interest</p>
        <Products />
      </div>
    </div>
  );
};

export default Orders;
