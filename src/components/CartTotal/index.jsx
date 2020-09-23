import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CurrencyFormatter from 'components/commons/CurrencyFormatter';
import './style.css';

const CartDetails = ({ currency, itemsCount, price }) => {
  const history = useHistory();

  return (
    <Form className="mt-5 cart-details border">
      <Form.Group>
        <Form.Text>
          <div className="cart-details--items-count lead">
            Subtotal: (
            {itemsCount}
            {' '}
            Item
            {itemsCount > 1 ? 's' : ''}
            )
          </div>
          <div className="cart-details--total font-weight-bold lead">
            <CurrencyFormatter currency={currency} price={price} />
          </div>
        </Form.Text>
      </Form.Group>
      <Form.Group>
        <Button className="amz-button--primary" onClick={() => history.push('/checkout')}>Proceed to checkout</Button>
      </Form.Group>
    </Form>
  );
};

CartDetails.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  price: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
};

export default CartDetails;
