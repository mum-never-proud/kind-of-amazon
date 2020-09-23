import React, { useContext } from 'react';
import { ShopContext } from 'contexts/Shop';
import { addProduct, removeProduct } from 'actions/shop';
import CartTotal from 'components/CartTotal';
import ProductList from 'components/ProductList';
import ProductCard from 'components/ProductCard';
import computeCartTotal from 'utils/compute-cart-total';
import './style.css';

const Orders = () => {
  const [{ availableProducts, selectedProducts }, dispatch] = useContext(ShopContext);
  const skus = Object.keys(selectedProducts);
  const price = computeCartTotal(selectedProducts, availableProducts);
  const abandonedProducts = Object.values(availableProducts)
    .filter((product) => !skus.includes(product.sku) && product.availableQuantity > 0);

  return (
    <>
      <div className="cart">
        <div className="cart--items">
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
                    availableQuantity={product.availableQuantity}
                    selectedQuantity={selectedProducts[product.sku] || 0}
                    shouldDisplayOutOfStockText={false}
                    onAddToCart={() => addProduct(dispatch)(product.sku)}
                    onProductIncrement={() => addProduct(dispatch)(product.sku)}
                    onProductDecrement={() => removeProduct(dispatch)(product.sku)}
                  />
                );
              }))
          }
        </div>
        {
          skus.length !== 0 && (
            <div>
              <CartTotal
                itemsCount={Object.values(selectedProducts).reduce((a, b) => a + b, 0)}
                // TODO: maintain currencies in constants
                currency="$"
                price={price}
              />
            </div>
          )
        }
      </div>
      <div className="cart--recommendation">
        <p className="lead">Recommendations based on your Interest</p>
        <ProductList availableProducts={abandonedProducts} selectedProducts={selectedProducts} />
      </div>
    </>
  );
};

export default Orders;
