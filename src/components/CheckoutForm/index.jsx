import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { VscError, VscCheck } from 'react-icons/vsc';
import { saveOrder } from 'services/user';
import Button from 'react-bootstrap/button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import fetchPaymentToken from 'services/payment';

const CheckoutForm = ({
  amount, currency, selectedProducts, onOrderComplete, userID,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardValidationErrorMessage, setCardValidationErrorMessage] = useState(null);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);

  if (isPaymentConfirmed) {
    return (
      <div className="amz-form--sm border text-center">
        <div className="text-success h1"><VscCheck /></div>
        <div>
          We&apos;ve received your order
        </div>
      </div>
    );
  }

  const handleCheckout = (ev) => {
    ev.preventDefault();

    setCardValidationErrorMessage('');
    setIsPaymentProcessing(true);
    fetchPaymentToken()
      .then((res) => stripe.confirmCardPayment(res.client_secret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: 'Jenny Rosen',
          },
        },
      }))
      .then(({ paymentIntent, error }) => {
        if (paymentIntent && paymentIntent.status === 'succeeded') {
          return Promise.resolve(paymentIntent.id);
        }

        return Promise.reject(error);
      })
      .then((orderID) => saveOrder({
        orderID,
        products: selectedProducts,
        total: amount,
      }, userID))
      .then((order) => {
        setIsPaymentConfirmed(true);
        onOrderComplete({ ...order, total: amount });
      })
      .catch(({ message }) => setCardValidationErrorMessage(message))
      .finally(() => setIsPaymentProcessing(false));
  };

  const handleChange = (ev) => {
    if (ev.error) {
      setCardValidationErrorMessage(ev.error.message);
    }
  };

  return (
    <Form onSubmit={handleCheckout} className="amz-form--sm border">
      <Form.Group>
        <CardElement
          className="form-control amz-input-text"
          onChange={handleChange}
        />
        {
          cardValidationErrorMessage && (
            <Form.Text className="text-danger amz-text-xs">
              <VscError />
              {' '}
              {cardValidationErrorMessage}
            </Form.Text>
          )
        }
      </Form.Group>
      <Form.Group>
        <Button type="submit" className="amz-button-primary amz-text-xs" disabled={!stripe || isPaymentProcessing}>
          {
          isPaymentProcessing && (
            <Spinner
              className="mr-1"
              as="span"
              variant="dark"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          )
        }
          Pay
          {isPaymentProcessing ? 'ing' : ''}
          {' '}
          <span className="font-weight-bold">
            {currency}
            {amount}
          </span>
        </Button>
      </Form.Group>
    </Form>
  );
};

CheckoutForm.propTypes = {
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  selectedProducts: PropTypes.instanceOf(Object).isRequired,
  onOrderComplete: PropTypes.func.isRequired,
  userID: PropTypes.string.isRequired,
};

export default CheckoutForm;
