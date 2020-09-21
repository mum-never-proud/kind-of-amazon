import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { RiGhostFill } from 'react-icons/ri';
import { VscCheck } from 'react-icons/vsc';
import { UserContext } from 'contexts/User';
import { CartContext } from 'contexts/Cart';
import Image from 'react-bootstrap/Image';
import Spinner from 'react-bootstrap/Spinner';
import shorId from 'shortid';
import './style.css';

const Orders = () => {
  const [{ user, pastOrders: orders }] = useContext(UserContext);
  const [{ availableProducts }] = useContext(CartContext);
  const today = new Date();

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

  const deliveryStatus = (deliveryDate) => (new Date(deliveryDate) < today
    ? (
      <div className="text-success">
        <VscCheck />
        {' '}
        Delivered on
        {' '}
        {new Date(deliveryDate).toDateString()}
      </div>
    )
    : (
      <div className="text-warning d-flex align-items-center justify-content-end">
        <Spinner
          className="mr-1"
          as="span"
          variant="warning"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        {' '}
        Arriving by
        {' '}
        {new Date(deliveryDate).toDateString()}
      </div>
    ));

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
                  {order.total.toFixed(2)}
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
            <div className="text-right mt-2 mr-2">
              {deliveryStatus(order.deliveryDate)}
            </div>
            <ul className="order--products-info">
              {
              Object.keys(order.products).map((sku) => {
                const product = availableProducts[sku];

                return (
                  <li className="mb-3 p-5" key={shorId.generate()}>
                    <div className="product-image text-center">
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
                        {product.price.toFixed(2)}
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
