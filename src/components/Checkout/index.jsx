import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { CartContext } from 'contexts/Cart';
import { UserContext } from 'contexts/User';
import { emptyCart } from 'actions/cart';
import { confirmOrder } from 'actions/user';
import CheckoutForm from 'components/CheckoutForm';
import ProductCard from 'components/ProductCard';
import computeCartTotal from 'utils/compute-cart-total';
import './style.css';

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);

const Checkout = () => {
  const [{ user }, dispatchUser] = useContext(UserContext);

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

  const [{ availableProducts, selectedProducts }, dispatchCart] = useContext(CartContext);
  const [products, setProducts] = useState(selectedProducts);
  const skus = Object.keys(products);
  const amount = computeCartTotal(products, availableProducts);

  if (!skus.length) {
    return <Redirect to="/" />;
  }

  return (
    <div className="checkout">
      <div className="checkout--items mr-4">
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
            amount={amount}
            currency="$"
            user={user}
            selectedProducts={selectedProducts}
            onOrderComplete={(order) => {
              setProducts(order.products);
              emptyCart(dispatchCart)();
              confirmOrder(dispatchUser)(order);
            }}
          />
        </Elements>
      </div>
    </div>
  );
};

export default Checkout;
