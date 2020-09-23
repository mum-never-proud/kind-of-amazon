import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { RiGhostFill } from 'react-icons/ri';
import { VscCheck } from 'react-icons/vsc';
import { UserContext } from 'contexts/User';
import { ShopContext } from 'contexts/Shop';
import { getOrders } from 'services/user';
import Image from 'react-bootstrap/Image';
import Spinner from 'react-bootstrap/Spinner';
import CurrencyFormatter from 'components/commons/CurrencyFormatter';
import shortId from 'shortid';
import './style.css';

const Orders = () => {
  const [{ user }] = useContext(UserContext);
  const [{ availableProducts }] = useContext(ShopContext);
  const [ordersState, setOrdersState] = useState({
    isFetchingOrders: true,
    errorMessage: '',
    orders: [],
  });
  const { orders, isFetchingOrders, errorMessage } = ordersState;
  const today = new Date();

  useEffect(() => {
    if (user) {
      setOrdersState({ ...ordersState, isFetchingOrders: true });
      getOrders(user.objectId)
        .then((pastOrders) => setOrdersState({
          isFetchingOrders: false,
          orders: pastOrders,
        }))
        .catch(({ message }) => setOrdersState({
          ...ordersState,
          isFetchingOrders: false,
          errorMessage: message,
        }));
    }
  }, [user]);

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

  if (isFetchingOrders) {
    return (
      <div className="text-center">
        <Spinner animation="border" />
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="text-center text-danger">
        <p>Whooops something went wrong!</p>
        <span className="font-weight-bold amz-text-xs">
          Message:
          {' '}
          {errorMessage}
        </span>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="text-center">
        No orders to Display!
        <div className="h1 mt-3 ghost">
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
          <div className="order--info border" key={shortId.generate()}>
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
                  <CurrencyFormatter price={order.total} currency="$" />
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
                  <li className="mb-3 p-5" key={shortId.generate()}>
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
                        <CurrencyFormatter price={product.price} currency={product.currency} />
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
