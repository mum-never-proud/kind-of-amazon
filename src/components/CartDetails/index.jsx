import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './style.css';

const CartDetails = ({ itemsCount, price }) => {
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
            $
            {price.toFixed(2)}
          </div>
        </Form.Text>
      </Form.Group>
      <Form.Group className="d-flex justify-content-center">
        <Button className="amz-button-primary" onClick={() => history.push('/checkout')}>Proceed to checkout</Button>
      </Form.Group>
    </Form>
  );
};

CartDetails.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
};

export default CartDetails;
