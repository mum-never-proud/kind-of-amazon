import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { ShopContext } from 'contexts/Shop';
import { UserContext } from 'contexts/User';
import { emptyCart } from 'actions/shop';
import CheckoutForm from 'components/CheckoutForm';
import ProductCard from 'components/ProductCard';
import computeCartTotal from 'utils/compute-cart-total';
import './style.css';

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);

const Checkout = () => {
  const [{ user }] = useContext(UserContext);

  if (!user) {
    return (
      <Redirect
        to={{
          pathname: '/sign-in',
          state: { from: '/checkout' },
        }}
      />
    );
  }

  const [{ availableProducts, selectedProducts }, dispatchCart] = useContext(ShopContext);
  const [products, setProducts] = useState(selectedProducts);
  const skus = Object.keys(products);
  const price = computeCartTotal(products, availableProducts);

  if (!skus.length) {
    return <Redirect to="/" />;
  }

  return (
    <div className="checkout">
      <div className="checkout--items">
        <p className="lead">{Object.keys(selectedProducts).length === 0 ? 'Ordered Items' : 'Review Items'}</p>
        {
          skus.map((sku) => {
            const product = availableProducts[sku];

            return (
              <ProductCard
                key={product.sku}
                product={product}
                viewOnly
                shouldDisplayOutOfStockText={false}
                selectedQuantity={products[product.sku] || 0}
              />
            );
          })
        }
      </div>
      <div className="checkout--form mt-5">
        <Elements stripe={stripePromise}>
          <CheckoutForm
            price={price}
            currency="$"
            user={user}
            selectedProducts={selectedProducts}
            onOrderComplete={(order) => {
              setProducts(order.products);
              emptyCart(dispatchCart)();
            }}
          />
        </Elements>
      </div>
    </div>
  );
};

export default Checkout;
