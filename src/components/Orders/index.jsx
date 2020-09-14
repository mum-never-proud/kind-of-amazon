import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { RiGhostFill } from 'react-icons/ri';
import { UserContext } from 'contexts/User';
import { CartContext } from 'contexts/Cart';
import Image from 'react-bootstrap/Image';
import shorId from 'shortid';
import './style.css';

const Orders = () => {
  const [{ user, pastOrders: orders }] = useContext(UserContext);
  const [{ availableProducts }] = useContext(CartContext);

  if (!user) {
    return (
      <Redirect
        to={{
          pathname: '/sign-in',
          state: { from: '/orders' },
        }}
      />
    );
  }

  if (!orders.length) {
    return (
      <div className="text-center">
        No orders to Display!
        <div className="h1 mt-5 ghost">
          <RiGhostFill />
        </div>
      </div>
    );
  }

  return (
    <div className="orders">
      {
        orders.map((order) => (
          <div className="order--info border" key={shorId.generate()}>
            <div className="order--info-head border-bottom d-flex justify-content-around">
              <div className="d-flex flex-column">
                <span>Order Placed</span>
                <span>
                  {new Date(order.created).toDateString()}
                </span>
              </div>
              <div className="d-flex flex-column">
                <span>Total</span>
                <span>
                  {order.total}
                  $
                </span>
              </div>
              <div className="d-flex flex-column">
                <span>Order ID</span>
                <span>
                  {order.orderID}
                </span>
              </div>
            </div>
            <ul className="order--products-info mt-3">
              {
              Object.keys(order.products).map((sku) => {
                const product = availableProducts[sku];

                return (
                  <li className="mb-3 p-5" key={shorId.generate()}>
                    <div className="product-image">
                      <Image src={product.imageUrl} />
                    </div>
                    <div className="product-details ml-3">
                      <div>{product.title}</div>
                      <div>
                        Qty:
                        {' '}
                        {order.products[sku]}
                      </div>
                      <div>
                        {product.currency}
                        {product.price}
                      </div>
                    </div>
                  </li>
                );
              })
            }
            </ul>
          </div>
        ))
      }
    </div>
  );
};

export default Orders;
